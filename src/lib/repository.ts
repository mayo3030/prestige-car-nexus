import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import {
  auctionOpportunities,
  filterVehicles,
  type AuctionOpportunity,
  type Vehicle,
  vehicles,
} from "@/lib/business-data";

export interface VehicleFilters {
  search?: string;
  make?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
  limit?: number;
  offset?: number;
}

export interface LeadPayload {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  lead_type: string;
  subject?: string;
  vehicle_interest?: string;
  message?: string;
  priority?: "low" | "normal" | "high" | "urgent";
  metadata?: Json;
}

export interface SellSubmissionPayload {
  make: string;
  model: string;
  year: number;
  mileage: number;
  vin?: string;
  exterior_color?: string;
  interior_color?: string;
  transmission?: string;
  description?: string;
  listing_type: "fixed_price" | "auction";
  asking_price: number;
  location: string;
  seller_name: string;
  seller_email: string;
  seller_phone?: string;
}

export interface FinanceApplicationPayload {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  vehicle_price: number;
  down_payment: number;
  loan_term_months: number;
  interest_rate: number;
  requested_vehicle?: string;
  metadata?: Json;
}

export interface AdminRecord {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  created_at: string;
  priority?: string;
}

export interface AdminSnapshot {
  activeConversations: number;
  openTickets: number;
  urgentTickets: number;
  totalCustomers: number;
  leads: AdminRecord[];
  tickets: AdminRecord[];
  sellSubmissions: AdminRecord[];
  financeApplications: AdminRecord[];
}

type VehicleRow = {
  id: string;
  stock_number: string;
  slug: string;
  title: string;
  make: string;
  model: string;
  year: number;
  vehicle_type: string;
  status: string;
  price: number;
  monthly_payment: number | null;
  down_payment: number | null;
  lease_term_months: number | null;
  mileage: number;
  location: string;
  vin: string | null;
  exterior_color: string | null;
  interior_color: string | null;
  transmission: string | null;
  fuel_type: string | null;
  drivetrain: string | null;
  image_url: string | null;
  description: string | null;
  features: string[] | null;
  history_report: Record<string, unknown> | null;
  is_featured: boolean | null;
};

function normalizeVehicle(row: VehicleRow): Vehicle {
  const fallback = vehicles.find((vehicle) => vehicle.slug === row.slug || vehicle.stockNumber === row.stock_number);
  const history = row.history_report ?? {};

  return {
    id: row.slug || row.id,
    stockNumber: row.stock_number,
    slug: row.slug,
    title: row.title,
    make: row.make,
    model: row.model,
    year: row.year,
    type: (row.vehicle_type as Vehicle["type"]) || "sedan",
    status: (row.status as Vehicle["status"]) || "available",
    price: row.price,
    monthlyPayment: row.monthly_payment ?? undefined,
    downPayment: row.down_payment ?? undefined,
    leaseTermMonths: row.lease_term_months ?? undefined,
    mileage: row.mileage,
    location: row.location,
    vin: row.vin ?? undefined,
    exteriorColor: row.exterior_color ?? undefined,
    interiorColor: row.interior_color ?? undefined,
    transmission: row.transmission ?? "Automatic",
    fuelType: row.fuel_type ?? "Gasoline",
    drivetrain: row.drivetrain ?? undefined,
    image: row.image_url || fallback?.image || vehicles[0].image,
    images: fallback?.images ?? [row.image_url || vehicles[0].image],
    featured: Boolean(row.is_featured),
    description: row.description || fallback?.description || "Broker-sourced vehicle with Jersey Auto Lease support.",
    features: row.features ?? fallback?.features ?? [],
    historyReports: {
      accidents: Number(history.accidents ?? fallback?.historyReports.accidents ?? 0),
      owners: Number(history.owners ?? fallback?.historyReports.owners ?? 0),
      serviceRecords: Number(history.serviceRecords ?? fallback?.historyReports.serviceRecords ?? 0),
      titleStatus: String(history.titleStatus ?? fallback?.historyReports.titleStatus ?? "Clean"),
    },
  };
}

function paginate<T>(items: T[], limit?: number, offset = 0) {
  if (!limit) return items;
  return items.slice(offset, offset + limit);
}

export async function getVehicles(filters: VehicleFilters = {}) {
  try {
    let query = supabase.from("vehicles").select("*").eq("status", "available");

    if (filters.make && filters.make !== "all") query = query.eq("make", filters.make);
    if (filters.type && filters.type !== "all") query = query.eq("vehicle_type", filters.type);
    if (filters.minPrice) query = query.gte("price", filters.minPrice);
    if (filters.maxPrice) query = query.lte("price", filters.maxPrice);
    if (filters.search) {
      const term = `%${filters.search}%`;
      query = query.or(`title.ilike.${term},make.ilike.${term},model.ilike.${term},stock_number.ilike.${term}`);
    }

    const order =
      filters.sort === "price-low"
        ? { column: "price", ascending: true }
        : filters.sort === "price-high"
          ? { column: "price", ascending: false }
          : filters.sort === "mileage"
            ? { column: "mileage", ascending: true }
            : { column: "year", ascending: false };

    const { data, error } = await query.order(order.column, { ascending: order.ascending });
    if (error || !data?.length) throw error ?? new Error("No Supabase vehicles returned");
    return paginate(data.map((row) => normalizeVehicle(row as VehicleRow)), filters.limit, filters.offset);
  } catch {
    return paginate(filterVehicles(vehicles, filters), filters.limit, filters.offset);
  }
}

