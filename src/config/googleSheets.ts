/**
 * Google Sheets Configuration
 * 
 * To set up:
 * 1. Create a Google Sheet with columns: id, name, code, category
 * 2. Publish the sheet: File > Share > Publish to web > Link tab > Entire Document > CSV
 * 3. Copy the spreadsheet ID from the URL:
 *    https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
 * 4. Replace SPREADSHEET_ID below with your actual ID
 */

export const GOOGLE_SHEETS_CONFIG = {
  // Replace this with your Google Sheet ID
  spreadsheetId: "1eIPegcIYSCpHEstiSBL_USsPBIUz9Vhpo5yXY0eMMWA",
  
  // The name of the sheet tab containing your products
  sheetName: "Products",
  
  // Enable auto-refresh to periodically fetch updates
  autoRefresh: true,
  
  // How often to refresh (in milliseconds) - 5 minutes = 300000ms
  refreshInterval: 300000,
};

/**
 * Category images mapping
 * You can customize these images for each category
 */
export const categoryImages: Record<string, string> = {
  "Aluminium Fittings": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  "Bath Accessories": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
  "Bath Fittings": "https://images.unsplash.com/photo-1585128792020-803d29415281?w=400&h=300&fit=crop",
  "Curtain Fittings & Profiles": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
  "Hardware Fittings": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
  "Hinges & Sliding Systems": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop",
  "Sanitary Fittings": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
  "Miscellaneous": "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400&h=300&fit=crop",
  "PVC Pipes & Sections": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
};
