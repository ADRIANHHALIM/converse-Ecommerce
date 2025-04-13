import React, { useState } from 'react';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  colors: string[];
}

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  isWishlisted?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onAddToWishlist,
  isWishlisted = false,
}) => {
  const [currentImage, setCurrentImage] = useState(product.imageUrl);
  
  return (
    <div className="product-card group">
      {/* Product image */}
      <div className="relative overflow-hidden">
        <img 
          src={currentImage} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Status badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-black text-white">NEW</Badge>
          )}
          {product.isSale && (
            <Badge className="bg-converse-red text-white">SALE</Badge>
          )}
        </div>
        
        {/* Wishlist button - Always visible */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 bg-white bg-opacity-80 hover:bg-white rounded-full shadow-sm"
          onClick={() => onAddToWishlist(product)}
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-red-500 text-red-500")} />
        </Button>
        
        {/* Quick actions - Always visible with semi-transparent background */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="flex justify-between gap-2 p-2 bg-black/80">
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 border-white text-white bg-transparent hover:bg-white hover:text-black transition-colors"
              onClick={() => onQuickView(product)}
            >
              <Eye className="mr-1 h-4 w-4" /> Quick View
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 border-white text-white bg-transparent hover:bg-white hover:text-black transition-colors"
              onClick={() => onAddToCart(product)}
            >
              <ShoppingCart className="mr-1 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{product.name}</h3>
          <div className="flex space-x-1 mt-1">
            {product.discountPrice ? (
              <>
                <span className="text-red-500 font-medium">
                  Rp {product.discountPrice.toLocaleString('id-ID')}
                </span>
                <span className="text-gray-500 line-through text-sm">
                  Rp {product.price.toLocaleString('id-ID')}
                </span>
              </>
            ) : (
              <span className="font-medium">
                Rp {product.price.toLocaleString('id-ID')}
              </span>
            )}
          </div>
        </div>
        <div className="text-sm text-gray-600 mt-1">{product.category}</div>
        
        {/* Color options */}
        <div className="flex mt-3 space-x-1">
          {product.colors.map((color, index) => (
            <div
              key={index}
              className={cn(
                "h-4 w-4 rounded-full border cursor-pointer hover:scale-110 transition-transform",
                color === 'white' ? 'border-gray-300' : 'border-transparent'
              )}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
