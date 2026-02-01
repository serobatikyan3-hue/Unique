import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PackageGrid from './components/PackageGrid';
import Stats from './components/Stats';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

// Define the gallery images
const GALLERY_IMAGES = [
    // ROW 1
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=600&auto=format&fit=crop", // Rome (Colosseum)
    "https://images.unsplash.com/photo-1527668752968-14dc70a27c95?q=80&w=600&auto=format&fit=crop", // Pine tree framing the sea
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop", // Santorini/Sea Rocks Vibe
    "https://images.unsplash.com/photo-1468581264429-2548ef9eb732?q=80&w=600&auto=format&fit=crop", // Sand Texture

    // ROW 2 (Complimentary Aesthetic)
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=600&auto=format&fit=crop", // Cinque Terre / Rocks
    "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=600&auto=format&fit=crop", // Beach palms
    "https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=600&auto=format&fit=crop", // Blue water
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=600&auto=format&fit=crop", // Mountains/Travel
];

function App() {
  return (
    <div className="min-h-screen bg-creme text-navy font-sans selection:bg-sand selection:text-navy">
      <Navbar />
      
      <main>
        <Hero />
        <PackageGrid />
        
        {/* Aesthetic transition section */}
        <section className="bg-sand py-20 px-4 text-center">
            <h3 className="font-serif text-3xl md:text-4xl text-navy mb-6">"Create Your Own <span className="italic text-white">Path</span>."</h3>
            <div className="w-24 h-1 bg-white mx-auto rounded-full"></div>
        </section>

        <Stats />
        
        {/* Instagram / Social Proof Placeholder */}
        <section id="gallery" className="py-24 px-4 max-w-7xl mx-auto text-center bg-white scroll-mt-28">
            <h2 className="text-4xl font-serif text-navy mb-12">Unique <span className="text-sand italic">Moments</span></h2>
            
            {/* 
                Gallery Grid 
                - aspect-square (1:1): Classic Instagram tile shape.
                - gap-1: Tight spacing like a profile grid.
                - object-cover: Ensures images fill the square without distortion.
            */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                {GALLERY_IMAGES.map((src, index) => (
                    <div key={index} className="aspect-square overflow-hidden group relative">
                        <img 
                            src={src} 
                            alt={`Gallery ${index}`} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-navy/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                ))}
            </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;