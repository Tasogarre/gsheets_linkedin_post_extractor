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
