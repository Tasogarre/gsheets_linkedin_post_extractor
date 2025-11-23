# LinkedIn Post Extractor for Google Sheets

A Google Apps Script tool that helps you track and organize LinkedIn post details in a Google Sheets template.

## Overview

This tool provides a structured Google Sheets template with built-in Apps Script functions to help you organize and track LinkedIn posts. While direct automated scraping of LinkedIn is not possible due to authentication requirements, this tool offers URL parsing capabilities and an organized framework for manually tracking post metrics.

## Features

- **Automated URL Parsing**: Extract post IDs from LinkedIn URLs
- **Pre-configured Template**: Ready-to-use spreadsheet with proper headers
- **Custom Menu Functions**: Easy-to-use tools accessible from the Google Sheets menu
- **Data Validation**: Dropdown menus for post types
- **Professional Formatting**: Auto-formatted columns with proper styling
- **Custom Formulas**: Use `=EXTRACT_POST_ID()` function in cells
- **Engagement Tracking**: Track likes, comments, and shares over time

## Quick Start

### Option 1: Use the Template (Recommended)

1. **Copy the template** (link to be added when template is published)
2. **Click "LinkedIn Tools" > "Format Sheet"** to set up headers
3. **Start adding LinkedIn post URLs** in column A
4. **Click "LinkedIn Tools" > "Parse LinkedIn URLs"** to extract post IDs
5. **Fill in the remaining details** manually

### Option 2: Manual Setup

