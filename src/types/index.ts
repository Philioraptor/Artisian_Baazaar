export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = 'All' | 'Furniture' | 'Textiles' | 'Pottery' | 'Jewelry' | 'Art';
