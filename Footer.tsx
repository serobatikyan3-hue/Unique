import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-navy text-creme pt-24 pb-10 border-t border-white/5 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand */}
        <div className="col-span-1">
          <div className="flex items-center gap-4 mb-8">
            <div>
               <span className="font-serif text-xl tracking-widest text-white block font-bold">UNIQUE ROAD</span>
               <span className="text-[10px] tracking-[0.2em] text-sand uppercase opacity-80">Travel Agency</span>
            </div>
          </div>
          <p className="text-sand/70 text-sm leading-relaxed mb-6">
            Your gateway to the world's most breathtaking destinations. We turn your travel dreams into curated realities.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-sand text-xs font-bold uppercase tracking-widest mb-6">Get in Touch</h4>
          <ul className="space-y-4 text-sm text-creme/60">
            <li className="flex items-center gap-3"><Phone size={16} className="text-sand"/> +374 99 03 13 83</li>
            <li className="flex items-center gap-3"><Mail size={16} className="text-sand"/> info@uniqueroad.am</li>
            <li className="flex items-center gap-3"><MapPin size={16} className="text-sand"/> Yerevan, Armenia</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="text-sand text-xs font-bold uppercase tracking-widest mb-6">Join the Community</h4>
          <div className="flex gap-4">
             <a href="https://www.instagram.com/uniqueroa_d/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sand hover:text-navy transition-all">
               <Instagram size={18} />
             </a>
             <a href="https://www.facebook.com/p/Unique-Road-100063663420510/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-sand hover:text-navy transition-all">
               <Facebook size={18} />
             </a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 text-center text-xs text-creme/40 flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© {new Date().getFullYear()} Unique Road Travel Agency. All rights reserved.</span>
        <div className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;