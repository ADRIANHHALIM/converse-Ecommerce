
import React, { useState } from 'react';
import { 
  Plus, Minus, Heart, X, RotateCw, ArrowRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product } from './ProductCard';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedColor: string, selectedSize: string) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted?: boolean;
}

const sizes = ['5', '6', '7', '8', '9', '10', '11', '12'];

const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onAddToWishlist,
  isWishlisted = false,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImage, setActiveImage] = useState(0);
  const [is360Active, setIs360Active] = useState(false);
  
  // Simulated 360 view images (in a real implementation, we would have multiple images)
  const images = [
    product.imageUrl,
    'https://source.unsplash.com/random/600x600/?converse,side',
    'https://source.unsplash.com/random/600x600/?converse,back',
    'https://source.unsplash.com/random/600x600/?converse,top',
  ];
  
  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, quantity + value);
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    onAddToCart(product, quantity, selectedColor, selectedSize);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0">
        <DialogTitle className="sr-only">Product Details</DialogTitle>
        <DialogDescription className="sr-only">
          View details and options for {product.name}
        </DialogDescription>
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product images section */}
          <div className="bg-gray-100 p-4 relative">
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded-full"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="aspect-square overflow-hidden relative">
              <img 
                src={images[activeImage]} 
                alt={product.name}
                className={cn(
                  "h-full w-full object-cover",
                  is360Active && "animate-rotate-360"
                )}
              />
              
              <Button
                variant="outline"
                size="sm"
                className="absolute bottom-4 right-4 bg-white/80 hover:bg-white"
                onClick={() => setIs360Active(!is360Active)}
              >
                <RotateCw className="mr-2 h-4 w-4" />
                {is360Active ? 'Stop Rotation' : '360° View'}
              </Button>
            </div>
            
            <div className="flex mt-4 gap-2">
              {images.map((image, index) => (
                <div 
                  key={index}
                  className={cn(
                    "h-16 w-16 cursor-pointer border-2",
                    activeImage === index ? "border-black" : "border-transparent"
                  )}
                  onClick={() => {
                    setActiveImage(index);
                    setIs360Active(false);
                  }}
                >
                  <img 
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product info section */}
          <div className="p-6">
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-1">{product.category}</div>
              <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
              <div className="flex items-center space-x-2">
                {product.discountPrice ? (
                  <>
                    <span className="text-xl font-bold text-red-500">
                      Rp {product.discountPrice.toLocaleString('id-ID')}
                    </span>
                    <span className="text-gray-500 line-through">
                      Rp {product.price.toLocaleString('id-ID')}
                    </span>
                  </>
                ) : (
                  <span className="text-xl font-bold">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                )}
              </div>
            </div>
            
            <Tabs defaultValue="description" className="mb-6">
              <TabsList>
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details & Care</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="py-4 text-gray-700">
                <p>
                  The {product.name} features a premium canvas upper, iconic rubber toe cap, 
                  and timeless silhouette that has become a symbol of self-expression across 
                  generations. With enhanced cushioning for all-day comfort and durability, 
                  this classic design offers versatile style that goes with everything in your wardrobe.
                </p>
              </TabsContent>
              <TabsContent value="details" className="py-4">
                <ul className="space-y-2 text-gray-700">
                  <li>• High-top sneaker with premium canvas upper</li>
                  <li>• OrthoLite cushioning for all-day comfort</li>
                  <li>• Classic rubber toe cap and striping</li>
                  <li>• Medial eyelets enhance airflow</li>
                  <li>• Diamond pattern outsole for traction</li>
                  <li>• Materials: Canvas upper, rubber outsole</li>
                </ul>
              </TabsContent>
            </Tabs>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-8 w-8 rounded-full cursor-pointer border-2",
                      selectedColor === color ? "border-black" : "border-transparent",
                      color === 'white' && "border-gray-300"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Size</h3>
              <div className="grid grid-cols-4 gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    className={cn(
                      "h-12",
                      selectedSize === size ? "border-black bg-black text-white" : "border-gray-300"
                    )}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
              <a href="#" className="text-sm text-gray-600 mt-2 inline-block">
                Size Guide
              </a>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-fit">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-12 text-center">{quantity}</div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                className="flex-1"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={() => onAddToWishlist(product)}
              >
                <Heart className={cn(
                  "h-5 w-5", 
                  isWishlisted && "fill-red-500 text-red-500"
                )} />
              </Button>
              <Button variant="secondary" className="flex items-center gap-1">
                Buy Now <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
