import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryBanner from '@/components/CategoryBanner';
import FeaturedProducts from '@/components/FeaturedProducts';
import Promotions from '@/components/Promotions';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import LiveChat from '@/components/LiveChat';
import ShoppingCart from '@/components/ShoppingCart';
import WishlistModal from '@/components/WishlistModal';
import { Product } from '@/components/ProductCard';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

// Sample cart data for testing
const sampleCartItems = [
  {
    product: {
      id: 1,
      name: 'Chuck 70 High Top',
      price: 999000,
      imageUrl: 'https://source.unsplash.com/random/600x600/?converse,shoes,black',
      category: 'Chuck 70',
      isNew: true,
      colors: ['#000000', '#FFFFFF', '#C9082A'],
    },
    quantity: 1,
    size: '8',
    color: '#000000',
  },
  {
    product: {
      id: 3,
      name: 'One Star Pro Suede',
      price: 1299000,
      discountPrice: 949000,
      imageUrl: 'https://source.unsplash.com/random/600x600/?converse,suede,shoes',
      category: 'One Star',
      isSale: true,
      colors: ['#000000', '#FFFFFF', '#1EAEDB'],
    },
    quantity: 2,
    size: '9',
    color: '#1EAEDB',
  },
];

// Define a CartItem type that matches our cart structure
interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

// Define a WishlistItem type
interface WishlistItem {
  product: Product;
}

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(sampleCartItems);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [orderTrackingId, setOrderTrackingId] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Update cart quantity in Navbar
  useEffect(() => {
    // We could implement a context for this in a real app
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
      cartBadge.textContent = cartItems.length.toString();
    }
  }, [cartItems]);
  
  // Update wishlist quantity in Navbar
  useEffect(() => {
    // We could implement a context for this in a real app
    const wishlistBadge = document.querySelector('.wishlist-badge');
    if (wishlistBadge) {
      wishlistBadge.textContent = wishlistItems.length.toString();
    }
  }, [wishlistItems]);
  
  const handleUpdateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.product.id === itemId 
        ? { ...item, quantity: newQuantity } 
        : item
    ));
  };
  
  const handleRemoveItem = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.product.id !== itemId));
    toast({
      title: "Item removed",
      description: "Product has been removed from your cart",
    });
  };
  
  const handleAddToCart = (product: Product, quantity = 1, size = '8', color = product.colors[0]) => {
    // Check if product already in cart
    const existingItem = cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Increase quantity if product already in cart
      handleUpdateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      // Add new product to cart
      const newItem: CartItem = {
        product,
        quantity,
        size,
        color,
      };
      setCartItems([...cartItems, newItem]);
    }
    
    setIsCartOpen(true);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };
  
  const handleAddToWishlist = (product: Product) => {
    // Check if product already in wishlist
    const existingItem = wishlistItems.find(item => item.product.id === product.id);
    
    if (!existingItem) {
      setWishlistItems([...wishlistItems, { product }]);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist`,
      });
    } else {
      // Remove from wishlist if already there (toggle behavior)
      setWishlistItems(wishlistItems.filter(item => item.product.id !== product.id));
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist`,
      });
    }
  };
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Clear category selection when searching
    if (query) {
      setSelectedCategory("");
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    // Clear search query when selecting a category
    setSearchQuery("");
    
    // Scroll to featured products section
    const featuredProductsSection = document.querySelector('section.bg-gray-50');
    if (featuredProductsSection) {
      featuredProductsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isProductWishlisted = (productId: number) => {
    return wishlistItems.some(item => item.product.id === productId);
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderTrackingId.trim()) {
      toast({
        title: "Order ID required",
        description: "Please enter an order ID to track",
        variant: "destructive"
      });
      return;
    }
    
    navigate(`/order-tracking/${orderTrackingId.trim()}`);
  };

  return (
    <>
      <Navbar 
        onSearch={handleSearch}
        onCartClick={() => setIsCartOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />
      <main>
        <Hero />
        <CategoryBanner onCategorySelect={handleCategorySelect} />
        <FeaturedProducts 
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          onAddToCart={handleAddToCart}
          onAddToWishlist={handleAddToWishlist}
          isProductWishlisted={isProductWishlisted}
        />
        
        {/* Order Tracking Section */}
        <section className="bg-gray-50 py-12">
          <div className="container max-w-lg mx-auto px-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-center mb-4">
                <Package className="h-8 w-8 text-primary mr-3" />
                <h2 className="text-2xl font-bold">Track Your Order</h2>
              </div>
              <p className="text-center text-gray-600 mb-6">
                Enter your order number to check the current status of your package
              </p>
              <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Order ID (e.g., ORD-12345)"
                  value={orderTrackingId}
                  onChange={(e) => setOrderTrackingId(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  Track Order
                </Button>
              </form>
            </div>
          </div>
        </section>
        
        <Promotions />
        <Newsletter />
      </main>
      <Footer />
      <LiveChat />
      
      {/* ShoppingCart with trigger from Navbar */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <ShoppingCart 
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClose={() => setIsCartOpen(false)}
        />
      </Sheet>
      
      {/* Wishlist Modal */}
      <Sheet open={isWishlistOpen} onOpenChange={setIsWishlistOpen}>
        <WishlistModal 
          wishlistItems={wishlistItems}
          onClose={() => setIsWishlistOpen(false)}
          onRemoveFromWishlist={handleAddToWishlist}
          onAddToCart={handleAddToCart}
        />
      </Sheet>
    </>
  );
};

export default Index;
