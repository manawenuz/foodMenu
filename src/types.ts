export interface FoodItem {
  id: string;
  name: string;
  image: string;
  available: boolean;
}

export interface FoodCategory {
  id: string;
  name: string;
  items: FoodItem[];
} 