export async function getVehicleById(id: string) {
  try {
    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .or(`slug.eq.${id},stock_number.eq.${id},id.eq.${id}`)
      .maybeSingle();

    if (error || !data) throw error ?? new Error("Vehicle not found");
    return normalizeVehicle(data as VehicleRow);
  } catch {
    return vehicles.find((vehicle) => vehicle.id === id || vehicle.slug === id || vehicle.stockNumber === id) ?? null;
  }
}

export async function getFeaturedVehicles(limit = 6) {
  const list = await getVehicles({ limit: 24 });
  return list.filter((vehicle) => vehicle.featured).slice(0, limit);
}

export function getAuctionOpportunities() {
  return auctionOpportunities;
}

export function getAuctionOpportunity(id: string): AuctionOpportunity | null {
  return auctionOpportunities.find((auction) => auction.id === id) ?? null;
}

export async function createLead(payload: LeadPayload) {
  const { data, error } = await supabase
    .from("leads")
    .insert({
      source: "website",
      status: "new",
      priority: payload.priority ?? "normal",
      ...payload,
    })
    .select("id")
    .maybeSingle();

  if (error) {
    return { id: `demo-lead-${Date.now()}`, persisted: false };
  }

  return { id: data?.id ?? `lead-${Date.now()}`, persisted: true };
}

export async function createSellSubmission(payload: SellSubmissionPayload) {
  const { data, error } = await supabase.from("sell_submissions").insert(payload).select("id").maybeSingle();
  if (error) return { id: `demo-sell-${Date.now()}`, persisted: false };
  return { id: data?.id ?? `sell-${Date.now()}`, persisted: true };
}

export async function createFinanceApplication(payload: FinanceApplicationPayload) {
  const { data, error } = await supabase
    .from("finance_applications")
    .insert({ status: "new", ...payload })
    .select("id")
    .maybeSingle();

  if (error) return { id: `demo-finance-${Date.now()}`, persisted: false };
  return { id: data?.id ?? `finance-${Date.now()}`, persisted: true };
}

export async function createAppointment(payload: {
  first_name: string;
  last_name?: string;
  email: string;
  phone?: string;
  appointment_type: string;
  notes?: string;
}) {
  const { data, error } = await supabase
    .from("appointments")
    .insert({ status: "requested", ...payload })
    .select("id")
    .maybeSingle();

  if (error) return { id: `demo-appointment-${Date.now()}`, persisted: false };
  return { id: data?.id ?? `appointment-${Date.now()}`, persisted: true };
}

export async function getCurrentStaffRole() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.from("roles").select("role").eq("user_id", session.user.id).limit(1).maybeSingle();
  if (error || !data) return null;
  return data.role as "admin" | "staff";
}

export async function signInStaff(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOutStaff() {
  return supabase.auth.signOut();
}

function toAdminRecord(record: Record<string, unknown>, fallbackTitle: string): AdminRecord {
  const first = String(record.first_name ?? record.seller_name ?? "").trim();
  const last = String(record.last_name ?? "").trim();
  const name = `${first} ${last}`.trim();
  return {
    id: String(record.id ?? crypto.randomUUID()),
    title: String((record.subject ?? record.title ?? record.ticket_number ?? name) || fallbackTitle),
    subtitle: String(record.email ?? record.seller_email ?? record.vehicle_interest ?? record.description ?? "No details"),
    status: String(record.status ?? "new"),
    priority: record.priority ? String(record.priority) : undefined,
    created_at: String(record.created_at ?? new Date().toISOString()),
  };
}

export async function getAdminSnapshot(): Promise<AdminSnapshot> {
  const empty: AdminSnapshot = {
    activeConversations: 0,
    openTickets: 0,
    urgentTickets: 0,
    totalCustomers: 0,
    leads: [],
    tickets: [],
    sellSubmissions: [],
    financeApplications: [],
  };

  try {
    const [leadsRes, ticketsRes, sellRes, financeRes, conversationsRes] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(25),
      supabase.from("tickets").select("*").order("created_at", { ascending: false }).limit(25),
      supabase.from("sell_submissions").select("*").order("created_at", { ascending: false }).limit(25),
      supabase.from("finance_applications").select("*").order("created_at", { ascending: false }).limit(25),
      supabase.from("conversations").select("id,status").eq("status", "active"),
    ]);

    if (leadsRes.error || ticketsRes.error || sellRes.error || financeRes.error || conversationsRes.error) {
      return empty;
    }

    const tickets = ticketsRes.data ?? [];

    return {
      activeConversations: conversationsRes.data?.length ?? 0,
      openTickets: tickets.filter((ticket) => ["new", "open", "in_progress"].includes(String(ticket.status))).length,
      urgentTickets: tickets.filter((ticket) => ["urgent", "high"].includes(String(ticket.priority))).length,
      totalCustomers: new Set((leadsRes.data ?? []).map((lead) => lead.email)).size,
      leads: (leadsRes.data ?? []).map((lead) => toAdminRecord(lead, "Lead")),
      tickets: tickets.map((ticket) => toAdminRecord(ticket, "Ticket")),
      sellSubmissions: (sellRes.data ?? []).map((submission) =>
        toAdminRecord(
          {
            ...submission,
            title: `${submission.year ?? ""} ${submission.make ?? ""} ${submission.model ?? ""}`.trim(),
          },
          "Sell submission",
        ),
      ),
      financeApplications: (financeRes.data ?? []).map((application) =>
        toAdminRecord({ ...application, title: `Finance request: $${application.vehicle_price ?? 0}` }, "Finance request"),
      ),
    };
  } catch {
    return empty;
  }
}
