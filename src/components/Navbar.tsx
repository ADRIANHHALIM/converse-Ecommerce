
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, ShoppingCart, Heart, User, Menu, X, ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const categories = [
  { name: 'Chuck Taylor', href: '#' },
  { name: 'Run Star Hike', href: '#' },
  { name: 'One Star', href: '#' },
  { name: 'Jack Purcell', href: '#' },
  { name: 'Apparel', href: '#' },
  { name: 'Accessories', href: '#' },
];

const collections = [
  { name: 'New Arrivals', href: '#' },
  { name: 'Limited Edition', href: '#' },
  { name: 'Collaborations', href: '#' },
  { name: 'Sale', href: '#', className: 'text-converse-red font-bold' },
];

interface NavbarProps {
  onSearch: (query: string) => void;
  onCartClick: () => void;
  onWishlistClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onCartClick, onWishlistClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const { toast } = useToast();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      toast({
        title: "Searching",
        description: `Showing results for "${searchQuery.trim()}"`,
      });
      setIsSearchOpen(false);
    }
  };

  const handleCategorySelect = (category: string, href: string) => {
    // Handle category selection
    console.log(`Selected category: ${category}`);
    // You can add additional logic here
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar - Free shipping promo */}
      <div className="bg-black text-white text-xs sm:text-sm py-2 text-center">
        FREE SHIPPING ON ALL ORDERS OVER Rp 500.000
      </div>
      
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold font-montserrat tracking-tighter">CONVERSE</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Shoes</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      {categories.map((category) => (
                        <li key={category.name} className="row-span-1">
                          <NavigationMenuLink asChild>
                            <a
                              href={category.href}
                              onClick={() => handleCategorySelect(category.name, category.href)}
                              className="block p-2 hover:bg-accent rounded-md"
                            >
                              {category.name}
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Collections</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-3 p-4">
                      {collections.map((collection) => (
                        <li key={collection.name} className="row-span-1">
                          <NavigationMenuLink asChild>
                            <a
                              href={collection.href}
                              className={cn("block p-2 hover:bg-accent rounded-md", collection.className)}
                            >
                              {collection.name}
                            </a>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <a href="#" className="font-medium px-3 py-2">About Us</a>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </nav>
          
          {/* Right side icons */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Search */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="absolute right-0 top-full mt-2 w-80">
                  <form onSubmit={handleSearch} className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      variant="ghost"
                      className="absolute right-8 top-0 text-gray-500"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() => setIsSearchOpen(false)}
                      className="absolute right-0 top-0 text-gray-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              ) : (
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </div>
            
            {/* User */}
            <Button size="icon" variant="ghost">
              <User className="h-5 w-5" />
            </Button>
            
            {/* Wishlist */}
            <Button 
              size="icon" 
              variant="ghost" 
              className="relative"
              onClick={onWishlistClick}
            >
              <Heart className="h-5 w-5" />
              <span className="wishlist-badge absolute -top-1 -right-1 bg-converse-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            </Button>
            
            {/* Cart */}
            <Button 
              size="icon" 
              variant="ghost" 
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="cart-badge absolute -top-1 -right-1 bg-converse-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItemsCount}
              </span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container py-4 space-y-4">
            <div className="font-medium">Shoes</div>
            <ul className="pl-4 space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <a 
                    href={category.href}
                    onClick={() => handleCategorySelect(category.name, category.href)}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="font-medium">Collections</div>
            <ul className="pl-4 space-y-2">
              {collections.map((collection) => (
                <li key={collection.name}>
                  <a 
                    href={collection.href}
                    className={collection.className}
                  >
                    {collection.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <div>
              <a href="#" className="font-medium">About Us</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
