export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  image: string;
}

export const categories = [
  "Aluminium Fittings",
  "Bath Accessories",
  "Bath Fittings",
  "Curtain Fittings & Profiles",
  "Hardware Fittings",
  "Hinges & Sliding Systems",
  "Sanitary Fittings",
  "Miscellaneous",
  "PVC Pipes & Sections",
] as const;

export type Category = typeof categories[number];

// Category placeholder images
export const categoryImages: Record<string, string> = {
  "Aluminium Fittings": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  "Bath Accessories": "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
  "Bath Fittings": "https://images.unsplash.com/photo-1585128792020-803d29415281?w=400&h=300&fit=crop",
  "Curtain Fittings & Profiles": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
  "Hardware Fittings": "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=300&fit=crop",
  "Hinges & Sliding Systems": "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=300&fit=crop",
  "Sanitary Fittings": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop",
  "Miscellaneous": "https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?w=400&h=300&fit=crop",
  "PVC Pipes & Sections": "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
};


export const PRODUCTS_API_URL =
  "https://opensheet.elk.sh/YOUR_SHEET_ID/Products";