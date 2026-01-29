// Google Sheets integration utility
// This fetches product data from a published Google Sheet

export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  image?: string; // Optional: direct image URL for this product
}

export interface SheetConfig {
  spreadsheetId: string;
  sheetName: string;
  apiKey?: string; // Optional: for private sheets
}

/**
 * Fetch products from Google Sheets using the published CSV export URL
 * @param spreadsheetId - The ID of your Google Sheet
 * @param sheetName - The name of the sheet tab (default: "Sheet1")
 * @returns Array of products
 */
export async function fetchProductsFromSheet(
  spreadsheetId: string,
  sheetName: string = "Sheet1"
): Promise<Product[]> {
  try {
    // Google Sheets CSV export URL format
    const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    
    const response = await fetch(csvUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.statusText}`);
    }
    
    const csvText = await response.text();
    return parseCSVToProducts(csvText);
  } catch (error) {
    console.error("Error fetching products from Google Sheets:", error);
    throw error;
  }
}

/**
 * Parse CSV text into Product array
 * Expected CSV format:
 * id,name,code,category,image (image column is optional)
 * 1,Product Name,PRODUCT-CODE,Category Name,https://example.com/image.jpg
 */
function parseCSVToProducts(csvText: string): Product[] {
  const lines = csvText.split('\n').filter(line => line.trim());
  
  if (lines.length < 2) {
    throw new Error("CSV file is empty or has no data rows");
  }
  
  // Remove header row
  const dataLines = lines.slice(1);
  
  const products: Product[] = [];
  
  dataLines.forEach((line, index) => {
    try {
      const values = parseCSVLine(line);
      
      if (values.length >= 4) {
        const product: Product = {
          id: values[0].trim(),
          name: values[1].trim(),
          code: values[2].trim(),
          category: values[3].trim(),
        };
        
        // Add image if provided (5th column)
        if (values.length >= 5 && values[4].trim()) {
          product.image = values[4].trim();
        }
        
        products.push(product);
      }
    } catch (error) {
      console.warn(`Skipping invalid row ${index + 2}:`, error);
    }
  });
  
  return products;
}

/**
 * Parse a single CSV line handling quoted values
 */
function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let currentValue = '';
  let insideQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (insideQuotes && nextChar === '"') {
        // Escaped quote
        currentValue += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        insideQuotes = !insideQuotes;
      }
    } else if (char === ',' && !insideQuotes) {
      // End of value
      values.push(currentValue);
      currentValue = '';
    } else {
      currentValue += char;
    }
  }
  
  // Add last value
  values.push(currentValue);
  
  return values;
}

/**
 * Extract unique categories from products
 */
export function extractCategories(products: Product[]): string[] {
  const categorySet = new Set<string>();
  products.forEach(product => {
    if (product.category) {
      categorySet.add(product.category);
    }
  });
  return Array.from(categorySet).sort();
}

/**
 * Cache management for product data
 */
export class ProductCache {
  private static CACHE_KEY = 'products_cache';
  private static TIMESTAMP_KEY = 'products_cache_timestamp';
  private static CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  
  static save(products: Product[]): void {
    try {
      localStorage.setItem(this.CACHE_KEY, JSON.stringify(products));
      localStorage.setItem(this.TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.warn("Failed to save products to cache:", error);
    }
  }
  
  static load(): Product[] | null {
    try {
      const timestamp = localStorage.getItem(this.TIMESTAMP_KEY);
      const cached = localStorage.getItem(this.CACHE_KEY);
      
      if (!timestamp || !cached) {
        return null;
      }
      
      const age = Date.now() - parseInt(timestamp);
      if (age > this.CACHE_DURATION) {
        // Cache expired
        this.clear();
        return null;
      }
      
      return JSON.parse(cached);
    } catch (error) {
      console.warn("Failed to load products from cache:", error);
      return null;
    }
  }
  
  static clear(): void {
    try {
      localStorage.removeItem(this.CACHE_KEY);
      localStorage.removeItem(this.TIMESTAMP_KEY);
    } catch (error) {
      console.warn("Failed to clear cache:", error);
    }
  }
}
