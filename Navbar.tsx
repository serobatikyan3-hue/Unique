import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-creme/90 backdrop-blur-md border-b border-sand/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Section - Text Only */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex flex-col justify-center">
                 <span className="font-serif text-xl tracking-[0.15em] text-navy leading-none font-bold">UNIQUE ROAD</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#packages" onClick={(e) => scrollToSection(e, 'packages')} className="text-navy/70 hover:text-sea transition-colors duration-300 px-3 py-2 text-sm font-medium tracking-wide">Destinations</a>
              <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="text-navy/70 hover:text-sea transition-colors duration-300 px-3 py-2 text-sm font-medium tracking-wide">Moments</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-navy text-white px-6 py-2 rounded-full hover:bg-sea transition-colors duration-300 text-sm font-medium">Contact Us</a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-navy hover:text-sea focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-creme border-b border-sand">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <a href="#packages" onClick={(e) => scrollToSection(e, 'packages')} className="text-navy hover:text-sea block px-3 py-2 rounded-md text-base font-medium">Destinations</a>
            <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="text-navy hover:text-sea block px-3 py-2 rounded-md text-base font-medium">Moments</a>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-navy hover:text-sea block px-3 py-2 rounded-md text-base font-medium">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;