Follow the detailed instructions in [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## Template Structure

The template includes the following columns:

| Column | Header | Description |
|--------|--------|-------------|
| A | Post URL | Full LinkedIn post URL |
| B | Post ID | Extracted post ID (auto-filled) |
| C | Author Name | Name of the post author |
| D | Author Profile URL | LinkedIn profile URL of the author |
| E | Post Date | Date the post was published |
| F | Post Text | Content of the post |
| G | Engagement (Likes) | Number of likes |
| H | Engagement (Comments) | Number of comments |
| I | Engagement (Shares) | Number of shares |
| J | Post Type | Type of post (Text, Image, Video, etc.) |
| K | Tags/Keywords | Custom tags for categorization |
| L | Notes | Additional notes or observations |

## Available Functions

### Menu Functions

Access these from **LinkedIn Tools** menu:

- **Parse LinkedIn URLs**: Automatically extract post IDs from URLs in column A
- **Format Sheet**: Apply professional formatting and set up headers
- **Clear Data**: Remove all data while preserving headers

### Custom Formula

Use in spreadsheet cells:
```
=EXTRACT_POST_ID(A2)
```
Extracts the post ID from a LinkedIn URL in cell A2.

## Supported URL Formats

The script recognizes these LinkedIn URL patterns:

- `https://www.linkedin.com/posts/username_activity-{ID}-{hash}`
- `https://www.linkedin.com/feed/update/urn:li:activity:{ID}`
- `https://www.linkedin.com/feed/update/urn:li:share:{ID}`

## Use Cases

- **Content Analysis**: Track performance of LinkedIn posts over time
- **Competitor Research**: Monitor competitor post engagement
- **Campaign Tracking**: Measure effectiveness of LinkedIn marketing campaigns
- **Content Calendar**: Maintain a record of published content
- **Trend Analysis**: Identify patterns in successful posts

## Important Limitations

Due to LinkedIn's Terms of Service and authentication requirements:

- **No automated data scraping**: Engagement metrics must be collected manually
- **No LinkedIn API integration**: This tool focuses on organization, not automation
- **Manual data entry required**: Post content and metrics need to be entered by hand

This tool is designed to **organize and track** your manual observations, not to automate data collection from LinkedIn.

## Files in This Repository

- **`Code.gs`**: The Google Apps Script code to copy into your Google Sheet
- **`SETUP_GUIDE.md`**: Detailed setup instructions
- **`LICENSE`**: MIT License
- **`README.md`**: This file

## Setup Instructions

See the complete setup guide in [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This tool is for educational and organizational purposes. Users must comply with LinkedIn's Terms of Service and should not use automated scraping methods. All data collection should be done manually and ethically.

## Support

For questions or issues:
- Open an issue on GitHub
- Review the [Setup Guide](./SETUP_GUIDE.md)
- Check the code comments in `Code.gs`

---

**Note**: This is an organizational tool, not a web scraper. Always respect LinkedIn's Terms of Service and privacy policies when collecting data.
=======
# LinkedIn Post Metadata Extractor for Google Sheets

A Google Apps Script that extracts comprehensive metadata from LinkedIn posts via HTML scraping and populates it into a Google Sheets table for analysis and tracking.

## Features

This script provides two main custom functions for Google Sheets:

### `GETPOSTDATE(linkedinURL)`
Extracts and formats the post timestamp from a LinkedIn URL by decoding the Unix timestamp embedded in the 19-digit post ID.

**Returns:** Formatted date string (yyyy-MM-dd HH:mm:ss)

### `POSTMETADATA(url)`
Scrapes comprehensive metadata from a LinkedIn post including:
- Post author name and profile URL
- Post content/text
- Originality detection (original post vs. repost)
- Media type detection (images, videos, documents)
- Media URLs
- Engagement metrics (reactions, comments)

**Returns:** Array of metadata fields for populating table columns

## Installation

1. Open your Google Sheet
2. Go to **Extensions > Apps Script**
3. Delete any existing code in the script editor
4. Copy the entire contents of `LinkedInPostExtractor.gs` into the editor
5. Save the project (File > Save or Ctrl+S)
6. Close the Apps Script editor

## Usage

### Setting Up Your Table

Create a table in your Google Sheet with the following headers (tab-delimited):

```
Post_Url	Post_Timestamp	Post_Author	Author_Url	Post_Content	Is_Repost	Has_Image	Has_Video	Has_Document	Media_Url	Reactions	Comments	Impressions	Shares
```

### Column Descriptions

| Column | Description | Source |
|--------|-------------|--------|
| `Post_Url` | The LinkedIn post URL | Manual entry |
| `Post_Timestamp` | Post creation date and time | `=GETPOSTDATE(A2)` |
| `Post_Author` | Name of the post author | `=POSTMETADATA(A2)` |
| `Author_Url` | LinkedIn profile URL of author | `=POSTMETADATA(A2)` |
| `Post_Content` | Text content of the post | `=POSTMETADATA(A2)` |
| `Is_Repost` | TRUE if original post, FALSE if repost/share | `=POSTMETADATA(A2)` |
| `Has_Image` | TRUE if post contains an image | `=POSTMETADATA(A2)` |
| `Has_Video` | TRUE if post contains a video | `=POSTMETADATA(A2)` |
| `Has_Document` | TRUE if post contains a document/PDF | `=POSTMETADATA(A2)` |
| `Media_Url` | URL of the media content | `=POSTMETADATA(A2)` |
| `Reactions` | Number of reactions/likes | `=POSTMETADATA(A2)` |
| `Comments` | Number of comments | `=POSTMETADATA(A2)` |
| `Impressions` | Post impressions | **Manual entry** |
| `Shares` | Number of shares | **Manual entry** |

### Formula Examples

Assuming your LinkedIn URL is in cell A2:

**Get Post Timestamp:**
```
=GETPOSTDATE(A2)
```

**Get All Metadata (expands across multiple columns):**
```
=POSTMETADATA(A2)
```

The `POSTMETADATA()` function returns an array that populates 10 columns in this order:
1. Post_Author
2. Author_Url
3. Post_Content
4. Is_Repost
5. Has_Image
6. Has_Video
7. Has_Document
8. Media_Url
9. Reactions
10. Comments

To use it correctly, enter the formula in the first metadata column (Post_Author) and it will automatically populate across the subsequent columns.

### Example Workflow

1. Paste a LinkedIn post URL in column A (Post_Url)
2. In column B (Post_Timestamp), enter: `=GETPOSTDATE(A2)`
3. In column C (Post_Author), enter: `=POSTMETADATA(A2)`
4. The formula in C will automatically populate columns C through L
5. Manually enter Impressions and Shares data in columns M and N (LinkedIn doesn't expose these in the page HTML)

## Caching

The `POSTMETADATA()` function implements a 6-minute cache to improve performance and reduce redundant HTTP requests. If you need fresh data, wait 6 minutes or clear the script cache via the Apps Script editor.

## Limitations

### Manual Data Entry Required
- **Impressions:** LinkedIn does not expose impression counts in the publicly accessible HTML
- **Shares:** Share counts are not consistently available in the page source

### LinkedIn Access
- This script scrapes publicly accessible LinkedIn pages
- You may encounter rate limiting if making many requests in quick succession
- LinkedIn's HTML structure may change over time, potentially requiring script updates

### Supported URL Formats
The script validates URLs matching these patterns:
- `https://www.linkedin.com/feed/update/...`
- `https://linkedin.com/feed/update/...`
- `https://www.linkedin.com/posts/...`
- `https://linkedin.com/posts/...`

## How It Works

### Post ID Timestamp Decoding
LinkedIn's 19-digit post IDs (URNs) encode the creation timestamp in the first 41 bits when converted to binary. The `GETPOSTDATE()` function:
1. Extracts the 19-digit post ID from the URL
2. Converts it to binary representation
3. Extracts the first 41 bits
4. Converts to a Unix timestamp
5. Formats as a readable date

### Metadata Scraping
The `POSTMETADATA()` function uses a multi-layered approach:
1. **Scope Narrowing:** Isolates the main post content from related posts/ads
2. **Originality Detection:** Identifies reposts via the `feed-reshare-content` class
3. **Text Extraction:** Prioritizes commentary text, falls back to meta descriptions
4. **Media Detection:** Uses OpenGraph tags and JSON-LD data to identify media types
5. **Engagement Scraping:** Extracts reaction and comment counts from data attributes
6. **JSON-LD Parsing:** Extracts author information from structured data

## License

MIT License - See [LICENSE](LICENSE) file for details

Copyright (c) 2025 Marcus Bearden

## Author

Marcus Bearden - [LinkedIn Profile](http://linkedin.com/in/beardenm/)

## Contributing

Contributions, issues, and feature requests are welcome!

## Disclaimer

This tool is for educational and research purposes. Users are responsible for complying with LinkedIn's Terms of Service and acceptable use policies. The scraping functionality relies on LinkedIn's public HTML structure, which may change without notice.
