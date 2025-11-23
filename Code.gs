/**
 * LinkedIn Post Extractor for Google Sheets
 *
 * This script helps extract and organize LinkedIn post details in a Google Sheet.
 * Due to LinkedIn's authentication requirements, direct scraping is not possible.
 * This script provides URL parsing and data organization utilities.
 */

/**
 * Creates a custom menu when the spreadsheet is opened
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('LinkedIn Tools')
      .addItem('Parse LinkedIn URLs', 'parseLinkedInUrls')
      .addItem('Format Sheet', 'formatSheet')
      .addItem('Clear Data', 'clearData')
      .addToUi();
}

/**
 * Sets up the initial headers for the LinkedIn post tracking sheet
 */
function setupHeaders() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var headers = [
    'Post URL',
    'Post ID',
    'Author Name',
    'Author Profile URL',
    'Post Date',
    'Post Text',
    'Engagement (Likes)',
    'Engagement (Comments)',
    'Engagement (Shares)',
    'Post Type',
    'Tags/Keywords',
    'Notes'
  ];

  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');

  // Set column widths
  sheet.setColumnWidth(1, 400); // Post URL
  sheet.setColumnWidth(2, 150); // Post ID
  sheet.setColumnWidth(3, 150); // Author Name
  sheet.setColumnWidth(4, 300); // Author Profile URL
  sheet.setColumnWidth(5, 120); // Post Date
  sheet.setColumnWidth(6, 400); // Post Text
  sheet.setColumnWidth(7, 150); // Likes
  sheet.setColumnWidth(8, 150); // Comments
  sheet.setColumnWidth(9, 150); // Shares
  sheet.setColumnWidth(10, 120); // Post Type
  sheet.setColumnWidth(11, 200); // Tags
  sheet.setColumnWidth(12, 300); // Notes

  // Freeze the header row
  sheet.setFrozenRows(1);
}

/**
 * Parses LinkedIn URLs in column A and extracts Post IDs to column B
 */
function parseLinkedInUrls() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    SpreadsheetApp.getUi().alert('No data to parse. Please add LinkedIn URLs in column A.');
    return;
  }

  var urlRange = sheet.getRange(2, 1, lastRow - 1, 1);
  var urls = urlRange.getValues();
  var postIds = [];

  for (var i = 0; i < urls.length; i++) {
    var url = urls[i][0];
    if (url) {
      var postId = extractPostId(url);
      postIds.push([postId]);
    } else {
      postIds.push(['']);
    }
  }

  if (postIds.length > 0) {
    var postIdRange = sheet.getRange(2, 2, postIds.length, 1);
    postIdRange.setValues(postIds);
  }

  SpreadsheetApp.getUi().alert('LinkedIn URLs parsed successfully!');
}

/**
 * Extracts the post ID from a LinkedIn post URL
 * @param {string} url - The LinkedIn post URL
 * @return {string} The extracted post ID or error message
 */
function extractPostId(url) {
  if (!url || typeof url !== 'string') {
    return '';
  }

  // LinkedIn post URL patterns:
  // https://www.linkedin.com/posts/username_activity-1234567890123456789-abcd
  // https://www.linkedin.com/feed/update/urn:li:activity:1234567890123456789
  // https://www.linkedin.com/feed/update/urn:li:share:1234567890123456789

  try {
    // Pattern 1: /posts/ URL
    var postsMatch = url.match(/\/posts\/[^_]*_activity-(\d+)/);
    if (postsMatch) {
      return postsMatch[1];
    }

    // Pattern 2: /feed/update/ URL with activity
    var activityMatch = url.match(/urn:li:activity:(\d+)/);
    if (activityMatch) {
      return activityMatch[1];
    }

    // Pattern 3: /feed/update/ URL with share
    var shareMatch = url.match(/urn:li:share:(\d+)/);
    if (shareMatch) {
      return shareMatch[1];
    }

    return 'ID not found';
  } catch (e) {
    return 'Parse error';
  }
}

/**
 * Formats the sheet with proper styling and data validation
 */
function formatSheet() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = Math.max(sheet.getLastRow(), 2);

  // Format date column (E)
  if (lastRow > 1) {
    var dateRange = sheet.getRange(2, 5, lastRow - 1, 1);
    dateRange.setNumberFormat('yyyy-mm-dd');
  }

  // Format engagement columns (G, H, I) as numbers
  if (lastRow > 1) {
    var engagementRange = sheet.getRange(2, 7, lastRow - 1, 3);
    engagementRange.setNumberFormat('#,##0');
  }

  // Add data validation for Post Type (J)
  var postTypes = ['Text', 'Image', 'Video', 'Carousel', 'Article', 'Poll', 'Document'];
  var postTypeValidation = SpreadsheetApp.newDataValidation()
      .requireValueInList(postTypes, true)
      .setAllowInvalid(false)
      .build();

  if (lastRow > 1) {
    var postTypeRange = sheet.getRange(2, 10, lastRow - 1, 1);
    postTypeRange.setDataValidation(postTypeValidation);
  }

  // Apply alternating row colors
  if (lastRow > 1) {
    var dataRange = sheet.getRange(2, 1, lastRow - 1, 12);
    dataRange.applyRowBanding(SpreadsheetApp.BandingTheme.LIGHT_GREY, false, false);
  }

  SpreadsheetApp.getUi().alert('Sheet formatted successfully!');
}

/**
 * Clears all data (keeps headers)
 */
function clearData() {
  var ui = SpreadsheetApp.getUi();
  var result = ui.alert(
    'Clear All Data',
    'Are you sure you want to clear all data? This will keep the headers but remove all entries.',
    ui.ButtonSet.YES_NO
  );

  if (result == ui.Button.YES) {
    var sheet = SpreadsheetApp.getActiveSheet();
    var lastRow = sheet.getLastRow();

    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, 12).clear();
      ui.alert('Data cleared successfully!');
    } else {
      ui.alert('No data to clear.');
    }
  }
}

/**
 * Custom function to extract post ID from URL in a cell
 * Usage: =EXTRACT_POST_ID(A2)
 * @param {string} url - The LinkedIn post URL
 * @return {string} The extracted post ID
 * @customfunction
 */
function EXTRACT_POST_ID(url) {
  return extractPostId(url);
}

/**
 * Adds a new row with a timestamp
 */
function addNewEntry() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var newRow = lastRow + 1;

  // Insert a new row
  sheet.insertRowAfter(lastRow);

  // Optionally pre-fill the date column with today's date
  var today = new Date();
  sheet.getRange(newRow, 5).setValue(today);
}
