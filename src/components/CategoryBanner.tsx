
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  {
    name: 'Chuck Taylor',
    description: 'The iconic original that started it all',
    imageUrl: 'https://source.unsplash.com/random/600x800/?converse,chuck,taylor',
    link: '#',
    categoryId: 'Chuck Taylor'
  },
  {
    name: 'Run Star Hike',
    description: 'Bold platforms for a powerful stance',
    imageUrl: 'https://source.unsplash.com/random/600x800/?converse,platform',
    link: '#',
    categoryId: 'Run Star'
  },
  {
    name: 'One Star',
    description: 'The classic and versatile everyday style',
    imageUrl: 'https://source.unsplash.com/random/600x800/?converse,star,shoes',
    link: '#',
    categoryId: 'One Star'
  },
];

interface CategoryBannerProps {
  onCategorySelect?: (category: string) => void;
}

const CategoryBanner: React.FC<CategoryBannerProps> = ({ onCategorySelect }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12 text-center">Shop by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div 
              key={category.name} 
              className="group relative h-96 overflow-hidden rounded-lg"
            >
              <img 
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-200 mb-4">{category.description}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryBanner;
