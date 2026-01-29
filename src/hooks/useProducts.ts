import { useState, useEffect, useCallback } from 'react';
import { fetchProductsFromSheet, extractCategories, ProductCache } from '@/utils/googleSheets';
import type { Product } from '@/utils/googleSheets';

interface UseProductsOptions {
  spreadsheetId: string;
  sheetName?: string;
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
}

interface UseProductsReturn {
  products: Product[];
  categories: string[];
  loading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  lastUpdated: Date | null;
}

/**
 * Custom hook to fetch and manage products from Google Sheets
 * 
 * @example
 * const { products, categories, loading, error, refresh } = useProducts({
 *   spreadsheetId: "YOUR_SPREADSHEET_ID",
 *   sheetName: "Products",
 *   autoRefresh: true,
 *   refreshInterval: 300000, // 5 minutes
 * });
 */
export function useProducts({
  spreadsheetId,
  sheetName = "Sheet1",
  autoRefresh = false,
  refreshInterval = 300000, // 5 minutes default
}: UseProductsOptions): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to load from cache first
      const cached = ProductCache.load();
      if (cached && cached.length > 0) {
        setProducts(cached);
        setCategories(extractCategories(cached));
        setLoading(false);
        // Continue fetching in background
      }

      // Fetch from Google Sheets
      const fetchedProducts = await fetchProductsFromSheet(spreadsheetId, sheetName);
      
      if (fetchedProducts.length === 0) {
        throw new Error("No products found in the sheet");
      }

      setProducts(fetchedProducts);
      setCategories(extractCategories(fetchedProducts));
      setLastUpdated(new Date());
      
      // Save to cache
      ProductCache.save(fetchedProducts);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Failed to load products");
      setError(error);
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }, [spreadsheetId, sheetName]);

  // Initial load
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Auto-refresh if enabled
  useEffect(() => {
    if (!autoRefresh) return;

    const intervalId = setInterval(() => {
      loadProducts();
    }, refreshInterval);

    return () => clearInterval(intervalId);
  }, [autoRefresh, refreshInterval, loadProducts]);

  return {
    products,
    categories,
    loading,
    error,
    refresh: loadProducts,
    lastUpdated,
  };
}
