import React, { useState, useMemo, useEffect } from 'react';
import { TravelPackage } from '../types';
import { Clock, Sun, Star, ArrowRight, Instagram } from 'lucide-react';

// PASTE YOUR PUBLISHED GOOGLE SHEET CSV LINK HERE
// Instructions: File > Share > Publish to Web > Select "CSV" > Copy Link
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR02E5VrWtxQUhsRVmWf4g7OIeAVSS8v9AjCuhejnqvp21ozKsf_j4nqBVgqbSDWSYFLGDSQyWbuXDx/pub?output=csv"; 

// Generic fallback image (Neutral travel vibe) to use ONLY if the sheet image fails to load
const GENERIC_FALLBACK = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop";

const SAMPLE_PACKAGES: TravelPackage[] = [
  {
    id: '1',
    title: 'Maldives: Overwater Bliss',
    location: 'Maldives',
    price: '$2,400',
    duration: '7 Days',
    imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2667&auto=format&fit=crop',
    tags: ['Relaxation', 'Beach', 'Luxury'],
    difficulty: 'Relaxed',
    instagramUrl: 'https://www.instagram.com/uniqueroa_d/'
  },
  {
    id: '2',
    title: 'Pharaohs & Pyramids',
    location: 'Cairo, Egypt',
    price: '$850',
    duration: '6 Days',
    imageUrl: 'https://images.unsplash.com/photo-1539650116455-251d4a6978cf?q=80&w=2576&auto=format&fit=crop',
    tags: ['History', 'Adventure'],
    difficulty: 'Moderate',
    instagramUrl: 'https://www.instagram.com/uniqueroa_d/'
  },
  {
    id: '3',
    title: 'Santorini Sunset Dreams',
    location: 'Greece',
    price: '$1,800',
    duration: '5 Days',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=2929&auto=format&fit=crop',
    tags: ['Romantic', 'Relaxation', 'Europe'],
    difficulty: 'Relaxed',
    instagramUrl: 'https://www.instagram.com/uniqueroa_d/'
  }
];

const PackageGrid: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [packages, setPackages] = useState<TravelPackage[]>(SAMPLE_PACKAGES);

  // Fetch data from Google Sheet on mount
  useEffect(() => {
    if (!GOOGLE_SHEET_URL) return;

    const fetchSheetData = async () => {
      try {
        // Simplest possible fetch to avoid CORS/Network errors.
        // We do NOT append extra query parameters or headers, as these can trigger 
        // preflight checks that Google Sheets does not support.
        const response = await fetch(GOOGLE_SHEET_URL);
        
        if (!response.ok) {
            // Silently fall back to sample data if fetch fails
            console.warn(`Google Sheet fetch failed with status: ${response.status}`);
            return;
        }

        const text = await response.text();
        
        // Parse CSV
        // Assumes columns: Header, Country, Price, Timing, Image, Type, Instagram
        const rows = text.split('\n').slice(1); // Skip header row
        const newPackages: TravelPackage[] = rows.map((row, index) => {
          // Robust CSV splitting: Handles commas inside quotes (e.g., "Rome, Italy")
          // This regex splits by comma ONLY if that comma is not inside quotes
          const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(cell => {
             // Remove surrounding quotes if they exist
             let val = cell.trim();
             if (val.startsWith('"') && val.endsWith('"')) {
                 val = val.slice(1, -1);
             }
             return val.trim();
          });
          
          if (cols.length < 5) return null; // Skip empty rows

          const title = cols[0] || 'Unknown Package';
          const location = cols[1] || 'Global';
          
          // STRICTLY use the image from the sheet.
          // If empty, use the generic fallback to prevent layout collapse.
          let imageUrl = cols[4];
          if (!imageUrl) {
            imageUrl = GENERIC_FALLBACK;
          }

          return {
            id: `sheet-${index}`,
            title,
            location,
            price: cols[2] || 'Inquire',        // Price
            duration: cols[3] || 'Flexible',    // Timing
            imageUrl,            
            tags: cols[5] ? cols[5].split(',').map(t => t.trim()) : ['Adventure'], // Type
            instagramUrl: cols[6] || 'https://www.instagram.com/uniqueroa_d/' // Instagram Link
          };
        }).filter(Boolean) as TravelPackage[];

        if (newPackages.length > 0) {
          setPackages(newPackages);
        }
      } catch (error) {
        // Log error but do not crash app; UI remains on Sample Data
        console.error("Error fetching Google Sheet data. Using sample data.", error);
      }
    };

    fetchSheetData();
  }, []);

  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    tags.add('All');
    packages.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [packages]);

  const displayedPackages = useMemo(() => {
    if (filter === 'All') return packages;
    return packages.filter(p => p.tags.includes(filter));
  }, [filter, packages]);

  return (
    <section id="packages" className="py-24 px-4 max-w-7xl mx-auto bg-creme scroll-mt-28">
      <div className="text-center mb-16">
        <span className="text-sea uppercase tracking-widest text-xs font-bold bg-sea/10 px-3 py-1 rounded-full">
            Curated Collections
        </span>
        <h2 className="text-4xl md:text-5xl font-serif text-navy mt-4 mb-4">
          Trending <span className="italic text-sand/80 font-serif">Destinations</span>
        </h2>
        <p className="text-navy/60 max-w-2xl mx-auto">
            Handpicked itineraries to the world's most sought-after locations.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {uniqueTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-6 py-2 rounded-full text-sm transition-all duration-300 ${
                filter === tag 
                  ? 'bg-navy text-white shadow-lg' 
                  : 'bg-white text-navy/60 hover:bg-sand/30 hover:text-navy border border-sand/30'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPackages.map((pkg) => (
          <a 
            key={pkg.id} 
            href={pkg.instagramUrl || 'https://www.instagram.com/uniqueroa_d/'}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-sand/30 cursor-pointer"
          >
            {/* Image Container */}
            <div className="h-64 overflow-hidden relative">
              <img 
                src={pkg.imageUrl} 
                alt={pkg.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={(e) => {
                    // Only use fallback if the User's provided image fails to load entirely
                    // This prevents broken image icons if the URL from the sheet is bad
                    e.currentTarget.src = GENERIC_FALLBACK;
                }}
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-navy text-sm font-bold shadow-sm">
                {pkg.price}
              </div>
              
              {/* Overlay Instagram Icon on Hover */}
              <div className="absolute inset-0 bg-navy/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Instagram className="text-white drop-shadow-md" size={32} />
              </div>
            </div>

            {/* Content */}
            <div className="p-8 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-3">
                 <div className="text-xs text-sea uppercase tracking-wider font-bold mb-1 flex items-center gap-1">
                   <Star size={12} fill="currentColor" /> {pkg.location}
                 </div>
              </div>
             
              <h3 className="text-2xl font-serif text-navy mb-4 group-hover:text-sea transition-colors">{pkg.title}</h3>
              
              <div className="mt-auto pt-6 border-t border-sand/30 flex items-center justify-between text-navy/60 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  {pkg.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Sun size={16} />
                  {pkg.tags[0]}
                </div>
              </div>

              <div className="w-full mt-6 py-3 rounded-xl bg-sand/30 text-navy group-hover:bg-navy group-hover:text-white transition-all duration-300 font-bold text-sm tracking-wide flex items-center justify-center gap-2 group-hover:gap-3">
                View on Instagram <ArrowRight size={16} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PackageGrid;