
import React, { useState, useMemo } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard, { Product } from './ProductCard';
import ProductModal from './ProductModal';

// Sample product data
const products: Product[] = [
  {
    id: 1,
    name: 'Chuck 70 High Top',
    price: 999000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,shoes,black',
    category: 'Chuck 70',
    isNew: true,
    colors: ['#000000', '#FFFFFF', '#C9082A'],
  },
  {
    id: 2,
    name: 'Run Star Hike Platform',
    price: 1499000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,platform,shoes',
    category: 'Run Star Hike',
    colors: ['#000000', '#FFFFFF', '#F97316'],
  },
  {
    id: 3,
    name: 'One Star Pro Suede',
    price: 1299000,
    discountPrice: 949000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,suede,shoes',
    category: 'One Star',
    isSale: true,
    colors: ['#000000', '#FFFFFF', '#1EAEDB'],
  },
  {
    id: 4,
    name: 'Chuck Taylor All Star',
    price: 849000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,classic,shoes',
    category: 'Chuck Taylor',
    colors: ['#000000', '#FFFFFF', '#8B5CF6'],
  },
];

// More product data for other categories
const newArrivalsProducts = [
  {
    id: 5,
    name: 'Chuck 70 Vintage Canvas',
    price: 1099000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,vintage,shoes',
    category: 'Chuck 70',
    isNew: true,
    colors: ['#000000', '#FFFFFF', '#F97316'],
  },
  {
    id: 6,
    name: 'CONS One Star Pro',
    price: 1299000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,star,shoes',
    category: 'One Star',
    isNew: true,
    colors: ['#000000', '#FFFFFF', '#8B5CF6'],
  },
  {
    id: 7,
    name: 'Chuck Taylor Lugged Boot',
    price: 1599000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,boot,shoes',
    category: 'Chuck Taylor',
    isNew: true,
    colors: ['#000000', '#5E2700', '#403E43'],
  },
  {
    id: 8,
    name: 'Run Star Legacy CX',
    price: 1499000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,running,shoes',
    category: 'Run Star',
    isNew: true,
    colors: ['#000000', '#FFFFFF', '#C9082A'],
  },
];

const bestSellersProducts = [
  {
    id: 9,
    name: 'Chuck Taylor All Star Classic',
    price: 849000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,classic,white',
    category: 'Chuck Taylor',
    colors: ['#000000', '#FFFFFF'],
  },
  {
    id: 10,
    name: 'Chuck 70 Hi Black',
    price: 999000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,black,high',
    category: 'Chuck 70',
    colors: ['#000000', '#FFFFFF'],
  },
  {
    id: 11,
    name: 'One Star Ox Suede',
    price: 1199000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,suede,low',
    category: 'One Star',
    colors: ['#000000', '#5E2700', '#1EAEDB'],
  },
  {
    id: 12,
    name: 'Jack Purcell Canvas',
    price: 899000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,canvas,shoes',
    category: 'Jack Purcell',
    colors: ['#000000', '#FFFFFF', '#F97316'],
  },
];

const saleProducts = [
  {
    id: 13,
    name: 'Chuck Taylor Summer Graphic',
    price: 949000,
    discountPrice: 749000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,graphic,shoes',
    category: 'Chuck Taylor',
    isSale: true,
    colors: ['#FFFFFF', '#F97316', '#1EAEDB'],
  },
  {
    id: 14,
    name: 'Run Star Motion Platform',
    price: 1599000,
    discountPrice: 1199000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,platform,shoes',
    category: 'Run Star',
    isSale: true,
    colors: ['#000000', '#8B5CF6'],
  },
  {
    id: 15,
    name: 'Pro Leather X2 Low Top',
    price: 1299000,
    discountPrice: 999000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,leather,shoes',
    category: 'Pro Leather',
    isSale: true,
    colors: ['#000000', '#FFFFFF', '#5E2700'],
  },
  {
    id: 16,
    name: 'Chuck 70 Gore-Tex Utility',
    price: 1899000,
    discountPrice: 1499000,
    imageUrl: 'https://source.unsplash.com/random/600x600/?converse,utility,shoes',
    category: 'Chuck 70',
    isSale: true,
    colors: ['#000000', '#403E43'],
  },
];

