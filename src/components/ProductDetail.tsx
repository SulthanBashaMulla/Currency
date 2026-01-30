import { motion } from "framer-motion";
import { X, ArrowLeft, Package } from "lucide-react";
import { categoryImages } from "@/config/googleSheets";
import { useEffect } from "react";

interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  image?: string;
}

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  // Handle ESC key press to close
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    
    // Prevent body scroll when detail is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const getProductImage = (): string => {
    if (product.image) {
      return product.image;
    }
    return categoryImages[product.category] || categoryImages["Miscellaneous"];
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm overflow-y-auto"
    >
      <div className="container mx-auto px-4 py-8 min-h-screen">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Products</span>
          </button>
        </motion.div>

        {/* Product Detail Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-6xl mx-auto bg-card border border-border rounded-2xl overflow-hidden shadow-xl"
        >
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image Section */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary/30">
                <img
                  src={getProductImage()}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = categoryImages[product.category] || categoryImages["Miscellaneous"];
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className="bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              
              {/* Additional Image Info */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="w-4 h-4" />
                <span>High-quality product image</span>
              </div>
            </div>

            {/* Product Information Section */}
            <div className="flex flex-col justify-center space-y-6">
              {/* Product Name */}
              <div>
                <h1 className="text-4xl font-display font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <p className="text-muted-foreground">
                  Premium quality hardware fitting
                </p>
              </div>

              {/* Product Code */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Product Code
                </label>
                <div className="flex items-center gap-3">
                  <code className="text-2xl font-mono font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
                    {product.code}
                  </code>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Category
                </label>
                <div className="inline-flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
                  <span className="font-medium">{product.category}</span>
                </div>
              </div>

              {/* Product ID */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Product ID
                </label>
                <p className="font-mono text-foreground">#{product.id}</p>
              </div>

              {/* Divider */}
              <div className="border-t border-border my-6"></div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Product Features
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Premium quality materials</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Durable and long-lasting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Industry standard compliance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span>Available for bulk orders</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = "/#contact";
                  }}
                  className="flex-1 px-6 py-3 bg-gradient-primary text-primary-foreground font-semibold rounded-lg hover:shadow-glow transition-all duration-300 text-center"
                >
                  Request Quote
                </a>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-secondary text-foreground font-semibold rounded-lg hover:bg-secondary/80 transition-all duration-300"
                >
                  Continue Browsing
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Close Button (Top Right) */}
        <button
          onClick={onClose}
          className="fixed top-8 right-8 p-2 bg-card border border-border rounded-full hover:border-primary/50 hover:bg-card/80 transition-all duration-300 group"
          aria-label="Close product detail"
        >
          <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductDetail;
