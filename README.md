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
