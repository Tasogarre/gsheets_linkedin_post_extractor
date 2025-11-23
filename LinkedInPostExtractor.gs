/**
 * LinkedIn Post Metadata Extractor for Google Sheets
 *
 * @author Marcus Bearden (http://linkedin.com/in/beardenm/)
 * @license MIT License - See LICENSE file for full text
 * @version 1.0.0
 *
 * Copyright (c) 2025 Marcus Bearden
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Extracts and formats the post date from a LinkedIn URL.
 *
 * LinkedIn post IDs contain an embedded Unix timestamp in the first 41 bits
 * of the 19-digit post ID. This function decodes that timestamp and returns
 * a formatted date string.
 *
 * @param {string} linkedinURL - The LinkedIn post URL
 * @return {string} Formatted date string (yyyy-MM-dd HH:mm:ss) or error message
 * @customfunction
 */
function GETPOSTDATE(linkedinURL) {
  var postId = extractPostId(linkedinURL);
  if (!postId) {
    return "Enter a valid LinkedIn URL";
  }
  var unixTimestamp = extractUnixTimestamp(postId);

  // Convert the timestamp to a Date object
  var dateObject = new Date(unixTimestamp);

  // Format the date for Google Sheets
  var formattedDate = Utilities.formatDate(dateObject, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");

  return formattedDate;
}

/**
 * Helper function to extract the post ID from the LinkedIn URL.
 *
 * @param {string} linkedinURL - The LinkedIn post URL
 * @return {string|null} The 19-digit post ID or null if not found
 */
function extractPostId(linkedinURL) {
  var regex = /([0-9]{19})/;
  var match = linkedinURL.match(regex);
  return match ? match[0] : null;
}

/**
 * Helper function to extract the Unix timestamp from the post ID.
 *
 * The timestamp is encoded in the first 41 bits of the post ID when
 * converted to binary representation.
 *
 * @param {string} postId - The 19-digit LinkedIn post ID
 * @return {number} Unix timestamp in milliseconds
 */
function extractUnixTimestamp(postId) {
  var asBinary = BigInt(postId).toString(2);
  var first41Chars = asBinary.slice(0, 41);
  var timestamp = parseInt(first41Chars, 2);
  return timestamp;
}

/**
 * Scrapes comprehensive metadata from a LinkedIn post URL.
 *
 * This function fetches and parses a LinkedIn post page to extract:
 * - Post author name and URL
 * - Post content/text
 * - Whether it's an original post or repost
 * - Media information (images, videos, documents)
 * - Media URLs
 * - Engagement metrics (reactions, comments)
 *
 * Results are cached for 6 minutes to improve performance and reduce API calls.
 *
 * @param {string} url - The LinkedIn post URL
 * @return {Array<Array>} Array containing [authorName, authorUrl, postContent, isOriginal, hasImage, hasVideo, isDocument, mediaUrl, reactions, comments]
 * @customfunction
 */
function POSTMETADATA(url) {
  // 1. Validate URL
  var linkedinUrlPattern = /^https:\/\/(www\.)?linkedin\.com\/(feed\/update|posts)\/.+/;
  if (!linkedinUrlPattern.test(url)) {
    return "Enter a valid URL";
  }

  var cache = CacheService.getScriptCache();
  var cachedData = cache.get(url);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    Logger.log('Fetching data');
    var response = UrlFetchApp.fetch(url, {muteHttpExceptions: true});
    var html = response.getContentText();
    var stats = scrapeLinkedInLikesAndComments(html);

    // --- 0. SCOPE NARROWING ---
    // Isolate the main content card to avoid false positives from "Related Posts"
    var cleanHtmlScope = html;

    // Find the start of the main feed activity card
    var mainCardStart = html.indexOf('class="core-rail');
    if (mainCardStart === -1) mainCardStart = 0;

    // Find the start of the "Related Posts" or "Aside" section to cut off
    var relatedPostsIndex = html.indexOf('class="core-section-container');
    if (relatedPostsIndex === -1) {
        // Fallback: try finding the aside section
        relatedPostsIndex = html.indexOf('<aside');
    }

    // Create the isolated scope
    if (relatedPostsIndex !== -1) {
      cleanHtmlScope = html.substring(mainCardStart, relatedPostsIndex);
    }

    // --- 1. ORIGINALITY DETECTION (Refined) ---
    // We look for the specific class "feed-reshare-content" within the isolated scope.
    // This class is ONLY present on the nested card of a repost.
    // Original posts do NOT have this class in their main scope.
    var isRepost = cleanHtmlScope.indexOf('feed-reshare-content') !== -1;

    // Invert: If it IS a repost, Is_Original is FALSE.
    var isOriginal = !isRepost;

    // --- 2. GLOBAL DOCUMENT DETECTION ---
    var isDocument = cleanHtmlScope.includes("/dms/document/") ||
                     cleanHtmlScope.includes("feedshare-document-pdf-analyzed");

    // --- 3. TEXT CONTENT EXTRACTION ---
    var postContent = "N/A";

    // Priority: Target the commentary specifically
    var commentRegex = /data-test-id="main-feed-activity-card__commentary"[^>]*>([\s\S]*?)<\/p>/;
    var commentMatch = cleanHtmlScope.match(commentRegex);

    if (commentMatch && commentMatch[1]) {
      postContent = commentMatch[1].replace(/<[^>]*>/g, '')
                                   .replace(/&amp;/g, '&')
                                   .replace(/&#39;/g, "'")
                                   .replace(/&quot;/g, '"')
                                   .trim();
    }

    if (postContent === "N/A") {
      // Fallback to meta description (safe to use full html as it's in the head)
      var metaDescRegex = /<meta name="description" content="([^"]+)"/;
      var metaMatch = html.match(metaDescRegex);
      if (metaMatch && metaMatch[1]) {
         postContent = metaMatch[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'");
      }
    }

    // --- 4. MEDIA URL LOGIC ---
    var mediaUrl = "N/A";
    var hasImage = false;
    var hasVideo = false;

    if (isDocument) {
       mediaUrl = "Manual Fetch Required";
    } else {
       var ogImageRegex = /<meta property="og:image" content="([^"]+)"/;
       var ogMatch = html.match(ogImageRegex);

       if (ogMatch && ogMatch[1]) {
         var tempUrl = ogMatch[1].replace(/&amp;/g, '&');
         if (!tempUrl.includes("static.licdn.com")) {
            mediaUrl = tempUrl;
            hasImage = true;
         }
       }
    }

    // --- 5. JSON-LD PARSING (Author/Video) ---
    var jsonLdRegex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    var match;
    var finalJson = null;
    var targetPostId = extractPostId(url);

    while ((match = jsonLdRegex.exec(html)) !== null) {
      try {
        var data = JSON.parse(match[1]);
        if (data.url && data.url.includes(targetPostId)) {
          finalJson = data;
          break;
        }
        if (!finalJson && (data.headline || data.articleBody)) {
          finalJson = data;
        }
      } catch (e) { continue; }
    }

    var authorName = "N/A";
    var authorUrl = "N/A";

    if (finalJson) {
      authorName = finalJson.author?.name || finalJson.creator?.name || "N/A";
      authorUrl = finalJson.author?.url || finalJson.creator?.url || "N/A";

      if (finalJson['@type'] === "VideoObject") {
        hasVideo = true;
        hasImage = false;
      }

      // JSON Fallback for Repost (Double Check)
      // If we missed it in HTML but JSON says it has shared content, trust JSON
      if (finalJson.sharedContent && isOriginal === true) {
         // Only flip to false if we haven't already detected it
         // isOriginal = false;
         // *Correction*: JSON-LD is unreliable for this specific distinction
         // as it sometimes nests incorrectly. We will trust the HTML scope check
         // as the primary source of truth.
      }

      if (postContent === "N/A") {
         postContent = finalJson.articleBody || finalJson.description || "N/A";
      }
    }

    if (isDocument) { hasImage = false; }

    var resultData = [[authorName, authorUrl, postContent, isOriginal, hasImage, hasVideo, isDocument, mediaUrl, stats.likes, stats.comments]];

    cache.put(url, JSON.stringify(resultData), 360);
    return resultData;

  } catch (e) {
    Logger.log(e);
    return "Error fetching metadata";
  }
}

/**
 * Helper function to scrape reaction and comment counts from LinkedIn post HTML.
 *
 * @param {string} html - The HTML content of the LinkedIn post page
 * @return {Object} Object containing likes and comments counts
 */
function scrapeLinkedInLikesAndComments(html) {
  // Use regex to find the likes (reactions) count
  var likesRegex = /data-num-reactions="(\d+)"/;
  var likesMatch = html.match(likesRegex);
  var likesCount = likesMatch ? parseInt(likesMatch[1], 10) : null;

  // Use regex to find the comments count
  var commentsRegex = /data-num-comments="(\d+)"/;
  var commentsMatch = html.match(commentsRegex);
  var commentsCount = commentsMatch ? parseInt(commentsMatch[1], 10) : null;


  // Return the results
  return {
    likes: likesCount ? likesCount : 0,
    comments: commentsCount ? commentsCount : 0,
  };
}
