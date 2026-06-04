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

const STORAGE_KEY = "jersey-cars";
const INIT_KEY = "jersey-cars-initialized";

const defaultCars: Car[] = [
  {
    id: "1", title: "2027 Porsche 911 Carrera S", make: "Porsche", model: "911 Carrera S",
    year: 2027, price: 168000, mileage: 340, location: "New Jersey",
    image: "https://images.unsplash.com/photo-1628519592419-bf288f08cef5?q=80&w=2670",
    featured: true,
  },
  {
    id: "2", title: "2027 BMW M3 Competition xDrive", make: "BMW", model: "M3 Competition",
    year: 2027, price: 92000, mileage: 510, location: "New York, NY",
    image: "https://images.unsplash.com/photo-1625231334168-35067f8853ed?q=80&w=2670",
    featured: true,
  },
  {
    id: "3", title: "2027 Mercedes-AMG GT 63", make: "Mercedes-AMG", model: "GT 63",
    year: 2027, price: 198000, mileage: 220, location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=2670",
  },
  {
    id: "4", title: "2027 McLaren 750S", make: "McLaren", model: "750S",
    year: 2027, price: 365000, mileage: 180, location: "Beverly Hills, CA",
    image: "https://images.unsplash.com/photo-1516298252535-cf2ac5147f9b?q=80&w=2670",
    featured: true,
  },
  {
    id: "5", title: "2027 Ford Mustang Shelby GT500", make: "Ford", model: "Mustang Shelby GT500",
    year: 2027, price: 89500, mileage: 690, location: "Dallas, TX",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2670",
    goodRate: true,
  },
  {
    id: "6", title: "2027 Audi RS7 Sportback", make: "Audi", model: "RS7 Sportback",
    year: 2027, price: 135000, mileage: 410, location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2670",
  },
  {
    id: "7", title: "Ferrari SF90 Stradale", make: "Ferrari", model: "SF90 Stradale",
    year: 2023, price: 825000, mileage: 1200, location: "Beverly Hills, CA",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2670",
    featured: true,
  },
  {
    id: "8", title: "Lamborghini Huracán EVO", make: "Lamborghini", model: "Huracán EVO",
    year: 2022, price: 389000, mileage: 3500, location: "Miami, FL",
    image: "https://images.unsplash.com/photo-1511919886926-f2d2d0675f64?q=80&w=2670",
  },
  {
    id: "9", title: "Porsche 911 GT3 RS", make: "Porsche", model: "911 GT3 RS",
    year: 2024, price: 295000, mileage: 850, location: "New York, NY",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2670",
    auction: true,
  },
  {
    id: "10", title: "Rolls-Royce Phantom", make: "Rolls-Royce", model: "Phantom",
    year: 2023, price: 475000, mileage: 2100, location: "Las Vegas, NV",
    image: "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?q=80&w=2670",
  },
  {
    id: "11", title: "McLaren 720S Spider", make: "McLaren", model: "720S Spider",
    year: 2022, price: 345000, mileage: 4200, location: "Scottsdale, AZ",
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2670",
  },
  {
    id: "12", title: "Bentley Continental GT", make: "Bentley", model: "Continental GT",
    year: 2023, price: 265000, mileage: 1800, location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1583032015879-e5022cb87c3b?q=80&w=2670",
    featured: true,
  },
  {
    id: "13", title: "Aston Martin DBS Superleggera", make: "Aston Martin", model: "DBS Superleggera",
    year: 2022, price: 335000, mileage: 2800, location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2670",
  },
  {
    id: "14", title: "Bugatti Chiron Sport", make: "Bugatti", model: "Chiron Sport",
    year: 2021, price: 3250000, mileage: 500, location: "Monaco",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?q=80&w=2574",
    featured: true,
  },
];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

export function initCarStore(): void {
  if (!localStorage.getItem(INIT_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCars));
    localStorage.setItem(INIT_KEY, "true");
  }
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
  const idx = cars.findIndex((c) => c.id === id);
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
