
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from './ProductCard';
import { Button } from '@/components/ui/button';
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet';

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface ShoppingCartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: number, quantity: number) => void;
  onRemoveItem: (itemId: number) => void;
  onClose: () => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  onClose
}) => {
  const navigate = useNavigate();
  
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.product.discountPrice || item.product.price) * item.quantity, 
    0
  );
  
  const shipping = subtotal > 500000 ? 0 : 30000; // Free shipping over 500k
  const total = subtotal + shipping;
  
  const handleCheckout = () => {
    // Navigate to checkout page with cart items
    navigate('/checkout', { state: { cartItems } });
    onClose();
  };
  
  return (
    <SheetContent className="w-full sm:max-w-md flex flex-col">
      <SheetHeader>
        <SheetTitle>Your Cart ({cartItems.length})</SheetTitle>
      </SheetHeader>
      
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 py-16">
          <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
          <p className="text-gray-500 text-center mb-6">
            Looks like you haven't added any products to your cart yet.
          </p>
          <SheetClose asChild>
            <Button onClick={onClose}>Continue Shopping</Button>
          </SheetClose>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto py-4">
            {cartItems.map((item) => (
              <div 
                key={`${item.product.id}-${item.size}-${item.color}`} 
                className="flex border-b border-gray-200 pb-4 mb-4"
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                
                <div className="ml-4 flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium">{item.product.name}</h3>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} | Color: 
                        <span 
                          className="inline-block ml-1 h-3 w-3 rounded-full align-middle"
                          style={{ backgroundColor: item.color }}
                        />
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => onRemoveItem(item.product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-1 items-end justify-between mt-2">
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="text-right">
                      {item.product.discountPrice ? (
                        <>
                          <div className="text-converse-red">
                            Rp {(item.product.discountPrice * item.quantity).toLocaleString('id-ID')}
                          </div>
                          <div className="text-xs text-gray-500 line-through">
                            Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                          </div>
                        </>
                      ) : (
                        <div>
                          Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Shipping</span>
              <span>
                {shipping === 0 ? 'Free' : `Rp ${shipping.toLocaleString('id-ID')}`}
              </span>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>Rp {total.toLocaleString('id-ID')}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Taxes and shipping calculated at checkout
            </p>
          </div>
          
          <SheetFooter>
            <div className="w-full space-y-3">
              <Button className="w-full" onClick={handleCheckout}>
                Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <SheetClose asChild>
                <Button variant="outline" className="w-full" onClick={onClose}>
                  Continue Shopping
                </Button>
              </SheetClose>
            </div>
          </SheetFooter>
        </>
      )}
    </SheetContent>
  );
};

export default ShoppingCart;
