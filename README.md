# LinkedIn Post Metadata Extractor for Google Sheets

A collection of Google Apps Script tools for extracting and organizing LinkedIn post metadata in Google Sheets.

## Overview

This repository provides **two different tools** for working with LinkedIn post data in Google Sheets:

1. **LinkedInPostExtractor.gs** - Advanced metadata extraction with custom functions (GETPOSTDATE, POSTMETADATA)
2. **Code.gs** - Basic organizational tool with menu functions for manual data tracking

Choose the tool that best fits your needs and use case.

---

## Tool 1: Advanced Metadata Extractor (LinkedInPostExtractor.gs)

### Features

- **`=GETPOSTDATE(url)`** - Automatically extracts post date from LinkedIn URL
  - Decodes timestamp embedded in LinkedIn post IDs
  - Returns formatted date: `yyyy-MM-dd HH:mm:ss`

- **`=POSTMETADATA(url)`** - Comprehensive metadata extraction
  - Author name and profile URL
  - Post text content
  - Originality detection (original vs repost)
  - Media type detection (image, video, document)
  - Media URLs
  - Engagement metrics (reactions, comments)
  - Results cached for 6 minutes

### Usage

1. Copy the code from `LinkedInPostExtractor.gs` into your Google Sheet's Apps Script editor
2. Use the custom functions directly in cells:

```
=GETPOSTDATE(A2)
=POSTMETADATA(A2)
```

3. POSTMETADATA returns 10 columns:
   - Author Name
   - Author Profile URL
   - Post Content
   - Is Original (TRUE/FALSE)
   - Has Image (TRUE/FALSE)
   - Has Video (TRUE/FALSE)
   - Is Document (TRUE/FALSE)
   - Media URL
   - Reactions Count
   - Comments Count

### Template Structure for POSTMETADATA

| Column | Header | Formula |
|--------|--------|---------|
| A | Post URL | *(paste URLs here)* |
| B | Author Name | `=INDEX(POSTMETADATA($A2),1)` |
| C | Author Profile | `=INDEX(POSTMETADATA($A2),2)` |
| D | Post Content | `=INDEX(POSTMETADATA($A2),3)` |
| E | Is Original | `=INDEX(POSTMETADATA($A2),4)` |
| F | Has Image | `=INDEX(POSTMETADATA($A2),5)` |
| G | Has Video | `=INDEX(POSTMETADATA($A2),6)` |
| H | Is Document | `=INDEX(POSTMETADATA($A2),7)` |
| I | Media URL | `=INDEX(POSTMETADATA($A2),8)` |
| J | Reactions | `=INDEX(POSTMETADATA($A2),9)` |
| K | Comments | `=INDEX(POSTMETADATA($A2),10)` |

---

## Tool 2: Basic Organizational Tool (Code.gs)

### Features

- **Custom menu system** - Access functions via "LinkedIn Tools" menu
- **URL parsing** - Extract post IDs from URLs
- **Header setup** - Pre-configured 12-column template
- **Data validation** - Dropdown menus for post types
- **Formatting tools** - Professional styling and organization
- **Manual tracking** - Structured approach for manual data entry

### Menu Functions

Access these from the **LinkedIn Tools** menu:

- **Parse LinkedIn URLs** - Extract post IDs from URLs in column A
- **Format Sheet** - Apply headers, styling, and data validation
- **Clear Data** - Remove all data while preserving headers

### Template Structure for Code.gs

| Column | Header | Description |
|--------|--------|-------------|
| A | Post URL | Full LinkedIn post URL |
| B | Post ID | Extracted post ID (auto-filled via menu) |
| C | Author Name | *(manual entry)* |
| D | Author Profile URL | *(manual entry)* |
| E | Post Date | *(manual entry)* |
| F | Post Text | *(manual entry)* |
| G | Engagement (Likes) | *(manual entry)* |
| H | Engagement (Comments) | *(manual entry)* |
| I | Engagement (Shares) | *(manual entry)* |
| J | Post Type | Dropdown: Text, Image, Video, etc. |
| K | Tags/Keywords | *(manual entry)* |
| L | Notes | *(manual entry)* |

