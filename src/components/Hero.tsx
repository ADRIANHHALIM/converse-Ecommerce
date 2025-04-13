import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative h-[80vh] min-h-[600px] bg-black overflow-hidden">
      {/* Background video (will use image as fallback) */}
      <div className="absolute inset-0 z-0">
        {/* For a real project we'd use a video but using image for now */}
        <div className="relative h-full w-full">
          {/* Placeholder image while video loads */}
          {!isVideoLoaded && (
            <img 
              src="/placeholder-hero.jpg" // Add your placeholder image
              alt="Converse hero placeholder"
              className="absolute w-[100vw] h-[100vh] object-cover"
            />
          )}
          
          <iframe
            src="https://www.youtube.com/embed/5SjN4_2AfIE?autoplay=1&mute=1&controls=0&loop=1&playlist=5SjN4_2AfIE&showinfo=0&rel=0&enablejsapi=1&modestbranding=1&playsinline=1&vq=hd1080&hd=1"
            title="Converse hero video"
            className={`absolute w-[100vw] h-[100vh] object-cover transition-opacity duration-500 ${
              isVideoLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            frameBorder="0"
            style={{
              border: 'none',
              pointerEvents: 'none',
              transform: 'scale(1.5)',
              transformOrigin: 'center center',
            }}
            onLoad={() => setIsVideoLoaded(true)}
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 h-full flex flex-col justify-center items-start text-white">
        <span className="inline-block px-3 py-1 text-xs font-medium uppercase bg-converse-red rounded mb-4 animate-fade-up">Limited edition</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 max-w-3xl leading-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
          UNLEASH YOUR<br />
          <span className="text-converse-red">BOLD</span> SIDE
        </h1>
        
        <p className="text-lg md:text-xl max-w-xl mb-8 text-gray-200 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          Discover the new Chuck 70 collection. Made for those who dare to stand out and express their unique style.
        </p>
        
        <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Button
            variant="outline"
            className="group/button backdrop-blur-md bg-white/10 border-white/30 text-white relative overflow-hidden px-6 py-2 rounded-xl transition-all duration-300 hover:bg-white/20 hover:shadow-xl"
            onClick={() => window.location.href = '/shop'}
                          >
            <span className="relative z-10 flex items-center">
              Shop Collection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
            </span>
          </Button>
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
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
        <span className="text-white text-xs mb-1 opacity-80">Scroll</span>
        <div className="h-8 w-px bg-white/50"></div>
      </div>
    </section>
  );
};

export default Hero;
