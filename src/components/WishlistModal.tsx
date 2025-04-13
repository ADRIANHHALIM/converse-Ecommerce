
import React from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Product } from './ProductCard';

interface WishlistModalProps {
  wishlistItems: Array<{product: Product}>;
  onClose: () => void;
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const WishlistModal: React.FC<WishlistModalProps> = ({
  wishlistItems,
  onClose,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  return (
    <SheetContent className="sm:max-w-md w-full">
      <SheetHeader className="pb-4 border-b">
        <SheetTitle className="text-center text-xl">My Wishlist</SheetTitle>
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-6">
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <SheetClose asChild>
              <Button onClick={onClose}>Continue Shopping</Button>
            </SheetClose>
          </div>
        ) : (
          <ul className="space-y-6">
            {wishlistItems.map(({product}) => (
              <li key={product.id} className="flex gap-4 border-b pb-4">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <h3 className="text-sm font-medium">{product.name}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onRemoveFromWishlist(product)}
                      className="h-7 w-7 text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">{product.category}</p>

                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm font-medium">
                      {product.discountPrice ? (
                        <>
                          <span className="text-red-500">Rp {product.discountPrice.toLocaleString('id-ID')}</span>
                          <span className="ml-2 text-gray-400 line-through text-xs">Rp {product.price.toLocaleString('id-ID')}</span>
                        </>
                      ) : (
                        <span>Rp {product.price.toLocaleString('id-ID')}</span>
                      )}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onAddToCart(product)}
                      className="flex items-center gap-1"
                    >
                      <ShoppingCart className="h-3 w-3" />
                      <span className="text-xs">Add to Cart</span>
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </SheetContent>
  );
};

export default WishlistModal;