### Custom Formula

```
=EXTRACT_POST_ID(A2)
```

---

## Which Tool Should I Use?

**Use LinkedInPostExtractor.gs if:**
- You want automated metadata extraction
- You need to analyze many posts efficiently
- You want engagement metrics without manual entry
- You're comfortable with web scraping for research/analysis

**Use Code.gs if:**
- You prefer manual data entry and control
- You want a simple organizational framework
- You need additional custom fields (tags, notes)
- You want menu-driven functions

---

## Files in This Repository

- **`LinkedInPostExtractor.gs`** - Advanced metadata extraction script
- **`Code.gs`** - Basic organizational tool script
- **`SETUP_GUIDE.md`** - Detailed setup instructions for both tools
- **`template_example.csv`** - Example template for Code.gs (12-column structure)
- **`LICENSE`** - MIT License
- **`README.md`** - This file

---

## Supported URL Formats

Both tools recognize these LinkedIn URL patterns:

- `https://www.linkedin.com/posts/username_activity-{19-digit-ID}-{hash}`
- `https://www.linkedin.com/feed/update/urn:li:activity:{19-digit-ID}`
- `https://www.linkedin.com/feed/update/urn:li:share:{19-digit-ID}`

---

## Setup Instructions

See the complete setup guide in [SETUP_GUIDE.md](./SETUP_GUIDE.md)

**Quick Start:**

1. Create a new Google Sheet
2. Go to **Extensions** > **Apps Script**
3. Copy the code from either `LinkedInPostExtractor.gs` or `Code.gs` (or both)
4. Save and authorize the script
5. Start using the functions

---

## Use Cases

- **Content Analysis** - Track post performance over time
- **Competitive Research** - Monitor industry trends and competitor content
- **Campaign Tracking** - Measure LinkedIn marketing effectiveness
- **Academic Research** - Analyze social media communication patterns
- **Personal Archive** - Maintain a searchable database of saved posts

---

## Important Notes

### Technical Limitations

- **LinkedIn's HTML structure** may change, affecting extraction accuracy
- **Public posts only** - Private/restricted posts cannot be accessed
- **Rate limiting** - Excessive requests may trigger temporary blocks
- **Authentication** - Scripts access public pages without login

### Legal & Ethical Considerations

**LinkedInPostExtractor.gs** uses automated web scraping via `UrlFetchApp.fetch()`. Users must:

- ✅ Use for research, analysis, or educational purposes
- ✅ Respect LinkedIn's robots.txt and rate limits
- ✅ Comply with applicable data protection laws (GDPR, CCPA, etc.)
- ✅ Only access public information
- ❌ Do not use for commercial scraping at scale
- ❌ Do not violate LinkedIn's Terms of Service
- ❌ Do not scrape private or restricted content

**You are responsible for ensuring your use complies with all applicable terms of service and laws.**

---

## Troubleshooting

### "Enter a valid LinkedIn URL" error
- Verify the URL format is correct
- Ensure the URL contains a 19-digit post ID
- Try copying the URL directly from the browser

### "Error fetching metadata" message
- LinkedIn may have changed their HTML structure
- You may have hit a rate limit (wait and retry)
- The post may be private or deleted
- Check your internet connection

### Functions not appearing
- Refresh the Google Sheet
- Verify the script is saved in Apps Script editor
- Check that you've authorized the script
- Ensure function names are spelled correctly

---

## Contributing

Contributions are welcome! Please feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests
- Improve documentation

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Author:** Marcus Bearden ([linkedin.com/in/beardenm](http://linkedin.com/in/beardenm/))

---

## Disclaimer

These tools are provided for educational, research, and personal organizational purposes. Users must comply with:

- LinkedIn's Terms of Service
- Applicable data protection regulations
- Ethical web scraping practices

The authors are not responsible for misuse of these tools. Always respect website terms of service and applicable laws when collecting data.

---

## Support

For questions or issues:

- Open an issue on [GitHub](https://github.com/Tasogarre/gsheets_linkedin_post_extractor)
- Review the [Setup Guide](./SETUP_GUIDE.md)
- Check the inline code comments in the .gs files
