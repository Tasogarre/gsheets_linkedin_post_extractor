# Setup Guide for LinkedIn Post Extractor Tools

This guide provides detailed setup instructions for **both tools** included in this repository.

---

## Table of Contents

1. [Choose Your Tool](#choose-your-tool)
2. [Setup for LinkedInPostExtractor.gs (Advanced)](#setup-for-linkedinpostextractorgs-advanced)
3. [Setup for Code.gs (Basic Organizational)](#setup-for-codegs-basic-organizational)
4. [Using Both Tools Together](#using-both-tools-together)
5. [Troubleshooting](#troubleshooting)

---

## Choose Your Tool

### LinkedInPostExtractor.gs - Advanced Metadata Extractor

**Best for:**
- Automated data extraction
- Bulk post analysis
- Research projects
- Users comfortable with custom functions

**Key Functions:**
- `=GETPOSTDATE(url)` - Extract post date automatically
- `=POSTMETADATA(url)` - Extract comprehensive metadata

**Data Entry:** Mostly automated via formulas

---

### Code.gs - Basic Organizational Tool

**Best for:**
- Manual tracking with structure
- Users who prefer menu-driven tools
- Custom tagging and notes
- Simple post databases

**Key Features:**
- Menu functions (Parse URLs, Format Sheet, Clear Data)
- `=EXTRACT_POST_ID(url)` - Extract post ID only

**Data Entry:** Mostly manual

---

## Setup for LinkedInPostExtractor.gs (Advanced)

### Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it (e.g., "LinkedIn Post Analysis")

### Step 2: Install the Script

1. Click **Extensions** > **Apps Script**
2. Delete any existing code in the editor
3. Copy all code from `LinkedInPostExtractor.gs` in this repository
4. Paste it into the Apps Script editor
5. Click **Save** (💾) or press `Ctrl+S` / `Cmd+S`
6. Name your project (e.g., "LinkedIn Metadata Extractor")
7. Close the Apps Script editor

### Step 3: Set Up Your Sheet Structure

**Option A: Manual Setup (Recommended for Custom Layouts)**

Create headers in Row 1:

| A | B | C | D | E | F | G | H | I | J | K |
|---|---|---|---|---|---|---|---|---|---|---|
| Post URL | Author Name | Author Profile | Post Content | Is Original | Has Image | Has Video | Is Document | Media URL | Reactions | Comments |

**Option B: Quick Formula Setup**

1. Put header "Post URL" in A1
2. Paste LinkedIn URLs starting in A2
3. In B1, add header "Post Date"
4. In B2, enter: `=GETPOSTDATE(A2)`
5. For comprehensive data, use this structure:

```
A1: Post URL
B1-K1: (See table below)
B2: =INDEX(POSTMETADATA($A2),1)
C2: =INDEX(POSTMETADATA($A2),2)
D2: =INDEX(POSTMETADATA($A2),3)
E2: =INDEX(POSTMETADATA($A2),4)
F2: =INDEX(POSTMETADATA($A2),5)
G2: =INDEX(POSTMETADATA($A2),6)
H2: =INDEX(POSTMETADATA($A2),7)
I2: =INDEX(POSTMETADATA($A2),8)
J2: =INDEX(POSTMETADATA($A2),9)
K2: =INDEX(POSTMETADATA($A2),10)
```

**Column headers for POSTMETADATA:**
- B: Author Name
- C: Author Profile
- D: Post Content
- E: Is Original
- F: Has Image
- G: Has Video
- H: Is Document
- I: Media URL
- J: Reactions
- K: Comments

### Step 4: Authorize the Script

1. Enter a test LinkedIn URL in A2
2. Click on cell B2 (with your formula)
3. Google will prompt for authorization
4. Click **Review Permissions**
5. Select your Google account
6. Click **Advanced** > **Go to [Project Name] (unsafe)**
7. Click **Allow**

### Step 5: Start Using

1. Paste LinkedIn post URLs in column A
2. Formulas will automatically extract metadata
3. Wait a moment for data to load (cached for 6 minutes)
4. Copy formulas down for additional rows

### Tips for POSTMETADATA

- **Use absolute references** for the URL column: `$A2`
- **Copy formulas down** to apply to multiple rows
- **Wait for loading** - First request may take 3-5 seconds
- **Cache is 6 minutes** - Re-running same URL is instant
- **Error messages** indicate invalid URLs or connection issues

---

## Setup for Code.gs (Basic Organizational)

### Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it (e.g., "LinkedIn Post Tracker")

### Step 2: Install the Script

1. Click **Extensions** > **Apps Script**
2. Delete any existing code in the editor
3. Copy all code from `Code.gs` in this repository
4. Paste it into the Apps Script editor
5. Click **Save** (💾) or press `Ctrl+S` / `Cmd+S`
6. Name your project (e.g., "LinkedIn Post Organizer")
7. Close the Apps Script editor

### Step 3: Set Up Headers

1. Refresh your Google Sheet
2. You should see a new **"LinkedIn Tools"** menu in the menu bar
3. Click **LinkedIn Tools** > **Format Sheet**
4. Headers will automatically be created with proper formatting

**Or manually add headers to row 1:**

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Post URL | Post ID | Author Name | Author Profile URL | Post Date | Post Text | Engagement (Likes) | Engagement (Comments) | Engagement (Shares) | Post Type | Tags/Keywords | Notes |

### Step 4: Authorize the Script

1. Click **LinkedIn Tools** > **Parse LinkedIn URLs**
2. Google will prompt for authorization
3. Click **Review Permissions**
4. Select your Google account
5. Click **Advanced** > **Go to [Project Name] (unsafe)**
6. Click **Allow**

### Step 5: Start Using

1. Paste LinkedIn post URLs in column A (starting row 2)
2. Click **LinkedIn Tools** > **Parse LinkedIn URLs**
3. Post IDs will automatically fill in column B
4. Manually fill in remaining columns:
   - Author information (columns C-D)
   - Post date (column E)
   - Post text (column F)
   - Engagement metrics (columns G-I)
   - Post type dropdown (column J)
   - Tags and notes (columns K-L)

### Available Menu Functions

**LinkedIn Tools Menu:**

- **Parse LinkedIn URLs** - Extracts post IDs from URLs in column A
- **Format Sheet** - Applies professional formatting and data validation
- **Clear Data** - Removes all data while keeping headers intact

### Using the Custom Formula

You can also use the formula in any cell:

```
=EXTRACT_POST_ID(A2)
```

This extracts just the post ID from a LinkedIn URL.

---

## Using Both Tools Together

You can combine both scripts in a single Google Sheet:

### Installation

1. Go to **Extensions** > **Apps Script**
2. In the left sidebar, you'll see "Files"
3. Click the **+** next to "Files" > **Script**
4. Create file: `LinkedInPostExtractor`
5. Paste code from `LinkedInPostExtractor.gs`
6. Create another file: `Code`
7. Paste code from `Code.gs`
8. Save both files

### Usage

- Use **GETPOSTDATE** and **POSTMETADATA** custom functions from LinkedInPostExtractor.gs
- Use **LinkedIn Tools** menu functions from Code.gs
- Use **EXTRACT_POST_ID** formula from Code.gs

This gives you the best of both worlds: automated extraction AND organizational tools.

---

## Supported LinkedIn URL Formats

Both tools support these URL patterns:

1. **Posts URL:**
   ```
   https://www.linkedin.com/posts/username_activity-1234567890123456789-abcd
   ```

2. **Feed Update (Activity):**
   ```
   https://www.linkedin.com/feed/update/urn:li:activity:1234567890123456789
   ```

3. **Feed Update (Share):**
   ```
   https://www.linkedin.com/feed/update/urn:li:share:1234567890123456789
   ```

**Key requirement:** The URL must contain a **19-digit post ID**.

---

## Troubleshooting

### "LinkedIn Tools" menu doesn't appear (Code.gs)

- **Solution 1:** Refresh the Google Sheet page
- **Solution 2:** Close and reopen the sheet
- **Solution 3:** Check that Code.gs is saved in Apps Script
- **Solution 4:** Verify the `onOpen()` function exists in your code

### Custom functions not working (LinkedInPostExtractor.gs)

- **Solution 1:** Verify the script is saved in Apps Script editor
- **Solution 2:** Check that function names are spelled correctly: `GETPOSTDATE`, `POSTMETADATA`
- **Solution 3:** Ensure you've authorized the script
- **Solution 4:** Try refreshing the sheet

### Authorization errors

- **Issue:** "This app isn't verified" warning
- **Solution:** Click **Advanced** > **Go to [Project Name] (unsafe)**
- **Explanation:** This appears because the script isn't published publicly; it's safe to proceed with your own script

### "Enter a valid LinkedIn URL" error

- **Cause:** URL format not recognized or missing post ID
- **Solution:**
  - Copy URL directly from browser address bar
  - Ensure URL contains 19-digit post ID
  - Check URL matches one of the supported formats

### "Error fetching metadata" message (LinkedInPostExtractor.gs)

**Common causes:**

1. **LinkedIn changed their HTML structure**
   - The script parses specific HTML patterns
   - LinkedIn updates may break extraction
   - Check if there's an updated version of the script

2. **Rate limiting**
   - Too many requests in short time
   - Wait 5-10 minutes and try again
   - Use cache feature (6-minute cache)

3. **Network issues**
   - Check internet connection
   - Try a different network if possible

4. **Post is private or deleted**
   - Script can only access public posts
   - Verify the post exists and is public

### Post IDs not extracting (Code.gs)

- **Verify URL format** contains "activity" or "share" identifier
- **Check the 19-digit ID** is present in the URL
- **Try EXTRACT_POST_ID formula** manually: `=EXTRACT_POST_ID(A2)`

### Formulas showing "#REF!" or "#ERROR!"

- **Cause:** Script not loaded or authorized
- **Solution:**
  1. Refresh the page
  2. Re-authorize the script
  3. Verify script is saved in Apps Script editor
  4. Check for typos in function names

### Slow performance with many URLs

**For LinkedInPostExtractor.gs:**
- **Cache helps:** Same URL fetched again loads instantly (6-min cache)
- **Stagger requests:** Don't paste 100 URLs at once
- **Add rows gradually:** Formulas execute sequentially

**For Code.gs:**
- **Use menu functions:** "Parse LinkedIn URLs" processes in batch
- **Avoid volatile functions:** Don't use NOW() or RAND() in same sheet

---

## Privacy & Security

### Data Storage

- **All data stays in your Google Sheet**
- **No external databases** are used
- **No third-party APIs** are called (except LinkedIn's public pages)

### Script Permissions

Both scripts require:
- **Access to Google Sheets** - To read/write data
- **Access to external requests** - To fetch LinkedIn pages (LinkedInPostExtractor.gs only)

### LinkedIn Access

- **No login required** - Scripts access public pages only
- **No credentials stored** - No passwords or tokens used
- **Read-only** - Scripts cannot post or modify LinkedIn content

---

## Best Practices

### For LinkedInPostExtractor.gs

1. **Start small** - Test with 5-10 URLs first
2. **Use cache** - Don't repeatedly refresh for same URLs
3. **Monitor rate limits** - Space out large batches
4. **Respect LinkedIn TOS** - Use for research/analysis only
5. **Check data accuracy** - Verify extracted data makes sense

### For Code.gs

1. **Set up headers first** - Use "Format Sheet" before entering data
2. **Parse URLs in batch** - Use menu function rather than formula
3. **Use data validation** - Dropdown menus prevent typos
4. **Regular backups** - Download as CSV periodically
5. **Clear test data** - Use "Clear Data" function to start fresh

---

## Advanced Usage

### Combining with Other Google Sheets Features

**Pivot Tables:**
- Analyze post types, engagement patterns
- Track author performance over time

**Charts & Graphs:**
- Visualize engagement trends
- Compare original vs reposted content

**Conditional Formatting:**
- Highlight high-engagement posts
- Flag posts with missing data

**Filter Views:**
- Create saved filters for different analyses
- Share specific views with collaborators

### Automation with Google Apps Script Triggers

Advanced users can set up time-based triggers:

1. Go to **Extensions** > **Apps Script**
2. Click **Triggers** (clock icon on left)
3. Add trigger for automated data refresh
4. Choose time interval (hourly, daily, etc.)

**Note:** Be careful with automated triggers to avoid rate limiting.

---

## Support

For issues or questions:

- **GitHub Issues:** [github.com/Tasogarre/gsheets_linkedin_post_extractor](https://github.com/Tasogarre/gsheets_linkedin_post_extractor)
- **Code Comments:** Review inline documentation in .gs files
- **README:** Check main [README.md](./README.md) for overview

---

## Updates & Maintenance

LinkedIn occasionally changes their HTML structure, which may affect LinkedInPostExtractor.gs. If extraction stops working:

1. Check the repository for updated versions
2. Open a GitHub issue with details
3. Review extraction logic in the script
4. Consider contributing a fix via pull request

The Code.gs tool is less affected by LinkedIn changes since it only parses URLs locally.
