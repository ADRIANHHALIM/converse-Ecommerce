
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowLeft, CreditCard, Truck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Define checkout schema with validation
const checkoutSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(6, { message: "Phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  postalCode: z.string().min(3, { message: "Postal code is required" }),
  state: z.string().min(2, { message: "State/Province is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  paymentMethod: z.enum(["credit", "bank"]),
  cardNumber: z.string().optional(),
  cardExpiry: z.string().optional(),
  cardCVC: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Get cart items from location state or localStorage
  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
    } else {
      // If no items passed, redirect back to cart
      toast({
        title: "No items in cart",
        description: "Your cart is empty. Please add items to proceed to checkout.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [location.state, navigate, toast]);

  // Calculate order summary values
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.product.discountPrice || item.product.price) * item.quantity, 
    0
  );
  const shipping = subtotal > 500000 ? 0 : 30000; // Free shipping over 500k
  const total = subtotal + shipping;

  // Form setup with validation
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      state: "",
      country: "Indonesia",
      paymentMethod: "credit",
    },
  });

  // Handle form submission
  const onSubmit = (values: CheckoutFormValues) => {
    setLoading(true);
    
    // Simulate processing payment
    setTimeout(() => {
      setLoading(false);
      
      // Handle successful order
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your order. You will receive a confirmation email shortly."
      });
      
      // Clear cart and navigate to success page
      navigate('/order-success', { 
        state: { 
          orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          orderTotal: total,
          shippingAddress: `${values.address}, ${values.city}, ${values.postalCode}, ${values.state}, ${values.country}`,
        } 
      });
    }, 2000);
  };

  const nextStep = () => {
    if (step === 1) {
      const { firstName, lastName, email, phone, address, city, postalCode, state, country } = form.getValues();
      if (firstName && lastName && email && phone && address && city && postalCode && state && country) {
        setStep(2);
      } else {
        // Trigger validation
        form.trigger(["firstName", "lastName", "email", "phone", "address", "city", "postalCode", "state", "country"]);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate('/');
    }
  };

  return (
    <>
      <Navbar 
        onSearch={() => {}} 
        onCartClick={() => navigate('/')} 
        onWishlistClick={() => {}} 
      />
      
      <div className="container max-w-4xl py-8 px-4 md:px-0 min-h-[calc(100vh-200px)]">
        <Button 
          variant="ghost" 
          onClick={prevStep} 
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {step === 1 ? "Back to Shopping" : "Back to Shipping"}
        </Button>
        
        <h1 className="text-2xl font-bold mb-8 text-center">
          Checkout
        </h1>
        
        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center ${step === 1 ? 'text-primary' : 'text-gray-500'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${step === 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
              1
            </div>
            <span>Shipping</span>
          </div>
          <div className="h-px bg-gray-300 w-16 mx-4"></div>
          <div className={`flex items-center ${step === 2 ? 'text-primary' : 'text-gray-500'}`}>
            <div className={`rounded-full h-8 w-8 flex items-center justify-center mr-2 ${step === 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
              2
            </div>
            <span>Payment</span>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form Section */}
          <div className="flex-1">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {step === 1 && (
                  <>
                    <div className="p-6 border rounded-lg mb-6">
                      <div className="flex items-center mb-4">
                        <Truck className="h-5 w-5 mr-2 text-primary" />
                        <h2 className="text-lg font-semibold">Shipping Information</h2>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your@email.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="+1234567890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="Jakarta" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="postalCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Postal Code</FormLabel>
                              <FormControl>
                                <Input placeholder="12345" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State/Province</FormLabel>
                              <FormControl>
                                <Input placeholder="Jakarta" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input placeholder="Indonesia" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="button" onClick={nextStep}>
                        Continue to Payment
                      </Button>
                    </div>
                  </>
                )}
                
                {step === 2 && (
                  <>
                    <div className="p-6 border rounded-lg mb-6">
                      <div className="flex items-center mb-4">
                        <CreditCard className="h-5 w-5 mr-2 text-primary" />
                        <h2 className="text-lg font-semibold">Payment Method</h2>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="credit"
                            value="credit"
                            checked={form.getValues("paymentMethod") === "credit"}
                            onChange={() => form.setValue("paymentMethod", "credit")}
                            className="h-4 w-4 text-primary"
                          />
                          <label htmlFor="credit" className="text-sm font-medium">
                            Credit / Debit Card
                          </label>
                        </div>
                        
                        {form.getValues("paymentMethod") === "credit" && (
                          <div className="ml-6 space-y-4">
                            <FormField
                              control={form.control}
                              name="cardNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Card Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="1234 5678 9012 3456" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={form.control}
                                name="cardExpiry"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Expiry Date</FormLabel>
                                    <FormControl>
                                      <Input placeholder="MM/YY" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={form.control}
                                name="cardCVC"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>CVC</FormLabel>
                                    <FormControl>
                                      <Input placeholder="123" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-2 mt-4">
                          <input
                            type="radio"
                            id="bank"
                            value="bank"
                            checked={form.getValues("paymentMethod") === "bank"}
                            onChange={() => form.setValue("paymentMethod", "bank")}
                            className="h-4 w-4 text-primary"
                          />
                          <label htmlFor="bank" className="text-sm font-medium">
                            Bank Transfer
                          </label>
                        </div>
                        
                        {form.getValues("paymentMethod") === "bank" && (
                          <div className="ml-6 p-4 bg-gray-50 rounded-md">
                            <p className="text-sm">
                              Please transfer the total amount to the following bank account:
                            </p>
                            <div className="mt-2 text-sm">
                              <p><strong>Bank:</strong> Bank Central Asia (BCA)</p>
                              <p><strong>Account Number:</strong> 1234567890</p>
                              <p><strong>Account Name:</strong> Converse Indonesia</p>
                            </div>
                            <p className="text-sm mt-2">
                              After making the transfer, we will verify your payment and process your order.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Place Order"}
                      </Button>
                    </div>
                  </>
                )}
              </form>
            </Form>
          </div>
          
          {/* Order Summary */}
          <div className="w-full lg:w-[380px]">
            <div className="border rounded-lg p-6 sticky top-6">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium line-clamp-1">{item.product.name}</h4>
                      <p className="text-xs text-gray-500">Size: {item.size} | Qty: {item.quantity}</p>
                      <div className="text-sm mt-1">
                        {item.product.discountPrice ? (
                          <>
                            <span className="text-red-500">
                              Rp {(item.product.discountPrice * item.quantity).toLocaleString('id-ID')}
                            </span>
                            <span className="text-xs text-gray-500 line-through ml-2">
                              Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                            </span>
                          </>
                        ) : (
                          <span>
                            Rp {(item.product.price * item.quantity).toLocaleString('id-ID')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? 'Free' : `Rp ${shipping.toLocaleString('id-ID')}`}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total</span>
                  <span>Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Checkout;
