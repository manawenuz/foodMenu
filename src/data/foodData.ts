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
import khinkali from '../assets/images/khinkali.webp';
import boiledShrimps from '../assets/images/boiledShrimps.webp';
import cucumber from '../assets/images/cucumber.webp';
import tomatoes from '../assets/images/tomatoes.webp';
import cookedMincedBeef from '../assets/images/cookedMincedBeef.webp';
import sobaNoodles from '../assets/images/sobaNoodles.webp';
import macaroniShaped1 from '../assets/images/macaroniShaped1.webp';
import macaroniShaped2 from '../assets/images/macaroniShaped2.webp';

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
      { id: 'persian-omelette', name: 'Persian Omelette', image: persianOmelette },
      { id: 'khinkali', name: 'Khinkali', image: khinkali },
      { id: 'cooked-minced-beef', name: 'Cooked Minced Beef', image: cookedMincedBeef },
      { id: 'kabab-tabei', name: 'Kabab Tabei', image: '/images/kababtabei.webp' },
      { id: 'cutlets', name: 'Cutlets', image: '/images/cutlets.webp' },
    ]
  },
  {
    id: 'breakfast-brunch',
    name: 'Breakfast & Brunch',
    items: [
      { id: 'boiled-eggs', name: 'Boiled Eggs', image: '/images/boiledEggs.webp' },
      { id: 'sirniki', name: 'Sirniki', image: '/images/sirniki.webp' },
      { id: 'blinni', name: 'Blini', image: '/images/blinni.webp' },
      { id: 'chvishtari', name: 'Chvishtari', image: '/images/chvishtari.webp' },
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
      { id: 'macaroni', name: 'Macaroni', image: macaroni },
      { id: 'soba-noodles', name: 'Soba Noodles', image: sobaNoodles },
      { id: 'macaroni-shaped-1', name: 'Shaped Macaroni 1', image: macaroniShaped1 },
      { id: 'macaroni-shaped-2', name: 'Shaped Macaroni 2', image: macaroniShaped2 },
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
      { id: 'mixed-veggies', name: 'Mixed Steamed Vegetables', image: mixedVeggiesSteamed },
      { id: 'cucumber', name: 'Cucumber', image: cucumber },
      { id: 'tomatoes', name: 'Tomatoes', image: tomatoes },
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
  },
  {
    id: 'seafood',
    name: 'Seafood',
    items: [
      { id: 'boiled-shrimps', name: 'Boiled Shrimps', image: boiledShrimps },
    ]
  },
]; 