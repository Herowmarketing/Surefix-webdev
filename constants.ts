/*
 * SURE-FIX REMODELING — Site Constants
 * Real business info from Google Business Profile
 */
import { SITE_IMAGES } from './lib/site-images';

export const BUSINESS = {
  name: 'Sure-Fix Remodeling',
  phone: '(610) 392-0990',
  phoneHref: 'tel:6103920990',
  email: 'info@surefixremodeling.net',
  address: '2015 Freemansburg Ave, Easton, PA 18042',
  addressShort: 'Easton, PA 18042',
  city: 'Easton, PA',
  serviceArea: 'Lehigh Valley, PA & Western NJ',
  hours: {
    weekdays: 'Mon–Fri: 8:00 AM – 7:00 PM',
    saturday: 'Saturday: 8:00 AM – 4:00 PM',
    sunday: 'Sunday: Closed',
  },
  social: {
    facebook: 'https://www.facebook.com/surefixremodeling',
    instagram: 'https://www.instagram.com/surefixremodeling',
    tiktok: 'https://www.tiktok.com/@surefixremodeling',
    google: 'https://g.page/r/surefixremodeling/review',
  },
  reviews: {
    google: { rating: 4.5, count: 91 },
    angiesList: { rating: 4.9, count: 320 },
    houzz: { rating: 4.6, count: 23 },
    facebook: { rating: 4.8, count: 21 },
  },
  yearsExperience: 25,
  projectsCompleted: 500,
  owner: 'Henry Rouhana',
};

export const LOGO_URL = '/manus-storage/SureFixLogoFullColor_3a5202af.svg';
export const LOGO_HORIZONTAL_URL = '/manus-storage/SureFixLogoFullColor_e8812903.svg';
export const MASCOT_URL = '/manus-storage/sticker_v5_final_7556bcfe.webp';
/** Fallback brand marks (no separate icon assets in repo) */
export const BLUE_ICON_URL = LOGO_URL;
export const RED_ICON_URL = LOGO_HORIZONTAL_URL;

export const COLORS = {
  blue: '#394696',
  red: '#983631',
  navy: '#0d1117',
  navyLight: '#111827',
};

export const SERVICES = [
  {
    id: 'kitchen',
    title: 'Kitchen Remodeling',
    slug: '/services/kitchen',
    icon: '🍳',
    tagline: 'Transform your kitchen into the heart of your home.',
    description: 'Custom cabinetry, countertops, islands, and full kitchen transformations designed around how you live.',
    image: SITE_IMAGES.kitchen,
    features: ['Custom Cabinetry', 'Countertop Installation', 'Kitchen Islands', 'Backsplash Tile', 'Appliance Integration', 'Lighting Design'],
  },
  {
    id: 'bathroom',
    title: 'Bathroom Remodeling',
    slug: '/services/bathroom',
    icon: '🚿',
    tagline: 'Spa-quality bathrooms crafted for everyday luxury.',
    description: 'Walk-in showers, soaking tubs, custom vanities, and tile work that elevates your daily routine.',
    image: SITE_IMAGES.bathroom,
    features: ['Walk-In Showers', 'Soaking Tubs', 'Custom Vanities', 'Tile & Flooring', 'Plumbing Fixtures', 'Heated Floors'],
  },
  {
    id: 'basement',
    title: 'Basement Finishing',
    slug: '/services/basement',
    icon: '🏠',
    tagline: 'Unlock the full potential of your home.',
    description: 'Turn your unfinished basement into a living room, home theater, gym, or in-law suite.',
    image: SITE_IMAGES.basement,
    features: ['Full Finishing', 'Home Theater', 'Home Gym', 'In-Law Suite', 'Wet Bar', 'Egress Windows'],
  },
  {
    id: 'exterior',
    title: 'Exterior Remodeling',
    slug: '/services/exterior',
    icon: '🏡',
    tagline: 'Stunning curb appeal, built to last.',
    description: 'Roofing, siding, windows, doors, decks, gazebos, and hardscaping — complete exterior transformations.',
    image: SITE_IMAGES.exterior,
    features: ['Roofing', 'Siding', 'Windows & Doors', 'Decks & Patios', 'Gazebos & Pavilions', 'Hardscaping'],
  },
  {
    id: 'flooring',
    title: 'Flooring',
    slug: '/services/flooring',
    icon: '🪵',
    tagline: 'The foundation of every beautiful room.',
    description: 'Hardwood, luxury vinyl plank, tile, and carpet installation throughout your entire home.',
    image: SITE_IMAGES.flooring,
    features: ['Hardwood', 'Luxury Vinyl Plank', 'Ceramic & Porcelain Tile', 'Carpet', 'Laminate', 'Subfloor Repair'],
  },
  {
    id: 'additions',
    title: 'Home Additions',
    slug: '/services/additions',
    icon: '🏗️',
    tagline: 'More space. More life. More home.',
    description: 'Room additions, sunrooms, and structural expansions that seamlessly integrate with your existing home.',
    image: SITE_IMAGES.additions,
    features: ['Room Additions', 'Sunrooms', 'Garage Conversions', 'Second Story Additions', 'Mudrooms', 'Laundry Rooms'],
  },
];

export const TEAM = [
  {
    name: 'Henry Rouhana',
    role: 'Owner & Founder',
    bio: 'Henry\'s passion for construction began working alongside his father in Lebanon. After earning his Architecture degree and becoming an American citizen, he founded Sure-Fix Remodeling in 2008 — bringing 25+ years of expertise to every project.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Tony',
    role: 'Lead Project Manager',
    bio: 'Tony is your main point of contact throughout your project — from initial planning through final walkthrough. He keeps every job on schedule, on budget, and to the highest standard.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    name: 'Chris',
    role: 'Showroom Manager',
    bio: 'Chris guides you through our showroom experience — helping you select materials, finishes, and designs that match your vision and budget. He makes the selection process easy and enjoyable.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
  },
  {
    name: 'James',
    role: 'Project Coordinator',
    bio: 'James is a new but mighty member of the Sure-Fix team. As Project Coordinator, he ensures every detail is tracked, every subcontractor is aligned, and every client is kept in the loop.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
  },
];

export const REVIEWS = [
  {
    name: 'Stephanie K.',
    rating: 5,
    text: 'Sure Fix Remodeling did an incredible job on my landscape design! Henry was not only professional but also one of the nicest and friendliest people I\'ve ever worked with. Highly recommend!',
    source: 'Google',
  },
  {
    name: 'Mike T.',
    rating: 5,
    text: 'Henry and his team were excellent to work with from day one. I had a complicated renovation of my kitchen that I needed to have done. My cathedral ceiling needed special attention and they handled it perfectly.',
    source: 'Google',
  },
  {
    name: 'Marilyn D.',
    rating: 5,
    text: 'Sure-fix recently remodeled our kitchen. This was our first time hiring a company to remodel our kitchen. So, my husband and I were hesitant about taking on this project. But Sure-Fix made it seamless.',
    source: 'Google',
  },
  {
    name: 'K T',
    rating: 5,
    text: 'Great experience, awesome staff and work crew. Would definitely recommend to anyone looking for quality remodeling work.',
    source: 'Google',
  },
  {
    name: 'Jon Edell',
    rating: 5,
    text: 'His workers were clean and respectful of my home and belongings. The quality of work was outstanding and they finished ahead of schedule.',
    source: 'Google',
  },
  {
    name: 'Danny Leonard',
    rating: 5,
    text: 'Very pleased with quality of workmanship. The team was professional, on time, and the finished product exceeded my expectations.',
    source: 'Google',
  },
];
