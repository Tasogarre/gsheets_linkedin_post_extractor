# Google Sheets Template Setup Guide

This guide will walk you through setting up the LinkedIn Post Extractor template in Google Sheets.

## Quick Setup Instructions

### Step 1: Create a New Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "LinkedIn Post Tracker" (or your preferred name)

### Step 2: Add the Apps Script

1. In your Google Sheet, click on **Extensions** > **Apps Script**
2. Delete any existing code in the script editor
3. Copy all the code from the `Code.gs` file in this repository
4. Paste it into the Apps Script editor
5. Click the **Save** icon (💾) or press `Ctrl+S` (Cmd+S on Mac)
6. Name your project (e.g., "LinkedIn Post Extractor")

### Step 3: Set Up the Sheet Headers

1. Close the Apps Script editor and return to your Google Sheet
2. Refresh the page (you may need to wait a few seconds)
3. You should now see a new menu item called **"LinkedIn Tools"** in the menu bar
4. Click **LinkedIn Tools** > **Format Sheet** to automatically set up the headers and formatting

Alternatively, you can manually add these headers to row 1:
- **A1:** Post URL
- **B1:** Post ID
- **C1:** Author Name
- **D1:** Author Profile URL
- **E1:** Post Date
- **F1:** Post Text
- **G1:** Engagement (Likes)
- **H1:** Engagement (Comments)
- **I1:** Engagement (Shares)
- **J1:** Post Type
- **K1:** Tags/Keywords
- **L1:** Notes

### Step 4: Authorize the Script (First Time Only)

The first time you use any script function:

1. Click **LinkedIn Tools** > **Parse LinkedIn URLs** (or any other menu item)
2. Google will show an authorization dialog
3. Click **Continue** or **Review Permissions**
4. Select your Google account
5. Click **Advanced** > **Go to [Your Project Name] (unsafe)**
   - Note: This warning appears because the script is not published; it's safe to proceed with your own script
6. Click **Allow** to grant necessary permissions

## Using the Template

### Adding LinkedIn Posts

1. **Paste LinkedIn post URLs** into column A (starting from row 2)
2. Click **LinkedIn Tools** > **Parse LinkedIn URLs** to automatically extract post IDs to column B
3. **Manually fill in** the remaining columns:
   - Author Name
   - Author Profile URL
   - Post Date
   - Post Text (copy the post content)
   - Engagement metrics (Likes, Comments, Shares)
   - Post Type (select from dropdown: Text, Image, Video, Carousel, Article, Poll, Document)
   - Tags/Keywords
   - Notes

### Available Menu Functions

**LinkedIn Tools Menu:**

- **Parse LinkedIn URLs**: Extracts post IDs from URLs in column A
- **Format Sheet**: Applies formatting, headers, and data validation
- **Clear Data**: Removes all data while keeping headers

### Custom Formula

You can also use the custom formula in any cell:

```
=EXTRACT_POST_ID(A2)
```

This will extract the post ID from a LinkedIn URL in cell A2.

### Supported LinkedIn URL Formats

The script can parse these LinkedIn URL patterns:

1. `https://www.linkedin.com/posts/username_activity-1234567890123456789-abcd`
2. `https://www.linkedin.com/feed/update/urn:li:activity:1234567890123456789`
3. `https://www.linkedin.com/feed/update/urn:li:share:1234567890123456789`

## Important Notes

### Data Collection Limitations

Due to LinkedIn's authentication requirements and Terms of Service:
- **Direct automated scraping is not possible** from Apps Script
- You must **manually collect** engagement metrics and post content
- The script provides **organizational tools** rather than automated extraction

### Recommended Workflow

1. **Browse LinkedIn** and find posts you want to track
2. **Copy the post URL** and paste it into column A
3. **Manually record** the post details (author, text, engagement, etc.)
4. Use the **Parse LinkedIn URLs** function to extract post IDs automatically
5. Keep the sheet **updated regularly** to track engagement growth over time

## Template Sharing

To share your configured template:

1. Click **File** > **Make a copy** to create a personal copy
2. Click **Share** in the top right
3. Adjust sharing settings as needed
4. The Apps Script code is automatically copied with the sheet

## Troubleshooting

### "LinkedIn Tools" menu doesn't appear
- Refresh the page
- Make sure you saved the Apps Script
- Check that the script is properly pasted in the Apps Script editor

### Authorization errors
- Go through the authorization flow again
- Make sure you're logged into your Google account
- Check that pop-ups aren't blocked

### Post IDs not extracting
- Verify the LinkedIn URL format is correct
- Try copying the URL directly from the browser address bar
- Check that the URL contains "activity" or "share" identifiers

## Privacy & Security

- All data stays in **your Google Sheet**
- No external services are called
- The script only processes URLs locally
- No LinkedIn credentials are required or stored

## Support

For issues or questions:
- Check the [GitHub repository](https://github.com/Tasogarre/gsheets_linkedin_post_extractor)
- Review the code in `Code.gs`
- Open an issue on GitHub
