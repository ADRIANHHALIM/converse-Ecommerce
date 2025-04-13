
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Promotions = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Promotional Banner 1 */}
          <div className="relative h-96 overflow-hidden rounded-lg group">
            <img 
              src="https://source.unsplash.com/random/800x600/?converse,urban"
              alt="Urban Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
              <span className="text-white text-xs font-medium uppercase tracking-wide mb-2">New Collection</span>
              <h3 className="text-white text-3xl font-bold mb-4">Urban Explorer</h3>
              <p className="text-gray-200 mb-6 max-w-md">
                Discover styles designed for the urban landscape. Durable, comfortable, and effortlessly cool.
              </p>
              <Button
                variant="outline"
                className="group/button backdrop-blur-md bg-white/10 border-white/30 text-white relative overflow-hidden px-6 py-2 rounded-xl transition-all duration-300 hover:bg-white/20 hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center">
                  Shop Collection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>
          
          {/* Promotional Banner 2 */}
          <div className="relative h-96 overflow-hidden rounded-lg group">
            <img 
              src="https://source.unsplash.com/random/800x600/?converse,limited"
              alt="Limited Edition"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
              <span className="bg-converse-red text-white text-xs font-medium uppercase tracking-wide px-2 py-1 rounded mb-2 w-fit">Limited Edition</span>
              <h3 className="text-white text-3xl font-bold mb-4">Artist Series</h3>
              <p className="text-gray-200 mb-6 max-w-md">
                Exclusive designs from our collaboration with leading Indonesian artists. Limited stocks available.
              </p>
              <Button
                variant="outline"
                className="group/button backdrop-blur-md bg-white/10 border-white/30 text-white relative overflow-hidden px-6 py-2 rounded-xl transition-all duration-300 hover:bg-white/20 hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center">
                  Explore Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Promotions;