interface FeaturedProductsProps {
  searchQuery?: string;
  selectedCategory?: string;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isProductWishlisted: (productId: number) => boolean;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ 
  searchQuery = "", 
  selectedCategory = "",
  onAddToCart, 
  onAddToWishlist,
  isProductWishlisted
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('featured');
  
  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const allProducts = useMemo(() => {
    return [
      ...products,
      ...newArrivalsProducts,
      ...bestSellersProducts,
      ...saleProducts
    ];
  }, []);
  
  const productCategories = useMemo(() => {
    // Filter by category if one is selected
    if (selectedCategory) {
      const filteredProducts = allProducts.filter(p => 
        p.category.includes(selectedCategory)
      );
      
      // Distribute filtered products across tabs
      return {
        featured: filteredProducts.filter(p => products.some(fp => fp.id === p.id)),
        newArrivals: filteredProducts.filter(p => newArrivalsProducts.some(fp => fp.id === p.id)),
        bestSellers: filteredProducts.filter(p => bestSellersProducts.some(fp => fp.id === p.id)),
        sale: filteredProducts.filter(p => saleProducts.some(fp => fp.id === p.id)),
      };
    }
    
    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      
      // Filter all categories based on search query
      const filtered = {
        featured: products.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query)
        ),
        newArrivals: newArrivalsProducts.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query)
        ),
        bestSellers: bestSellersProducts.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query)
        ),
        sale: saleProducts.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query)
        )
      };
      
      // If searching, automatically select the tab with most results
      const counts = {
        featured: filtered.featured.length,
        newArrivals: filtered.newArrivals.length,
        bestSellers: filtered.bestSellers.length,
        sale: filtered.sale.length
      };
      
      const maxTab = Object.entries(counts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      setActiveTab(maxTab);
      
      return filtered;
    }
    
    // Default - no filters
    return {
      featured: products,
      newArrivals: newArrivalsProducts,
      bestSellers: bestSellersProducts,
      sale: saleProducts,
    };
  }, [searchQuery, selectedCategory, allProducts]);
  
  // Check if we have any search or category results
  const hasResults = useMemo(() => {
    return Object.values(productCategories).some(products => products.length > 0);
  }, [productCategories]);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            {selectedCategory ? `Category: ${selectedCategory}` : 
             searchQuery ? `Search Results: "${searchQuery}"` : 'Our Collection'}
          </h2>
          <div className="flex gap-2">
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {!hasResults && (searchQuery || selectedCategory) && (
          <div className="text-center py-16">
            <h3 className="text-xl mb-2">No results found</h3>
            <p className="text-gray-600">
              {searchQuery ? 
                `We couldn't find any products matching "${searchQuery}".` : 
                `We couldn't find any products in the "${selectedCategory}" category.`
              }
            </p>
          </div>
        )}
        
        {hasResults && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="newArrivals">New Arrivals</TabsTrigger>
              <TabsTrigger value="bestSellers">Best Sellers</TabsTrigger>
              <TabsTrigger value="sale">Sale</TabsTrigger>
            </TabsList>
            
            {Object.entries(productCategories).map(([category, products]) => (
              <TabsContent key={category} value={category}>
                {products.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                      <ProductCard 
                        key={product.id}
                        product={product}
                        onQuickView={handleQuickView}
                        onAddToCart={onAddToCart}
                        onAddToWishlist={onAddToWishlist}
                        isWishlisted={isProductWishlisted(product.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No products found in this category.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
      
      {/* Quick view modal */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={onAddToCart}
          onAddToWishlist={onAddToWishlist}
          isWishlisted={isProductWishlisted(selectedProduct.id)}
        />
      )}
    </section>
  );
};

export default FeaturedProducts;
