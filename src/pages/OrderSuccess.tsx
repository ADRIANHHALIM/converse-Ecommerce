
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get order details from location state or use sample data
  const orderDetails = location.state || {
    orderId: 'ORD-67890', // Default order ID that exists in our sample data
    orderTotal: 999000,
    shippingAddress: 'Jalan Sudirman No. 123, Jakarta 10220, Indonesia'
  };
  
  const { orderId, orderTotal, shippingAddress } = orderDetails;
  
  const handleTrackOrder = () => {
    navigate(`/order-tracking/${orderId}`);
  };

  return (
    <>
      <Navbar 
        onSearch={() => {}} 
        onCartClick={() => {}} 
        onWishlistClick={() => {}} 
      />
      
      <div className="container max-w-2xl py-16 px-4 text-center min-h-[calc(100vh-200px)]">
        <div className="flex flex-col items-center justify-center">
          <div className="h-24 w-24 rounded-full bg-green-50 flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been received.
          </p>
          
          <div className="w-full bg-gray-50 rounded-lg p-6 mb-8">
            <div className="space-y-4">
              <div className="flex justify-between pb-3 border-b">
                <span className="text-gray-500">Order Number</span>
                <span className="font-medium">{orderId}</span>
              </div>
              
              <div className="flex justify-between pb-3 border-b">
                <span className="text-gray-500">Total Amount</span>
                <span className="font-medium">Rp {orderTotal.toLocaleString('id-ID')}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping Address</span>
                <span className="font-medium text-right">{shippingAddress}</span>
              </div>
            </div>
          </div>
          
          <p className="mb-8 text-gray-600">
            We've sent a confirmation email with all the details of your order.
            You will receive another email when your order ships.
          </p>
          
          <div className="space-x-4">
            <Button variant="outline" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
            <Button onClick={handleTrackOrder}>
              <Package className="mr-2 h-4 w-4" /> Track Order
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default OrderSuccess;
