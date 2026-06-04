// Vehicle makes — only Honda, Mazda, Toyota 2026

export interface VehicleMake {
  name: string;
  models: string[];
}

export const ALL_MAKES: VehicleMake[] = [
  {
    name: "Honda",
    models: ["Accord", "Civic", "CR-V", "HR-V", "Odyssey", "Passport", "Pilot", "Ridgeline"],
  },
  {
    name: "Mazda",
    models: ["CX-30", "CX-5", "CX-50", "CX-70", "CX-90", "Mazda3", "MX-5 Miata"],
  },
  {
    name: "Toyota",
    models: ["4Runner", "Camry", "Corolla", "Grand Highlander", "Highlander", "Land Cruiser", "RAV4", "Sienna", "Tacoma", "Tundra"],
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
];

export const YEARS = ["2026"];
