export interface Car {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  image: string;
  featured?: boolean;
  goodRate?: boolean;
  auction?: boolean;
  transmission?: string;
  fuelType?: string;
  description?: string;
  images?: string[];
  features?: string[];
  exteriorColor?: string;
  interiorColor?: string;
  engine?: string;
  horsepower?: string;
  drivetrain?: string;
  vin?: string;
}

const STORAGE_KEY = "jersey-cars-v2";
const INIT_KEY = "jersey-cars-v2-initialized";

const defaultCars: Car[] = [
  // === HONDA 2026 ===
  {
    id: "h1", title: "2026 Honda Accord", make: "Honda", model: "Accord",
    year: 2026, price: 32950, mileage: 15, location: "Newark, NJ",
    image: "https://images.unsplash.com/photo-1619767886558-efdc7b9af94d?q=80&w=2670",
    featured: true, transmission: "Automatic", fuelType: "Hybrid",
    exteriorColor: "Crystal Black Pearl", interiorColor: "Black",
    engine: "2.0L I4 Hybrid", horsepower: "247 hp", drivetrain: "FWD",
  },
  {
    id: "h2", title: "2026 Honda Civic", make: "Honda", model: "Civic",
    year: 2026, price: 26950, mileage: 22, location: "Jersey City, NJ",
    image: "https://images.unsplash.com/photo-1611564494260-6f21b1af1e4f?q=80&w=2670",
    featured: true, transmission: "CVT", fuelType: "Gasoline",
    exteriorColor: "Sonic Gray Pearl", interiorColor: "Charcoal",
  },
  {
    id: "h3", title: "2026 Honda CR-V", make: "Honda", model: "CR-V",
    year: 2026, price: 35950, mileage: 10, location: "Paramus, NJ",
    image: "https://images.unsplash.com/photo-1633623708492-2c8633cf95da?q=80&w=2670",
    featured: true, transmission: "Automatic", fuelType: "Hybrid",
    exteriorColor: "Platinum White Pearl", interiorColor: "Gray",
  },
  {
    id: "h4", title: "2026 Honda Pilot", make: "Honda", model: "Pilot",
    year: 2026, price: 42950, mileage: 18, location: "Edison, NJ",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670",
    transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Modern Steel Metallic", interiorColor: "Black",
  },
  {
    id: "h5", title: "2026 Honda Passport", make: "Honda", model: "Passport",
    year: 2026, price: 39950, mileage: 12, location: "Freehold, NJ",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2670",
    transmission: "Automatic", fuelType: "Gasoline",
  },

  // === MAZDA 2026 ===
  {
    id: "m1", title: "2026 Mazda CX-5", make: "Mazda", model: "CX-5",
    year: 2026, price: 33450, mileage: 8, location: "Wayne, NJ",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670",
    featured: true, transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Soul Red Crystal", interiorColor: "Brown",
  },
  {
    id: "m2", title: "2026 Mazda CX-50", make: "Mazda", model: "CX-50",
    year: 2026, price: 34950, mileage: 14, location: "Morristown, NJ",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2670",
    featured: true, transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Polymetal Gray", interiorColor: "Black",
  },
  {
    id: "m3", title: "2026 Mazda CX-90", make: "Mazda", model: "CX-90",
    year: 2026, price: 42950, mileage: 20, location: "Princeton, NJ",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2670",
    featured: true, transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Artisan Red", interiorColor: "Tan",
  },
  {
    id: "m4", title: "2026 Mazda3", make: "Mazda", model: "Mazda3",
    year: 2026, price: 25450, mileage: 25, location: "Bridgewater, NJ",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2670",
    transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Machine Gray Metallic", interiorColor: "Black",
  },
  {
    id: "m5", title: "2026 Mazda MX-5 Miata", make: "Mazda", model: "MX-5 Miata",
    year: 2026, price: 33950, mileage: 5, location: "Red Bank, NJ",
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=2670",
    transmission: "Manual", fuelType: "Gasoline",
    exteriorColor: "Soul Red Crystal", interiorColor: "Black",
  },

  // === TOYOTA 2026 ===
  {
    id: "t1", title: "2026 Toyota Camry", make: "Toyota", model: "Camry",
    year: 2026, price: 30950, mileage: 12, location: "Newark, NJ",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c39934e3f?q=80&w=2670",
    featured: true, transmission: "Automatic", fuelType: "Hybrid",
    exteriorColor: "Midnight Black Metallic", interiorColor: "Black",
  },
  {
    id: "t2", title: "2026 Toyota RAV4", make: "Toyota", model: "RAV4",
    year: 2026, price: 33450, mileage: 10, location: "Elizabeth, NJ",
    image: "https://images.unsplash.com/photo-1629897045550-3dd0bbd8a136?q=80&w=2670",
    featured: true, transmission: "Automatic", fuelType: "Hybrid",
    exteriorColor: "Magnetic Gray Metallic", interiorColor: "Gray",
  },
  {
    id: "t3", title: "2026 Toyota Corolla", make: "Toyota", model: "Corolla",
    year: 2026, price: 24950, mileage: 18, location: "Paterson, NJ",
    image: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?q=80&w=2670",
    featured: true, transmission: "CVT", fuelType: "Gasoline",
    exteriorColor: "Celestite Gray", interiorColor: "Black",
  },
  {
    id: "t4", title: "2026 Toyota 4Runner", make: "Toyota", model: "4Runner",
    year: 2026, price: 44950, mileage: 8, location: "Trenton, NJ",
    image: "https://images.unsplash.com/photo-1520031441870-7b0bb0b2f0ac?q=80&w=2670",
    transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Super White", interiorColor: "Black",
  },
  {
    id: "t5", title: "2026 Toyota Tacoma", make: "Toyota", model: "Tacoma",
    year: 2026, price: 38950, mileage: 15, location: "Cherry Hill, NJ",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670",
    transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Army Green", interiorColor: "Black",
  },
  {
    id: "t6", title: "2026 Toyota Grand Highlander", make: "Toyota", model: "Grand Highlander",
    year: 2026, price: 45950, mileage: 22, location: "Woodbridge, NJ",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f27469ad?q=80&w=2670",
    transmission: "Automatic", fuelType: "Hybrid",
    exteriorColor: "Blueprint", interiorColor: "Tan",
  },
  {
    id: "t7", title: "2026 Toyota Land Cruiser", make: "Toyota", model: "Land Cruiser",
    year: 2026, price: 61950, mileage: 30, location: "Princeton, NJ",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670",
    transmission: "Automatic", fuelType: "Hybrid",
    exteriorColor: "Heritage Blue", interiorColor: "Black",
  },
];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

export function initCarStore(): void {
  // Always reset with new defaults
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCars));
  localStorage.setItem(INIT_KEY, "true");
}

export function getCars(): Car[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    initCarStore();
    return getCars();
  }
  return JSON.parse(raw);
}

export function getCarById(id: string): Car | undefined {
  return getCars().find((c) => c.id === id);
}

export function addCar(car: Omit<Car, "id">): Car {
  const newCar: Car = { ...car, id: generateId() };
  const cars = getCars();
  cars.push(newCar);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  return newCar;
}

export function updateCar(id: string, updates: Partial<Car>): Car | null {
  const cars = getCars();
  const idx = cars.findIndex((c) => c.id === idx);
  if (idx === -1) return null;
  cars[idx] = { ...cars[idx], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  return cars[idx];
}

export function deleteCar(id: string): boolean {
  const cars = getCars();
  const filtered = cars.filter((c) => c.id !== id);
  if (filtered.length === cars.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

export function getFeaturedCars(): Car[] {
  return getCars().filter((c) => c.featured);
}
