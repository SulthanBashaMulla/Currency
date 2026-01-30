import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Package, X, Filter, ChevronDown, RefreshCw, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeInSection } from "@/components/AnimatedSections";
import PageTransition from "@/components/PageTransition";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/useProducts";
import { GOOGLE_SHEETS_CONFIG, categoryImages } from "@/config/googleSheets";
import ProductDetail from "@/components/ProductDetail";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Catalogue = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  // Fetch products from Google Sheets
  const { products, categories, loading, error, refresh, lastUpdated } = useProducts({
    spreadsheetId: GOOGLE_SHEETS_CONFIG.spreadsheetId,
    sheetName: GOOGLE_SHEETS_CONFIG.sheetName,
    autoRefresh: GOOGLE_SHEETS_CONFIG.autoRefresh,
    refreshInterval: GOOGLE_SHEETS_CONFIG.refreshInterval,
  });

  // Filter products based on search and categories
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category);

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategories, products]);

  // Group products by category
  const groupedProducts = useMemo(() => {
    const grouped: Record<string, typeof products> = {};
    filteredProducts.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  }, [filteredProducts]);

  const categoryCount = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((product) => {
      counts[product.category] = (counts[product.category] || 0) + 1;
    });
    return counts;
  }, [products]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const getProductImage = (product: typeof products[0]): string => {
    // Use product-specific image if available, otherwise fall back to category image
    if (product.image) {
      return product.image;
    }
    return categoryImages[product.category] || categoryImages["Miscellaneous"];
  };

  // Error state
  if (error && products.length === 0) {
    return (
      <PageTransition>
        <Navbar />
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Failed to Load Products</h2>
              <p className="text-muted-foreground mb-6">
                {error.message}
              </p>
              <button
                onClick={refresh}
                className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-glow transition-all duration-300 inline-flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Navbar />

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            onClose={() => setSelectedProduct(null)} 
          />
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Product <span className="text-gradient">Catalogue</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Browse our complete collection of {products.length} premium hardware and fittings products.
              {lastUpdated && (
                <span className="block text-sm mt-2 text-muted-foreground/70">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </p>

            {/* Refresh Button */}
            <div className="mb-6">
              <button
                onClick={refresh}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-secondary/50 hover:bg-secondary rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Refreshing...' : 'Refresh Products'}
              </button>
            </div>

            {/* Search and Filter Row */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by name, code, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 py-6 text-lg bg-card border-border rounded-xl focus:border-primary/50 focus:ring-primary/20"
                  disabled={loading}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded-full transition-colors"
                  >
                    <X className="h-5 w-5 text-muted-foreground" />
                  </button>
                )}
              </div>

              {/* Filter Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center gap-2 px-6 py-3 bg-card border border-border rounded-xl text-foreground hover:border-primary/50 transition-all min-w-[140px]">
                    <Filter className="w-5 h-5" />
                    <span>Filter</span>
                    {selectedCategories.length > 0 && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {selectedCategories.length}
                      </span>
                    )}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-72 bg-card border-border z-50"
                  sideOffset={8}
                >
                  <div className="p-3 border-b border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Categories</span>
                      {selectedCategories.length > 0 && (
                        <button 
                          onClick={() => setSelectedCategories([])} 
                          className="text-xs text-primary hover:text-primary/80 transition-colors"
                        >
                          Clear all
                        </button>
                      )}
                    </div>
                  </div>
                  {categories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                      className="cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>{category}</span>
                        <span className="text-xs text-muted-foreground ml-2">
                          ({categoryCount[category] || 0})
                        </span>
                      </div>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Active Filters Display */}
      {selectedCategories.length > 0 && (
        <section className="py-4 border-b border-border bg-background/50 backdrop-blur-sm sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-2 items-center justify-center">
              <span className="text-sm text-muted-foreground mr-2">Active filters:</span>
              {selectedCategories.map((category) => (
                <motion.span
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {category}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.span>
              ))}
              <button
                onClick={() => setSelectedCategories([])}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-2"
              >
                Clear all
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Loading State */}
      {loading && products.length === 0 && (
        <section className="py-20 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <RefreshCw className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        </section>
      )}

      {/* Products Grid */}
      {!loading || products.length > 0 ? (
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4">
            {/* Results Count */}
            <FadeInSection className="mb-8">
              <p className="text-muted-foreground">
                Showing <span className="text-primary font-semibold">{filteredProducts.length}</span> of{" "}
                <span className="font-semibold">{products.length}</span> products
                {selectedCategories.length > 0 && (
                  <span>
                    {" "}in <span className="text-primary font-semibold">{selectedCategories.length} categories</span>
                  </span>
                )}
                {searchQuery && (
                  <span>
                    {" "}matching "<span className="text-primary font-semibold">{searchQuery}</span>"
                  </span>
                )}
              </p>
            </FadeInSection>

            {/* Empty State */}
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="text-center py-20"
                >
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No items found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategories([]);
                    }}
                    className="px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-glow transition-all duration-300"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="products"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
                    <div key={category} className="mb-12">
                      <h2 className="text-2xl md:text-3xl font-display font-bold mb-6 flex items-center gap-3">
                        <span className="w-2 h-8 bg-gradient-primary rounded-full" />
                        {category}
                        <span className="text-sm font-normal text-muted-foreground">
                          ({categoryProducts.length} items)
                        </span>
                      </h2>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <AnimatePresence>
                          {categoryProducts.map((product, index) => (
                            <motion.div
                              key={product.id}
                              layout
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: 0.3, delay: index * 0.02 }}
                              whileHover={{ y: -4 }}
                              onClick={() => setSelectedProduct(product)}
                              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                              {/* Product Image */}
                              <div className="relative h-40 overflow-hidden bg-secondary/30">
                                <img
                                  src={getProductImage(product)}
                                  alt={product.name}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  onError={(e) => {
                                    // Fallback to category image if product image fails to load
                                    e.currentTarget.src = categoryImages[product.category] || categoryImages["Miscellaneous"];
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                                <span className="absolute bottom-2 left-2 text-xs bg-primary/90 text-primary-foreground px-2 py-1 rounded">
                                  {product.category.split(' ')[0]}
                                </span>
                              </div>
                              
                              {/* Product Info */}
                              <div className="p-4">
                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-2 line-clamp-2">
                                  {product.name}
                                </h3>
                                <p className="text-xs font-mono text-muted-foreground bg-secondary/50 px-2 py-1 rounded inline-block">
                                  {product.code}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      ) : null}

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <FadeInSection className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Need <span className="text-gradient">Assistance</span>?
            </h2>
            <p className="text-muted-foreground mb-8">
              Contact us for bulk orders, custom requirements, or any product inquiries.
            </p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                window.location.href = "/#contact";
              }}
              className="inline-block px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:shadow-glow transition-all duration-300"
            >
              Get in Touch
            </a>
          </FadeInSection>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default Catalogue;
