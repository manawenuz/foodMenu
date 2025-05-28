// Import all images
import roastedChickenLeg from '../assets/images/roastedChickenLeg.webp';
import salmonSteak from '../assets/images/salmonSteak.avif';
import beeftongue from '../assets/images/beeftongue.webp';
import persianOmelette from '../assets/images/Omelette-Godje-Faranghi-Persisches-Omelette-املت-گوجه-فرنگی.jpeg';
import persianRice from '../assets/images/persianRice.webp';
import stickyRice from '../assets/images/sticky rice.webp';
import thinRiceNoodles from '../assets/images/thin rice noodels.webp';
import thickRiceNoodles from '../assets/images/thick rice noodles.webp';
import spaghettiBolognese from '../assets/images/spaghetti bolognese.webp';
import macaroni from '../assets/images/macarroni.webp';
import russianVareniki from '../assets/images/russianvareniki.webp';
import russianDumplings from '../assets/images/russian Dumplings.webp';
import pshenoPorridge from '../assets/images/pshenoPorridge.webp';
import oatPorridge from '../assets/images/oatPorridge.webp';
import grechkaButter from '../assets/images/Grechka with butter.webp';
import steamedCauliflower from '../assets/images/steamedCauliflower.webp';
import steamedCarrots from '../assets/images/steamedCarrots.webp';
import steamedPeas from '../assets/images/steamedPeas.webp';
import favaBeans from '../assets/images/favaBeans.webp';
import steamedBroccoli from '../assets/images/steamedBorrocoli.webp';
import mixedVeggiesSteamed from '../assets/images/mixedVeggiesSteamed.webp';
import frenchFries from '../assets/images/frenchFries.webp';
import bakedPotatoes from '../assets/images/bakedPotatoes.webp';
import bananaCake from '../assets/images/bananaCake.webp';
import chickenFingers from '../assets/images/chickenFingers.webp';
import fishFingers from '../assets/images/fishFingers.webp';

export interface FoodItem {
  id: string;
  name: string;
  image: string;
}

export interface FoodCategory {
  id: string;
  name: string;
  items: FoodItem[];
}

export const foodCategories: FoodCategory[] = [
  {
    id: 'main-dishes',
    name: 'Main Dishes',
    items: [
      { id: 'roasted-chicken', name: 'Roasted Chicken Leg', image: roastedChickenLeg },
      { id: 'salmon', name: 'Salmon Steak', image: salmonSteak },
      { id: 'beef-tongue', name: 'Beef Tongue', image: beeftongue },
      { id: 'persian-omelette', name: 'Persian Omelette', image: persianOmelette }
    ]
  },
  {
    id: 'pasta-rice',
    name: 'Pasta & Rice',
    items: [
      { id: 'persian-rice', name: 'Persian Rice', image: persianRice },
      { id: 'sticky-rice', name: 'Sticky Rice', image: stickyRice },
      { id: 'thin-noodles', name: 'Thin Rice Noodles', image: thinRiceNoodles },
      { id: 'thick-noodles', name: 'Thick Rice Noodles', image: thickRiceNoodles },
      { id: 'spaghetti', name: 'Spaghetti Bolognese', image: spaghettiBolognese },
      { id: 'macaroni', name: 'Macaroni', image: macaroni }
    ]
  },
  {
    id: 'dumplings',
    name: 'Dumplings',
    items: [
      { id: 'vareniki', name: 'Russian Vareniki', image: russianVareniki },
      { id: 'dumplings', name: 'Russian Dumplings', image: russianDumplings }
    ]
  },
  {
    id: 'porridge',
    name: 'Porridge',
    items: [
      { id: 'psheno', name: 'Psheno Porridge', image: pshenoPorridge },
      { id: 'oat', name: 'Oat Porridge', image: oatPorridge },
      { id: 'grechka', name: 'Grechka with Butter', image: grechkaButter }
    ]
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    items: [
      { id: 'cauliflower', name: 'Steamed Cauliflower', image: steamedCauliflower },
      { id: 'carrots', name: 'Steamed Carrots', image: steamedCarrots },
      { id: 'peas', name: 'Steamed Peas', image: steamedPeas },
      { id: 'fava-beans', name: 'Fava Beans', image: favaBeans },
      { id: 'broccoli', name: 'Steamed Broccoli', image: steamedBroccoli },
      { id: 'mixed-veggies', name: 'Mixed Steamed Vegetables', image: mixedVeggiesSteamed }
    ]
  },
  {
    id: 'side-dishes',
    name: 'Side Dishes',
    items: [
      { id: 'french-fries', name: 'French Fries', image: frenchFries },
      { id: 'baked-potatoes', name: 'Baked Potatoes', image: bakedPotatoes }
    ]
  },
  {
    id: 'desserts',
    name: 'Desserts',
    items: [
      { id: 'banana-cake', name: 'Banana Cake', image: bananaCake }
    ]
  },
  {
    id: 'snacks',
    name: 'Snacks',
    items: [
      { id: 'chicken-fingers', name: 'Chicken Fingers', image: chickenFingers },
      { id: 'fish-fingers', name: 'Fish Fingers', image: fishFingers }
    ]
  }
]; 