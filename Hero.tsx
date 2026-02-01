import React from 'react';
import { Plane } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToPackages = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('packages');
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
    <div className="relative h-screen w-full overflow-hidden bg-creme">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop" 
          alt="Tropical Beach" 
          className="w-full h-full object-cover"
        />
        {/* Overlay - Lighter, beachy fade instead of dark */}
        <div className="absolute inset-0 bg-gradient-to-r from-creme/90 via-creme/30 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-creme via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 max-w-7xl mx-auto">
        <div className="max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sea text-xs font-bold uppercase tracking-widest mb-6 shadow-sm border border-sand">
                <Plane size={14} className="animate-pulse" /> World Class Travel
            </div>
            
            <h1 className="font-serif text-6xl md:text-8xl text-navy mb-8 leading-tight drop-shadow-sm">
            Escape the <br/> <span className="italic text-sea font-light">Ordinary</span>
            </h1>

            <p className="text-navy/70 text-lg md:text-xl max-w-lg mb-12 font-light leading-relaxed">
            Curated international getaways designed for the modern traveler. From the crystal waters of the Maldives to the historic streets of Rome.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <a 
                href="#packages"
                onClick={scrollToPackages}
                className="px-8 py-4 bg-white text-navy border border-sand rounded-full hover:bg-sand/20 transition-all duration-300 font-medium tracking-wide text-center cursor-pointer"
                >
                View Destinations
                </a>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;