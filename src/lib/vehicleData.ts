// Comprehensive vehicle makes and models database
// Source: Mitchell 1 / industry-standard catalog

export interface VehicleMake {
  name: string;
  models: string[];
}

export const ALL_MAKES: VehicleMake[] = [
  {
    name: "Acura",
    models: ["Integra", "MDX", "NSX", "RDX", "TLX", "ZDX"],
  },
  {
    name: "Alfa Romeo",
    models: ["Giulia", "Stelvio", "Tonale", "4C Spider"],
  },
  {
    name: "Aston Martin",
    models: ["DB11", "DB12", "DBS Superleggera", "DBX", "Valhalla", "Vantage", "Vanquish"],
  },
  {
    name: "Audi",
    models: ["A3", "A4", "A5", "A6", "A7", "A8", "e-tron", "e-tron GT", "Q3", "Q5", "Q7", "Q8", "RS7 Sportback", "R8", "S3", "S4", "S5", "SQ5", "TT"],
  },
  {
    name: "Bentley",
    models: ["Bentayga", "Continental GT", "Flying Spur", "Mulsanne"],
  },
  {
    name: "BMW",
    models: ["2 Series", "3 Series", "4 Series", "5 Series", "7 Series", "8 Series", "i4", "i7", "iX", "M2", "M3", "M3 Competition", "M4", "M5", "M8", "X1", "X3", "X5", "X6", "X7", "Z4"],
  },
  {
    name: "Bugatti",
    models: ["Chiron", "Chiron Sport", "Divo", "Veyron"],
  },
  {
    name: "Buick",
    models: ["Enclave", "Encore", "Envision", "LaCrosse", "Regal"],
  },
  {
    name: "Cadillac",
    models: ["CT4", "CT5", "Escalade", "LYRIQ", "XT4", "XT5", "XT6"],
  },
  {
    name: "Chevrolet",
    models: ["Blazer", "Camaro", "Colorado", "Corvette", "Equinox", "Malibu", "Silverado", "Suburban", "Tahoe", "Traverse", "TrailBlazer"],
  },
  {
    name: "Chrysler",
    models: ["300", "Pacifica", "Voyager"],
  },
  {
    name: "Ferrari",
    models: ["296 GTB", "296 GTS", "488 GTB", "812 Superfast", "F8 Tributo", "Portofino", "Purosangue", "Roma", "SF90 Stradale", "SF90 Spider"],
  },
  {
    name: "Fiat",
    models: ["500", "500X", "124 Spider"],
  },
  {
    name: "Ford",
    models: ["Bronco", "Edge", "Escape", "Expedition", "Explorer", "F-150", "GT", "Maverick", "Mustang", "Mustang Shelby GT500", "Ranger", "Transit"],
  },
  {
    name: "Genesis",
    models: ["G70", "G80", "G90", "GV60", "GV70", "GV80"],
  },
  {
    name: "GMC",
    models: ["Acadia", "Canyon", "Hummer EV", "Sierra", "Terrain", "Yukon"],
  },
  {
    name: "Honda",
    models: ["Accord", "Civic", "CR-V", "HR-V", "Odyssey", "Passport", "Pilot", "Ridgeline"],
  },
  {
    name: "Hummer",
    models: ["H1", "H2", "H3", "Hummer EV"],
  },
  {
    name: "Hyundai",
    models: ["Elantra", "IONIQ 5", "IONIQ 6", "Kona", "Palisade", "Santa Fe", "Sonata", "Tucson", "Veloster"],
  },
  {
    name: "INEOS",
    models: ["Grenadier", "Quartermaster"],
  },
  {
    name: "Infiniti",
    models: ["Q50", "Q60", "QX50", "QX55", "QX60", "QX80"],
  },
  {
    name: "Jaguar",
    models: ["E-PACE", "F-PACE", "F-TYPE", "I-PACE", "X-Type", "XF", "XJ"],
  },
  {
    name: "Jeep",
    models: ["Cherokee", "Compass", "Gladiator", "Grand Cherokee", "Renegade", "Wagoneer", "Wrangler"],
  },
  {
    name: "Kia",
    models: ["Carnival", "EV6", "EV9", "Forte", "K5", "Niro", "Rio", "Sedona", "Seltos", "Sorento", "Soul", "Sportage", "Stinger", "Telluride"],
  },
  {
    name: "Lamborghini",
    models: ["Aventador", "Countach", "Huracán", "Huracán EVO", "Revuelto", "Urus", "Urus Performante"],
  },
  {
    name: "Land Rover",
    models: ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
  },
  {
    name: "Lexus",
    models: ["ES", "GS", "GX", "IS", "LC", "LS", "LX", "NX", "RC", "RX", "UX"],
  },
  {
    name: "Lincoln",
    models: ["Aviator", "Corsair", "Nautilus", "Navigator", "Zephyr"],
  },
  {
    name: "Lotus",
    models: ["Emeya", "Emira", "Eletre", "Evija", "Evora"],
  },
  {
    name: "Lucid",
    models: ["Air", "Gravity"],
  },
  {
    name: "Maserati",
    models: ["Ghibli", "Grecale", "GranTurismo", "Levante", "MC20", "Quattroporte"],
  },
  {
    name: "Mazda",
    models: ["CX-30", "CX-5", "CX-50", "CX-9", "CX-90", "Mazda3", "MX-5 Miata", "RX-7"],
  },
  {
    name: "McLaren",
    models: ["720S", "720S Spider", "750S", "765LT", "Artura", "GT", "P1", "Senna", "Speedtail"],
  },
  {
    name: "Mercedes-AMG",
    models: ["A 45", "C 43", "C 63", "E 53", "E 63", "G 63", "GT", "GT 63", "GLC 43", "GLC 63", "S 63"],
  },
  {
    name: "Mercedes-Benz",
    models: ["A-Class", "C-Class", "CLS", "E-Class", "EQS", "EQE", "G-Class", "GLA", "GLB", "GLC", "GLE", "GLS", "S-Class", "SL", "SLC", "V-Class"],
  },
  {
    name: "MG",
    models: ["HS", "MG4", "MG5", "ZS", "Cyberster"],
  },
  {
    name: "Mini",
    models: ["Cooper", "Cooper S", "Countryman", "JCW", "Paceman"],
  },
  {
    name: "Mitsubishi",
    models: ["Eclipse Cross", "Lancer", "Mirage", "Montero", "Outlander"],
  },
  {
    name: "Nissan",
    models: ["Altima", "Armada", "Frontier", "GT-R", "Kicks", "Leaf", "Maxima", "Murano", "Pathfinder", "Qashqai", "Rogue", "Sentra", "Titan", "Versa", "Z"],
  },
  {
    name: "Polestar",
    models: ["Polestar 1", "Polestar 2", "Polestar 3", "Polestar 4"],
  },
  {
    name: "Pontiac",
    models: ["Firebird", "G6", "GTO", "Solstice", "Torrent"],
  },
  {
    name: "Porsche",
    models: ["718 Cayman", "718 Boxster", "911 Carrera", "911 Carrera S", "911 GT3", "911 GT3 RS", "911 Turbo", "911 Turbo S", "Cayenne", "Cayenne Turbo", "Macan", "Panamera", "Taycan"],
  },
  {
    name: "Ram",
    models: ["1500", "2500", "3500", "ProMaster", "TRX"],
  },
  {
    name: "Rivian",
    models: ["R1S", "R1T", "R2", "R3"],
  },
  {
    name: "Rolls-Royce",
    models: ["Cullinan", "Ghost", "Phantom", "Phantom Extended", "Spectre", "Wraith"],
  },
  {
    name: "Saab",
    models: ["9-3", "9-5", "9-7X"],
  },
  {
    name: "Saturn",
    models: ["Aura", "Ion", "Sky", "Vue"],
  },
  {
    name: "Smart",
    models: ["EQ fortwo", "fortwo"],
  },
  {
    name: "Subaru",
    models: ["Ascent", "BRZ", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "WRX"],
  },
  {
    name: "Suzuki",
    models: ["Ciaz", "Jimny", "Swift", "Vitara"],
  },
  {
    name: "Tesla",
    models: ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y", "Roadster"],
  },
  {
    name: "Toyota",
    models: ["4Runner", "Camry", "Corolla", "GR Corolla", "GR Supra", "Highlander", "Land Cruiser", "RAV4", "Sequoia", "Sienna", "Tacoma", "Tundra", "Venza"],
  },
  {
    name: "VinFast",
    models: ["VF 6", "VF 7", "VF 8", "VF 9"],
  },
  {
    name: "Volkswagen",
    models: ["Arteon", "Atlas", "Golf", "Golf GTI", "ID.4", "ID.Buzz", "Jetta", "Passat", "Tiguan", "Touareg"],
  },
  {
    name: "Volvo",
    models: ["C40", "EX30", "EX90", "S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],
  },
];

export function getMakes(): string[] {
  return ALL_MAKES.map((m) => m.name);
}

export function getModels(make: string): string[] {
  const found = ALL_MAKES.find((m) => m.name === make);
  return found ? found.models : [];
}

export const PRICE_RANGES = [
  { label: "Under $15K", value: "0-15000" },
  { label: "$15K - $25K", value: "15000-25000" },
  { label: "$25K - $40K", value: "25000-40000" },
  { label: "$40K - $60K", value: "40000-60000" },
  { label: "$60K - $100K", value: "60000-100000" },
  { label: "$100K - $200K", value: "100000-200000" },
  { label: "$200K+", value: "200000+" },
];

export const YEARS = Array.from({ length: 40 }, (_, i) => (2028 - i).toString());
