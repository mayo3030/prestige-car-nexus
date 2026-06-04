export type VehicleStatus = "available" | "pending" | "sold" | "draft";
export type VehicleType = "sedan" | "suv" | "truck" | "crossover" | "luxury";
export type AuctionStatus = "live" | "upcoming" | "ended";

export interface VehicleHistoryReport {
  accidents: number;
  owners: number;
  serviceRecords: number;
  titleStatus: string;
}

export interface Vehicle {
  id: string;
  stockNumber: string;
  slug: string;
  title: string;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  status: VehicleStatus;
  price: number;
  monthlyPayment?: number;
  downPayment?: number;
  leaseTermMonths?: number;
  mileage: number;
  location: string;
  vin?: string;
  exteriorColor?: string;
  interiorColor?: string;
  transmission: string;
  fuelType: string;
  drivetrain?: string;
  image: string;
  images: string[];
  featured?: boolean;
  description: string;
  features: string[];
  historyReports: VehicleHistoryReport;
}

export interface AuctionOpportunity {
  id: string;
  title: string;
  vehicleId?: string;
  status: AuctionStatus;
  currentBid: number;
  startingBid: number;
  bids: number;
  watchers: number;
  endTime: Date;
  location: string;
  image: string;
  year: number;
  mileage: number;
  description: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "2024-toyota-camry-xse",
    stockNumber: "JAL-2401",
    slug: "2024-toyota-camry-xse",
    title: "2024 Toyota Camry XSE",
    make: "Toyota",
    model: "Camry XSE",
    year: 2024,
    type: "sedan",
    status: "available",
    price: 34250,
    monthlyPayment: 429,
    downPayment: 2999,
    leaseTermMonths: 36,
    mileage: 18,
    location: "North Bergen, NJ",
    vin: "4T1K61AK9RU000401",
    exteriorColor: "Wind Chill Pearl",
    interiorColor: "Black SofTex",
    transmission: "8-Speed Automatic",
    fuelType: "Gasoline",
    drivetrain: "FWD",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2670",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2583",
    ],
    featured: true,
    description:
      "A new-car lease option sourced through Jersey Auto Lease partner dealers with transparent terms, broker-assisted paperwork, and home delivery anywhere in New Jersey.",
    features: [
      "Manufacturer warranty",
      "Blind spot monitor",
      "Heated front seats",
      "Wireless Apple CarPlay",
      "Free New Jersey delivery",
    ],
    historyReports: { accidents: 0, owners: 0, serviceRecords: 0, titleStatus: "New" },
  },
  {
    id: "2024-honda-cr-v-ex-l",
    stockNumber: "JAL-2402",
    slug: "2024-honda-cr-v-ex-l",
    title: "2024 Honda CR-V EX-L",
    make: "Honda",
    model: "CR-V EX-L",
    year: 2024,
    type: "suv",
    status: "available",
    price: 37900,
    monthlyPayment: 489,
    downPayment: 3499,
    leaseTermMonths: 36,
    mileage: 22,
    location: "Jersey City, NJ",
    vin: "7FARS6H75RE000214",
    exteriorColor: "Platinum White Pearl",
    interiorColor: "Gray Leather",
    transmission: "CVT",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=2574",
    images: [
      "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?q=80&w=2574",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2670",
    ],
    featured: true,
    description:
      "Family-ready SUV lease with broker-negotiated pricing, dealer paperwork support, and driveway delivery without a traditional dealership visit.",
    features: ["AWD", "Leather-trimmed seats", "Honda Sensing", "Power tailgate", "Remote delivery paperwork"],
    historyReports: { accidents: 0, owners: 0, serviceRecords: 0, titleStatus: "New" },
  },
  {
    id: "2024-hyundai-tucson-sel",
    stockNumber: "JAL-2403",
    slug: "2024-hyundai-tucson-sel",
    title: "2024 Hyundai Tucson SEL",
    make: "Hyundai",
    model: "Tucson SEL",
    year: 2024,
    type: "suv",
    status: "available",
    price: 31875,
    monthlyPayment: 399,
    downPayment: 2499,
    leaseTermMonths: 36,
    mileage: 12,
    location: "Elizabeth, NJ",
    vin: "5NMJFCAE8RH000153",
    exteriorColor: "Shimmering Silver",
    interiorColor: "Black Cloth",
    transmission: "8-Speed Automatic",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    image: "https://images.unsplash.com/photo-1633695634169-2df5c9b41b86?q=80&w=2671",
    images: [
      "https://images.unsplash.com/photo-1633695634169-2df5c9b41b86?q=80&w=2671",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2580",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2671",
    ],
    featured: true,
    description:
      "High-value compact SUV lease with competitive monthly payment, strong factory coverage, and concierge delivery coordination.",
    features: ["AWD", "SmartSense safety", "Heated seats", "10.25 inch display", "Factory warranty"],
    historyReports: { accidents: 0, owners: 0, serviceRecords: 0, titleStatus: "New" },
  },
  {
    id: "2023-bmw-330i-xdrive",
    stockNumber: "JAL-2304",
    slug: "2023-bmw-330i-xdrive",
    title: "2023 BMW 330i xDrive",
    make: "BMW",
    model: "330i xDrive",
    year: 2023,
    type: "luxury",
    status: "available",
    price: 43800,
    monthlyPayment: 599,
    downPayment: 3999,
    leaseTermMonths: 36,
    mileage: 8200,
    location: "Fort Lee, NJ",
    vin: "3MW89FF05P8003201",
    exteriorColor: "Alpine White",
    interiorColor: "Cognac",
    transmission: "8-Speed Automatic",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2670",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2670",
    ],
    featured: false,
    description:
      "Premium sedan option for clients who want a refined daily driver with transparent lease support and broker-managed pickup.",
    features: ["xDrive AWD", "Navigation", "Heated sport seats", "Driver Assistance Package", "Lease transfer eligible"],
    historyReports: { accidents: 0, owners: 1, serviceRecords: 3, titleStatus: "Clean" },
  },
  {
    id: "2024-mercedes-glc-300",
    stockNumber: "JAL-2405",
    slug: "2024-mercedes-glc-300",
    title: "2024 Mercedes-Benz GLC 300",
    make: "Mercedes-Benz",
    model: "GLC 300",
    year: 2024,
    type: "suv",
    status: "available",
    price: 51200,
    monthlyPayment: 689,
    downPayment: 4499,
    leaseTermMonths: 36,
    mileage: 30,
    location: "Paramus, NJ",
    vin: "W1NKM4HB6RF000512",
    exteriorColor: "Obsidian Black",
    interiorColor: "Macchiato Beige",
    transmission: "9-Speed Automatic",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?q=80&w=2670",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2670",
      "https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?q=80&w=2670",
    ],
    featured: true,
    description:
      "Luxury SUV lease sourced through a partner dealer with concierge quote support and delivery scheduling.",
    features: ["4MATIC AWD", "MBUX display", "Panorama roof", "Active Blind Spot Assist", "Concierge delivery"],
    historyReports: { accidents: 0, owners: 0, serviceRecords: 0, titleStatus: "New" },
  },
  {
    id: "2023-ford-f150-xlt",
    stockNumber: "JAL-2306",
    slug: "2023-ford-f150-xlt",
    title: "2023 Ford F-150 XLT SuperCrew",
    make: "Ford",
    model: "F-150 XLT",
    year: 2023,
    type: "truck",
    status: "available",
    price: 45900,
    monthlyPayment: 629,
    downPayment: 3999,
    leaseTermMonths: 39,
    mileage: 11800,
    location: "Newark, NJ",
    vin: "1FTEW1EP6PFA00421",
    exteriorColor: "Oxford White",
    interiorColor: "Medium Dark Slate",
    transmission: "10-Speed Automatic",
    fuelType: "Gasoline",
    drivetrain: "4WD",
    image: "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?q=80&w=2670",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2580",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670",
    ],
    featured: false,
    description:
      "Work-ready truck option for commercial and personal buyers who want broker-supported finance or lease terms.",
    features: ["4WD", "SuperCrew cab", "Tow package", "Backup camera", "Commercial quote support"],
    historyReports: { accidents: 0, owners: 1, serviceRecords: 4, titleStatus: "Clean" },
  },
  {
    id: "2024-kia-telluride-ex",
    stockNumber: "JAL-2407",
    slug: "2024-kia-telluride-ex",
    title: "2024 Kia Telluride EX",
    make: "Kia",
    model: "Telluride EX",
    year: 2024,
    type: "suv",
    status: "available",
    price: 44750,
    monthlyPayment: 579,
    downPayment: 3499,
    leaseTermMonths: 36,
    mileage: 16,
    location: "Clifton, NJ",
    vin: "5XYP3DGC8RG000711",
    exteriorColor: "Gravity Gray",
    interiorColor: "Black Leather",
    transmission: "8-Speed Automatic",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2580",
    images: [
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=2580",
      "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=2670",
      "https://images.unsplash.com/photo-1517672651691-24622a91b550?q=80&w=2670",
    ],
    featured: true,
    description:
      "Three-row SUV with a brokered lease structure, family-friendly equipment, and remote paperwork support.",
    features: ["Three rows", "AWD", "Leather seats", "Highway Driving Assist", "Free home delivery"],
    historyReports: { accidents: 0, owners: 0, serviceRecords: 0, titleStatus: "New" },
  },
  {
    id: "2023-nissan-rogue-sl",
    stockNumber: "JAL-2308",
    slug: "2023-nissan-rogue-sl",
    title: "2023 Nissan Rogue SL",
    make: "Nissan",
    model: "Rogue SL",
    year: 2023,
    type: "crossover",
    status: "available",
    price: 32900,
    monthlyPayment: 419,
    downPayment: 2999,
    leaseTermMonths: 36,
    mileage: 5400,
    location: "Hoboken, NJ",
    vin: "5N1BT3CB1PC000809",
    exteriorColor: "Gun Metallic",
    interiorColor: "Charcoal Leather",
    transmission: "CVT",
    fuelType: "Gasoline",
    drivetrain: "AWD",
    image: "https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?q=80&w=2574",
    images: [
      "https://images.unsplash.com/photo-1612544448445-b8232cff3b6c?q=80&w=2574",
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2671",
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670",
    ],
    featured: false,
    description:
      "Low-mileage crossover with lease and purchase quote support for clients who want predictable monthly costs.",
    features: ["AWD", "ProPILOT Assist", "Leather seats", "Panoramic roof", "Remote quote review"],
    historyReports: { accidents: 0, owners: 1, serviceRecords: 2, titleStatus: "Clean" },
  },
];

