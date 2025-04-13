
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const categories = [
    { name: 'Chuck Taylor', href: '#' },
    { name: 'Chuck 70', href: '#' },
    { name: 'One Star', href: '#' },
    { name: 'Run Star', href: '#' },
    { name: 'Jack Purcell', href: '#' },
    { name: 'Pro Leather', href: '#' },
  ];
  
  const collections = [
    { name: 'New Arrivals', href: '#' },
    { name: 'Bestsellers', href: '#' },
    { name: 'Collaborations', href: '#' },
    { name: 'Limited Editions', href: '#' },
    { name: 'Sale', href: '#' },
  ];
  
  const support = [
    { name: 'Contact Us', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'Size Guide', href: '#' },
    { name: 'Shipping & Returns', href: '#' },
    { name: 'Store Locator', href: '#' },
    { name: 'Warranty', href: '#' },
  ];
  
  const company = [
    { name: 'About Us', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Sustainability', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ];
  
  const socials = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];
  
  const contacts = [
    { icon: MapPin, content: 'Jl. MH. Thamrin No. 1, Jakarta 10310, Indonesia' },
    { icon: Phone, content: '+62 21 1234 5678' },
    { icon: Mail, content: 'customercare@converseindonesia.com' },
  ];
  
  return (
    <footer className="bg-gray-100">
      <div className="container py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand and contact column - takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold font-montserrat tracking-tighter">CONVERSE</span>
              <span className="text-xs ml-1 font-montserrat font-medium">INDONESIA</span>
            </div>
            
            <p className="text-gray-600 mb-6 max-w-md">
              Converse is committed to delivering iconic designs that celebrate 
              authenticity and self-expression. Our products are crafted with 
              quality materials and designed to last.
            </p>
            
            <div className="space-y-3 mb-6">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-start">
                  <contact.icon className="h-5 w-5 mr-3 mt-0.5 text-gray-500" />
                  <span className="text-gray-600">{contact.content}</span>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4">
              {socials.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Navigation columns */}
          <div>
            <h3 className="font-bold mb-4">Shoes</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <a
                    href={category.href}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Collections</h3>
            <ul className="space-y-2">
              {collections.map((collection) => (
                <li key={collection.name}>
                  <a
                    href={collection.href}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    {collection.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Help</h3>
            <ul className="space-y-2">
              {support.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-gray-600 hover:text-black transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} Converse. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {company.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-500 text-sm hover:text-black transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
