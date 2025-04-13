
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Truck, MapPin, Check, Clock, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Mock data - in a real app, this would come from an API
const MOCK_ORDERS = {
  'ORD-12345': {
    id: 'ORD-12345',
    status: 'shipping',  // 'processing', 'shipping', 'delivered'
    orderDate: '2025-04-10',
    estimatedDelivery: '2025-04-15',
    currentLocation: 'Jakarta Distribution Center',
    progressPercentage: 65,
    items: [
      { name: 'Running Shoes', quantity: 1, price: 1200000 },
      { name: 'Sport Socks', quantity: 2, price: 150000 }
    ],
    trackingEvents: [
      { date: '2025-04-10 09:15', status: 'Order placed', completed: true },
      { date: '2025-04-10 14:30', status: 'Order processed and packed', completed: true },
      { date: '2025-04-11 08:45', status: 'Shipped from warehouse', completed: true },
      { date: '2025-04-12 10:20', status: 'In transit', completed: false },
      { date: '2025-04-15', status: 'Delivered', completed: false }
    ]
  },
  'ORD-67890': {
    id: 'ORD-67890',
    status: 'processing',
    orderDate: '2025-04-12',
    estimatedDelivery: '2025-04-17',
    currentLocation: 'Central Warehouse',
    progressPercentage: 25,
    items: [
      { name: 'Chuck 70 High Top', quantity: 1, price: 999000 },
    ],
    trackingEvents: [
      { date: '2025-04-12 10:35', status: 'Order placed', completed: true },
      { date: '2025-04-12 14:20', status: 'Order confirmed', completed: true },
      { date: '2025-04-12 16:45', status: 'Processing order', completed: false },
      { date: '2025-04-14', status: 'Shipping', completed: false },
      { date: '2025-04-17', status: 'Delivered', completed: false }
    ]
  },
  'ORD-24680': {
    id: 'ORD-24680',
    status: 'delivered',
    orderDate: '2025-04-05',
    estimatedDelivery: '2025-04-10',
    currentLocation: 'Delivered',
    progressPercentage: 100,
    items: [
      { name: 'One Star Pro Suede', quantity: 1, price: 1299000 },
      { name: 'Basic T-Shirt', quantity: 2, price: 399000 }
    ],
    trackingEvents: [
      { date: '2025-04-05 08:20', status: 'Order placed', completed: true },
      { date: '2025-04-05 13:15', status: 'Order processed and packed', completed: true },
      { date: '2025-04-06 09:30', status: 'Shipped from warehouse', completed: true },
      { date: '2025-04-08 11:45', status: 'In transit', completed: true },
      { date: '2025-04-10 14:20', status: 'Delivered', completed: true }
    ]
  }
};

// Status icon mapping
const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'processing':
      return <Package className="h-6 w-6 text-amber-500" />;
    case 'shipping':
      return <Truck className="h-6 w-6 text-blue-500" />;
    case 'delivered':
      return <Check className="h-6 w-6 text-green-500" />;
    default:
      return <Clock className="h-6 w-6 text-gray-500" />;
  }
};

const OrderTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [searchOrderId, setSearchOrderId] = useState("");
  const { toast } = useToast();
  
  // Get order data - in a real app, this would be fetched from an API
  const order = orderId ? MOCK_ORDERS[orderId] : null;
  
  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchOrderId.trim()) {
      toast({
        title: "Order ID required",
        description: "Please enter an order ID to track",
        variant: "destructive"
      });
      return;
    }
    
    navigate(`/order-tracking/${searchOrderId.trim()}`);
  };
  
  if (!order) {
    return (
      <>
        <Navbar 
          onSearch={() => {}} 
          onCartClick={() => {}} 
          onWishlistClick={() => {}} 
        />
        <div className="container py-16 px-4 min-h-[calc(100vh-200px)]">
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Order not found</h2>
            <p className="mb-8 text-gray-600">We couldn't find the order you're looking for. Please check your order ID and try again.</p>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Track Another Order</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="text"
                    placeholder="Order ID (e.g., ORD-12345)"
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit">
                    Track Order
                  </Button>
                </form>
                <div className="mt-6 text-sm text-gray-500">
                  <p>Try one of these sample order IDs:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>ORD-12345 - In transit</li>
                    <li>ORD-67890 - Processing</li>
                    <li>ORD-24680 - Delivered</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Button onClick={() => navigate('/')}>Return to Home</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar 
        onSearch={() => {}} 
        onCartClick={() => {}} 
        onWishlistClick={() => {}} 
      />
      
      <div className="container py-12 px-4 min-h-[calc(100vh-200px)]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Order Tracking</h1>
          
          {/* Search Another Order */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  placeholder="Track another order"
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit">
                  Track Order
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Order Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div>
                  Order #{order.id}
                  <span className="ml-4 text-sm font-normal text-gray-500">
                    Ordered on {order.orderDate}
                  </span>
                </div>
                <StatusIcon status={order.status} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium">
                    {order.status === 'processing' && 'Processing order'}
                    {order.status === 'shipping' && 'In transit'}
                    {order.status === 'delivered' && 'Delivered'}
                  </div>
                  <div className="text-sm text-gray-500">
                    <Clock className="inline mr-1 h-4 w-4" />
                    {order.status !== 'delivered' ? 
                      `Estimated delivery: ${order.estimatedDelivery}` : 
                      `Delivered on ${order.estimatedDelivery}`}
                  </div>
                </div>
                
                <Progress value={order.progressPercentage} className="h-2" />
                
                {order.status === 'shipping' && (
                  <div className="mt-2 text-sm text-gray-600">
                    <MapPin className="inline mr-1 h-4 w-4" />
                    Currently at: {order.currentLocation}
                  </div>
                )}
              </div>
              
              {/* Tracking Timeline */}
              <div className="space-y-6">
                <h3 className="font-medium">Tracking Updates</h3>
                <div className="space-y-4">
                  {order.trackingEvents.map((event, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 relative">
                        <div className={`w-4 h-4 rounded-full ${
                          event.completed ? 'bg-primary' : 'bg-gray-200'
                        } flex items-center justify-center`}>
                          {event.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        {index < order.trackingEvents.length - 1 && (
                          <div className={`w-0.5 h-full absolute left-2 ml-[-1px] top-4 ${
                            event.completed && order.trackingEvents[index + 1].completed 
                              ? 'bg-primary' 
                              : 'bg-gray-200'
                          }`}></div>
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <p className={`font-medium ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                          {event.status}
                        </p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Order Items */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="font-medium">
                      Rp {item.price.toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t mt-4 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">
                    Rp {order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Actions */}
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate('/')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default OrderTracking;