export const auctionOpportunities: AuctionOpportunity[] = [
  {
    id: "dealer-lane-suv-event",
    title: "Dealer-Lane SUV Lease Event",
    status: "live",
    currentBid: 31500,
    startingBid: 28900,
    bids: 12,
    watchers: 38,
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    location: "Northern NJ Dealer Network",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2670",
    year: 2024,
    mileage: 25,
    description:
      "Broker-monitored dealer-lane opportunity for clients seeking compact and midsize SUVs with aggressive lease programs.",
  },
  {
    id: "sedan-payment-specials",
    title: "Sedan Payment Specials",
    status: "upcoming",
    currentBid: 0,
    startingBid: 24500,
    bids: 0,
    watchers: 21,
    endTime: new Date(Date.now() + 30 * 60 * 60 * 1000),
    location: "New Jersey Partner Dealers",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2670",
    year: 2024,
    mileage: 10,
    description:
      "Upcoming broker review of sedan lease programs for clients prioritizing low monthly payments and fast approval.",
  },
  {
    id: "truck-commercial-quotes",
    title: "Commercial Truck Quote Window",
    status: "ended",
    currentBid: 42100,
    startingBid: 39500,
    bids: 8,
    watchers: 18,
    endTime: new Date(Date.now() - 5 * 60 * 60 * 1000),
    location: "Newark, NJ",
    image: "https://images.unsplash.com/photo-1605893477799-b99e3b8b93fe?q=80&w=2670",
    year: 2023,
    mileage: 11800,
    description:
      "Closed quote window for commercial clients needing broker-supported truck financing or lease options.",
  },
];

