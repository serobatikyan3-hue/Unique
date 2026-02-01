export interface TravelPackage {
  id: string;
  title: string; // Map to 'Header'
  location: string; // Map to 'Country'
  price: string;
  duration: string; // Map to 'Timing'
  imageUrl: string; // Map to 'Image'
  tags: string[]; // Map to 'Type'
  difficulty?: 'Relaxed' | 'Moderate' | 'Active';
  instagramUrl?: string; // New field for redirection
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  caption: string;
}