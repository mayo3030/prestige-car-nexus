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
  images?: string[];
  featured?: boolean;
  auction?: boolean;
  transmission?: string;
  fuelType?: string;
  description?: string;
  features?: string[];
  exteriorColor?: string;
  interiorColor?: string;
  engine?: string;
  horsepower?: string;
  drivetrain?: string;
  vin?: string;
  bodyStyle?: string;
  mpg?: string;
}

const STORAGE_KEY = "jersey-cars-v2";
const INIT_KEY = "jersey-cars-v2-initialized";

const defaultCars: Car[] = [
  // === HONDA 2026 ===
  {
    id: "h1", title: "2026 Honda Accord", make: "Honda", model: "Accord",
    year: 2026, price: 32950, mileage: 15, location: "Newark, NJ",
    image: "https://images.unsplash.com/photo-1619767886558-efdc7b9af94d?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1619767886558-efdc7b9af94d?q=80&w=2670",
      "https://images.unsplash.com/photo-1581540618356-c1e29e3f28c7?q=80&w=2670",
    ],
    featured: true,
    transmission: "Automatic", fuelType: "Hybrid",
    exteriorColor: "Crystal Black Pearl", interiorColor: "Black",
    engine: "2.0L I4 Hybrid", horsepower: "247 hp", drivetrain: "FWD",
    bodyStyle: "Sedan", mpg: "44 city / 41 highway",
    vin: "1HGCV1F34NA000101",
    description: "The 2026 Honda Accord delivers exceptional fuel efficiency with its refined hybrid powertrain. Featuring a sleek aerodynamic design, premium interior materials, and Honda Sensing safety suite, this Accord offers the perfect balance of performance and practicality. With only 15 miles on the odometer, it's practically showroom new. Free delivery anywhere in New Jersey.",
    features: [
      "Honda Sensing Safety Suite",
      "12.3″ Touchscreen with Wireless Apple CarPlay",
      "Wireless Phone Charger",
      "Heated Front Seats",
      "8-Speaker Premium Audio System",
      "Dual-Zone Automatic Climate Control",
      "Bose Centerpoint Surround Sound",
      "Blind Spot Information System",
      "Traffic Jam Assist",
      "Adaptive Cruise Control with Low-Speed Follow",
    ],
  },
  {
    id: "h2", title: "2026 Honda Civic", make: "Honda", model: "Civic",
    year: 2026, price: 26950, mileage: 22, location: "Jersey City, NJ",
    image: "https://images.unsplash.com/photo-1611564494260-6f21b1af1e4f?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1611564494260-6f21b1af1e4f?q=80&w=2670",
      "https://images.unsplash.com/photo-1643198624765-9faaa3a93b22?q=80&w=2670",
    ],
    featured: true,
    transmission: "CVT", fuelType: "Gasoline",
    exteriorColor: "Sonic Gray Pearl", interiorColor: "Charcoal",
    engine: "2.0L I4", horsepower: "158 hp", drivetrain: "FWD",
    bodyStyle: "Sedan", mpg: "31 city / 40 highway",
    vin: "2HGFE1F36NH620102",
    description: "The 2026 Honda Civic continues its legacy of reliability and driving enjoyment. Wearing the striking Sonic Gray Pearl finish, this Civic features a refined interior with a driver-focused cockpit, advanced digital instrumentation, and Honda's legendary build quality. A perfect daily driver for New Jersey roads.",
    features: [
      "7″ Color TFT Instrument Display",
      "9″ Touchscreen with Wireless Apple CarPlay & Android Auto",
      "Honda Sensing Safety Suite",
      "Multi-Angle Rearview Camera",
      "Walk Away Auto Lock",
      "60/40 Split Fold-Down Rear Seat",
      "LED Daytime Running Lights",
      "Blind Spot Monitoring",
      "Hill Start Assist",
      "Vehicle Stability Assist",
    ],
  },
  {
    id: "h3", title: "2026 Honda CR-V", make: "Honda", model: "CR-V",
    year: 2026, price: 35950, mileage: 10, location: "Paramus, NJ",
    image: "https://images.unsplash.com/photo-1633623708492-2c8633cf95da?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1633623708492-2c8633cf95da?q=80&w=2670",
      "https://images.unsplash.com/photo-1571224230741-a14a1a35ff27?q=80&w=2670",
    ],
    featured: true,
    transmission: "Automatic", fuelType: "Hybrid",
    exteriorColor: "Platinum White Pearl", interiorColor: "Gray",
    engine: "2.0L I4 Hybrid", horsepower: "204 hp", drivetrain: "AWD",
    bodyStyle: "SUV", mpg: "40 city / 34 highway",
    vin: "5J6RM4H99NL030103",
    description: "The 2026 Honda CR-V Hybrid blends exceptional fuel economy with versatile SUV capability. Finished in Platinum White Pearl with a light Gray interior, this crossover offers ample cargo space, a comfortable ride, and Honda's most advanced hybrid system. Ideal for families and adventurers across New Jersey.",
    features: [
      "Real-Time AWD with Intelligent Control",
      "Honda Sensing 360 Safety Suite",
      "Power Tailgate with Hands-Free Access",
      "Heated Front Seats & Steering Wheel",
      "Wireless Apple CarPlay & Android Auto",
      "Bose Premium Sound System",
      "12.3″ Digital Instrument Cluster",
      "Rain-Sensing Windshield Wipers",
      "HomeLink Remote System",
      "Auto High-Beam Headlights",
    ],
  },
  {
    id: "h4", title: "2026 Honda Pilot", make: "Honda", model: "Pilot",
    year: 2026, price: 42950, mileage: 18, location: "Edison, NJ",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670",
    ],
    transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Modern Steel Metallic", interiorColor: "Black",
    engine: "3.5L V6", horsepower: "285 hp", drivetrain: "AWD",
    bodyStyle: "SUV", mpg: "19 city / 27 highway",
    vin: "5FNYF6H59NB040104",
    description: "The 2026 Honda Pilot seats up to 8 passengers with confidence. Powered by a robust 3.5L V6 engine and available with intelligent AWD, the Pilot offers exceptional towing capacity, class-leading cargo space, and Honda's legendary reliability. The Modern Steel Metallic finish with Black interior creates a sophisticated presence.",
    features: [
      "8-Passenger Seating",
      "Intelligent Variable Torque Management AWD",
      "TrailSport Trim with Off-Road Tuning",
      "Class-Exclusive CabinTalk Intercom",
      "Honda Satellite-Linked Navigation",
      "Wireless Charging Pad",
      "Tri-Zone Automatic Climate Control",
      "Power Tailgate",
      "Towing Package (5,000 lb capacity)",
      "Collision Mitigation Braking System",
    ],
  },
  {
    id: "h5", title: "2026 Honda Passport", make: "Honda", model: "Passport",
    year: 2026, price: 39950, mileage: 12, location: "Freehold, NJ",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2670",
      "https://images.unsplash.com/photo-1581540618356-c1e29e3f28c7?q=80&w=2670",
    ],
    transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Lunar Silver Metallic", interiorColor: "Black",
    engine: "3.5L V6", horsepower: "280 hp", drivetrain: "AWD",
    bodyStyle: "SUV", mpg: "19 city / 24 highway",
    vin: "5J6TB3H90NL050105",
    description: "The 2026 Honda Passport strikes the perfect balance between rugged capability and on-road refinement. With a powerful V6 engine, available AWD, and a spacious two-row cabin, it's built for active lifestyles. Perfect for weekend adventures to the Jersey Shore or the Poconos.",
    features: [
      "i-VTM4 Torque-Vectoring AWD",
      "Tow Package (5,000 lb capacity)",
      "Intelligent Traction Management",
      "8″ Display Audio with Navigation",
      "Heated Front Seats",
      "Power Moonroof",
      "Hands-Free Power Tailgate",
      "Honda Sensing Safety Suite",
      "LED Fog Lights",
      "Roof Rails",
    ],
  },

  // === MAZDA 2026 ===
  {
    id: "m1", title: "2026 Mazda CX-5", make: "Mazda", model: "CX-5",
    year: 2026, price: 33450, mileage: 8, location: "Wayne, NJ",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670",
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2670",
    ],
    featured: true,
    transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Soul Red Crystal", interiorColor: "Brown",
    engine: "2.5L Turbo I4", horsepower: "256 hp", drivetrain: "AWD",
    bodyStyle: "SUV", mpg: "22 city / 27 highway",
    vin: "JM3KFBBM7R060101",
    description: "The 2026 Mazda CX-5 in the iconic Soul Red Crystal finish is a masterpiece of Kodo design philosophy. With its upscale cabin, engaging driving dynamics, and powerful turbocharged engine, the CX-5 delivers a premium driving experience that rivals luxury brands costing thousands more.",
    features: [
      "i-Activ AWD with Off-Road Traction Assist",
      "Mazda Connect Infotainment with 10.5-inch Display",
      "Bose 10-Speaker Premium Audio",
      "Ventilated Front Seats",
      "Heated Steering Wheel",
      "Signature Adaptive LED Headlights",
      "360° View Monitor",
      "Traffic Jam Assist",
      "Driver Attention Alert",
      "Nappa Leather-Trimmed Seats",
    ],
  },
  {
    id: "m2", title: "2026 Mazda CX-50", make: "Mazda", model: "CX-50",
    year: 2026, price: 34950, mileage: 14, location: "Morristown, NJ",
    image: "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2670",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2670",
    ],
    featured: true,
    transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Polymetal Gray", interiorColor: "Black",
    engine: "2.5L Turbo I4", horsepower: "256 hp", drivetrain: "AWD",
    bodyStyle: "SUV", mpg: "23 city / 29 highway",
    vin: "JM3KFBBA9R070102",
    description: "The 2026 Mazda CX-50 brings rugged SUV capability wrapped in Mazda's signature Kodo design. With a wider stance than the CX-5, available Terrain mode, and a purpose-built interior, the CX-50 is engineered for outdoor enthusiasts who refuse to compromise on style or driving dynamics.",
    features: [
      "Mazda Intelligent Drive Select (Mi-Drive)",
      "Terrain Response System",
      "Power Glass Moonroof",
      "Heated Front Seats",
      "Leather-Trimmed Sport Seats",
      "Bose 12-Speaker Premium Audio",
      "Traffic Sign Recognition",
      "Rear Cross-Traffic Alert",
      "Hands-Free Power Liftgate",
      "Towing Package (3,500 lb capacity)",
    ],
  },
  {
    id: "m3", title: "2026 Mazda CX-90", make: "Mazda", model: "CX-90",
    year: 2026, price: 42950, mileage: 20, location: "Princeton, NJ",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=2670",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670",
    ],
    featured: true,
    transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Artisan Red", interiorColor: "Tan",
    engine: "3.3L Turbo Inline-6", horsepower: "340 hp", drivetrain: "AWD",
    bodyStyle: "SUV", mpg: "21 city / 26 highway",
    vin: "JM3KCBAB5R080103",
    description: "The 2026 Mazda CX-90 is the brand's flagship three-row SUV, offering a powerful Inline-6 Turbo engine, sophisticated Artisan Red exterior, and a meticulously appointed cabin. It redefines what a family SUV can be, delivering rear-wheel-drive-based performance and true luxury craftsmanship.",
    features: [
      "Frontal Collision Warning with Pedestrian Detection",
      "Mazda Radar Cruise Control with Stop & Go",
      "12.3″ Full-Color Digital Driver Display",
      "Nappa Leather Interior",
      "Open-Pore Wood Trim",
      "3-Zone Automatic Climate Control",
      "7-Seat Configuration (Captain's Chairs)",
      "Hands-Free Power Liftgate",
      "1500W AC Power Outlet",
      "Trailer Stability Assist",
    ],
  },
  {
    id: "m4", title: "2026 Mazda3", make: "Mazda", model: "Mazda3",
    year: 2026, price: 25450, mileage: 25, location: "Bridgewater, NJ",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2670",
      "https://images.unsplash.com/photo-1611564494260-6f21b1af1e4f?q=80&w=2670",
    ],
    transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Machine Gray Metallic", interiorColor: "Black",
    engine: "2.5L I4", horsepower: "191 hp", drivetrain: "AWD",
    bodyStyle: "Sedan", mpg: "26 city / 35 highway",
    vin: "JM1BPABL3R090104",
    description: "The 2026 Mazda3 Sedan proves that compact cars can be truly premium. With its upscale cabin, near-luxury materials, and exceptional driving dynamics, the Mazda3 delivers a driving experience far beyond its price point. The Machine Gray Metallic finish highlights every elegant bodyline.",
    features: [
      "i-Activ AWD",
      "8.8″ Full-Color Center Display with Commander Control",
      "Bose 12-Speaker Premium Audio",
      "Leather-Trimmed Sport Seats",
      "Heated Front Seats",
      "Adaptive Front Lighting System",
      "Blind Spot Monitoring with Rear Cross-Traffic Alert",
      "Rain-Sensing Wipers",
      "Auto-Dimming Rearview Mirror",
      "Push-Button Start",
    ],
  },
  {
    id: "m5", title: "2026 Mazda MX-5 Miata", make: "Mazda", model: "MX-5 Miata",
    year: 2026, price: 33950, mileage: 5, location: "Red Bank, NJ",
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=2670",
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=2670",
    ],
    transmission: "Manual", fuelType: "Gasoline",
    exteriorColor: "Soul Red Crystal", interiorColor: "Black",
    engine: "2.0L I4", horsepower: "181 hp", drivetrain: "RWD",
    bodyStyle: "Convertible", mpg: "26 city / 34 highway",
    vin: "JM1NDAB72R100105",
    description: "The 2026 Mazda MX-5 Miata is the world's best-selling two-seat roadster for good reason. With just 5 miles on the odometer, this Soul Red Crystal beauty offers pure driving joy through its lightweight construction, perfect 50:50 weight distribution, and precise manual transmission.",
    features: [
      "Power Retractable Hard Top (RF)",
      "Bilstein Shock Absorbers",
      "Limited-Slip Differential",
      "Bose 9-Speaker Audio System",
      "SiriusXM Satellite Radio",
      "Apple CarPlay Integration",
      "LED Headlights with Auto Leveling",
      "Alcantara-Trimmed Seats",
      "Heated Seats",
      "7″ Full-Color Touchscreen",
    ],
  },

  // === TOYOTA 2026 ===
  {
    id: "t1", title: "2026 Toyota Camry", make: "Toyota", model: "Camry",
    year: 2026, price: 30950, mileage: 12, location: "Newark, NJ",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c39934e3f?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c39934e3f?q=80&w=2670",
      "https://images.unsplash.com/photo-1619767886558-efdc7b9af94d?q=80&w=2670",
    ],
    featured: true,
    transmission: "Automatic", fuelType: "Hybrid",
    exteriorColor: "Midnight Black Metallic", interiorColor: "Black",
    engine: "2.5L I4 Hybrid", horsepower: "225 hp", drivetrain: "FWD",
    bodyStyle: "Sedan", mpg: "51 city / 53 highway",
    vin: "4T1DAACK6RU110101",
    description: "The 2026 Toyota Camry Hybrid sets the standard for midsize sedan efficiency and refinement. With an incredible 51 MPG city rating and a surprisingly refined cabin, the Camry delivers exceptional value without sacrificing style or comfort. Midnight Black Metallic with Black interior exudes confidence.",
    features: [
      "Toyota Safety Sense 3.0",
      "12.3″ Multimedia Touchscreen",
      "Wireless Apple CarPlay & Android Auto",
      "Digital Key with Remote Connect",
      "Heated Front Seats",
      "9-Speaker JBL Premium Audio",
      "Qi Wireless Charging",
      "Smart Key System with Push Button Start",
      "Power Moonroof",
      "Auto-Dimming Rearview Mirror with HomeLink",
    ],
  },
  {
    id: "t2", title: "2026 Toyota RAV4", make: "Toyota", model: "RAV4",
    year: 2026, price: 33450, mileage: 10, location: "Elizabeth, NJ",
    image: "https://images.unsplash.com/photo-1629897045550-3dd0bbd8a136?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1629897045550-3dd0bbd8a136?q=80&w=2670",
      "https://images.unsplash.com/photo-1633623708492-2c8633cf95da?q=80&w=2670",
    ],
    featured: true,
    transmission: "Automatic", fuelType: "Hybrid",
    exteriorColor: "Magnetic Gray Metallic", interiorColor: "Gray",
    engine: "2.5L I4 Hybrid", horsepower: "219 hp", drivetrain: "AWD",
    bodyStyle: "SUV", mpg: "41 city / 38 highway",
    vin: "JTMFB3FV7RD120102",
    description: "The 2026 Toyota RAV4 Hybrid is America's favorite crossover for good reason. Combining legendary Toyota reliability with outstanding fuel economy, spacious cargo capacity, and available AWD, it's the ideal companion for New Jersey families and commuters alike.",
    features: [
      "Toyota Safety Sense 3.0",
      "Electronic On-Demand AWD",
      "10.5″ Multimedia Display",
      "Heated Front Seats",
      "Hands-Free Power Liftgate",
      "Blind Spot Monitor with Rear Cross-Traffic Alert",
      "Rain-Sensing Wipers",
      "Digital Rearview Mirror",
      "1500W Power Outlet",
      "Tow Hitch with Wiring Connector",
    ],
  },
  {
    id: "t3", title: "2026 Toyota Corolla", make: "Toyota", model: "Corolla",
    year: 2026, price: 24950, mileage: 18, location: "Paterson, NJ",
    image: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?q=80&w=2670",
      "https://images.unsplash.com/photo-1611564494260-6f21b1af1e4f?q=80&w=2670",
    ],
    featured: true,
    transmission: "CVT", fuelType: "Gasoline",
    exteriorColor: "Celestite Gray", interiorColor: "Black",
    engine: "2.0L I4", horsepower: "169 hp", drivetrain: "FWD",
    bodyStyle: "Sedan", mpg: "31 city / 40 highway",
    vin: "JTDBR4HE9RJ130103",
    description: "The 2026 Toyota Corolla continues its legacy as one of the most reliable and fuel-efficient compact sedans on the road. With modern styling, Toyota Safety Sense 3.0 standard, and an incredibly comfortable ride, it's the smartest choice for value-conscious buyers.",
    features: [
      "Toyota Safety Sense 3.0",
      "8″ Touchscreen with Apple CarPlay & Android Auto",
      "Smart Key System",
      "LED Headlamps with Auto On/Off",
      "Power Windows with One-Touch Auto Up/Down",
      "60/60 Split Fold-Down Rear Seat",
      "Starlink Remote Connect",
      "Rearview Camera with Dynamic Gridlines",
      "Tire Pressure Monitoring System",
      "Voice-Activated Multimedia",
    ],
  },
  {
    id: "t4", title: "2026 Toyota 4Runner", make: "Toyota", model: "4Runner",
    year: 2026, price: 44950, mileage: 8, location: "Trenton, NJ",
    image: "https://images.unsplash.com/photo-1520031441870-7b0bb0b2f0ac?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1520031441870-7b0bb0b2f0ac?q=80&w=2670",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2670",
    ],
    transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Super White", interiorColor: "Black",
    engine: "4.0L V6", horsepower: "270 hp", drivetrain: "4WD",
    bodyStyle: "SUV", mpg: "16 city / 19 highway",
    vin: "JTEBT5JR8R140104",
    description: "The 2026 Toyota 4Runner remains the king of body-on-frame SUVs, offering unparalleled off-road capability and legendary durability. With only 8 miles, this Super White 4Runner is ready for serious adventures — from the Pine Barrens to the Rockies.",
    features: [
      "Part-Time 4WD with Active Traction Control",
      "Multi-Terrain Select System",
      "Crawl Control with Downhill Assist",
      "Kinetic Dynamic Suspension System (KDSS)",
      "Locking Rear Differential",
      "8″ Touchscreen with Navigation",
      "JBL 15-Speaker Premium Audio",
      "Sliding Rear Cargo Deck",
      "Power Moonroof",
      "Tow Package (5,000 lb capacity)",
    ],
  },
  {
    id: "t5", title: "2026 Toyota Tacoma", make: "Toyota", model: "Tacoma",
    year: 2026, price: 38950, mileage: 15, location: "Cherry Hill, NJ",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670",
      "https://images.unsplash.com/photo-1520031441870-7b0bb0b2f0ac?q=80&w=2670",
    ],
    transmission: "Automatic", fuelType: "Gasoline",
    exteriorColor: "Army Green", interiorColor: "Black",
    engine: "3.4L V6", horsepower: "317 hp", drivetrain: "4WD",
    bodyStyle: "Truck", mpg: "18 city / 23 highway",
    vin: "3TMLB5JN9RM150105",
    description: "The 2026 Toyota Tacoma in the legendary Army Green color is built for adventure. With its powerful V6 engine, 4WD capability, and proven reliability, the Tacoma is America's best-selling midsize truck. Whether for work or play, this truck delivers unmatched capability.",
    features: [
      "Electronic Part-Time 4WD",
      "Multi-Terrain Select",
      "Crawl Control",
      "Locking Rear Differential",
      "14″ Touchscreen with Wireless Apple CarPlay & Android Auto",
      "JBL 10-Speaker Premium Audio",
      "Heated Front Seats & Steering Wheel",
      "Composite Bedliner",
      "Trailer Brake Controller",
      "Gooseneck/5th-Wheel Towing Prep",
    ],
  },
  {
    id: "t6", title: "2026 Toyota Grand Highlander", make: "Toyota", model: "Grand Highlander",
    year: 2026, price: 45950, mileage: 22, location: "Woodbridge, NJ",
    image: "https://images.unsplash.com/photo-1606016159991-dfe4f27469ad?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f27469ad?q=80&w=2670",
      "https://images.unsplash.com/photo-1629897045550-3dd0bbd8a136?q=80&w=2670",
    ],
    transmission: "Automatic", fuelType: "Hybrid",
    exteriorColor: "Blueprint", interiorColor: "Tan",
    engine: "2.5L I4 Hybrid", horsepower: "245 hp", drivetrain: "AWD",
    bodyStyle: "SUV", mpg: "36 city / 32 highway",
    vin: "5TDDBRCH4RS160106",
    description: "The 2026 Toyota Grand Highlander is the largest, most refined SUV in Toyota's lineup. With three rows of adult-friendly seating, a powerful hybrid powertrain, and premium Blueprint Blue finish with Tan interior, this is the ultimate family hauler for discerning New Jersey families.",
    features: [
      "Toyota Safety Sense 3.0",
      "12.3″ Multimedia Touchscreen with Navigation",
      "JBL 13-Speaker Premium Audio",
      "Captain's Chairs Second Row",
      "Panoramic View Moonroof",
      "Heated & Ventilated Front Seats",
      "Heated Second-Row Seats",
      "Hands-Free Power Liftgate",
      "Digital Rearview Mirror",
      "Tow Package (5,000 lb capacity)",
    ],
  },
  {
    id: "t7", title: "2026 Toyota Land Cruiser", make: "Toyota", model: "Land Cruiser",
    year: 2026, price: 61950, mileage: 30, location: "Princeton, NJ",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2670",
      "https://images.unsplash.com/photo-1520031441870-7b0bb0b2f0ac?q=80&w=2670",
    ],
    transmission: "Automatic", fuelType: "Hybrid",
    exteriorColor: "Heritage Blue", interiorColor: "Black",
    engine: "2.4L Turbo Hybrid I4", horsepower: "326 hp", drivetrain: "4WD",
    bodyStyle: "SUV", mpg: "22 city / 25 highway",
    vin: "JTEB17BJ3R170107",
    description: "The legendary Toyota Land Cruiser returns for 2026 — a true icon reborn. Combining off-road supremacy with modern luxury, the Heritage Blue edition features a powerful turbo hybrid powertrain, full-time 4WD, and the kind of build quality that makes Land Cruisers famous for lasting 25+ years.",
    features: [
      "Full-Time 4WD with Center Locking Differential",
      "Multi-Terrain Select with Crawl Control",
      "Electronic-Kinetic Dynamic Suspension (E-KDSS)",
      "12.3″ Multimedia Touchscreen",
      "JBL 14-Speaker Premium Audio",
      "Heated & Ventilated Front Seats",
      "Heated Steering Wheel",
      "Wireless Apple CarPlay & Android Auto",
      "Hands-Free Power Liftgate",
      "Trailer Backup Guide",
    ],
  },
];

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 6);
}

export function initCarStore(): void {
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