export const vehicleMakes = Array.from(new Set(vehicles.map((vehicle) => vehicle.make))).sort();

export function filterVehicles(
  list: Vehicle[],
  filters: {
    search?: string;
    make?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
  },
) {
  const search = filters.search?.trim().toLowerCase();
  const make = filters.make?.trim().toLowerCase();
  const type = filters.type?.trim().toLowerCase();
  const minPrice = filters.minPrice ?? 0;
  const maxPrice = filters.maxPrice ?? Number.POSITIVE_INFINITY;

  const filtered = list.filter((vehicle) => {
    const matchesSearch =
      !search ||
      [vehicle.title, vehicle.make, vehicle.model, vehicle.location, vehicle.stockNumber]
        .join(" ")
        .toLowerCase()
        .includes(search);
    const matchesMake = !make || make === "all" || vehicle.make.toLowerCase() === make;
    const matchesType = !type || type === "all" || vehicle.type.toLowerCase() === type;
    const matchesPrice = vehicle.price >= minPrice && vehicle.price <= maxPrice;
    return matchesSearch && matchesMake && matchesType && matchesPrice && vehicle.status === "available";
  });

  return filtered.sort((a, b) => {
    switch (filters.sort) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "mileage":
        return a.mileage - b.mileage;
      default:
        return b.year - a.year || a.price - b.price;
    }
  });
}
