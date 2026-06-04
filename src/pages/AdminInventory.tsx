import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus, Pencil, Trash2, Gauge, Calendar, MapPin, DollarSign,
  X, Search, ArrowLeft, Image as ImageIcon
} from "lucide-react";
import { Car as CarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { Car } from "@/lib/carStore";
import { getCars, addCar, updateCar, deleteCar, initCarStore } from "@/lib/carStore";
import { getMakes, getModels } from "@/lib/vehicleData";

const emptyForm: Omit<Car, "id"> = {
  title: "", make: "", model: "", year: new Date().getFullYear(),
  price: 0, mileage: 0, location: "", image: "",
  featured: false, goodRate: false, auction: false,
  transmission: "Automatic", fuelType: "Petrol",
};

type FormData = Omit<Car, "id">;

export default function AdminInventory() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [cars, setCars] = useState<Car[]>([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);

  const load = () => {
    initCarStore();
    setCars(getCars());
  };

  useEffect(() => { load(); }, []);

  const filtered = cars.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return c.title.toLowerCase().includes(q) ||
      c.make.toLowerCase().includes(q) ||
      c.model.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q);
  });

  const openAdd = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (car: Car) => {
    setForm({
      title: car.title, make: car.make, model: car.model,
      year: car.year, price: car.price, mileage: car.mileage,
      location: car.location, image: car.image,
      featured: car.featured || false, goodRate: car.goodRate || false,
      auction: car.auction || false,
      transmission: car.transmission || "Automatic",
      fuelType: car.fuelType || "Petrol",
    });
    setEditingId(car.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title || !form.make || !form.model || !form.price) {
      toast({ title: "Missing fields", description: "Title, Make, Model, and Price are required.", variant: "destructive" });
      return;
    }

    if (editingId) {
      updateCar(editingId, form);
      toast({ title: "✅ Updated", description: `${form.title} has been updated.` });
    } else {
      addCar(form);
      toast({ title: "✅ Added", description: `${form.title} has been added to inventory.` });
    }

    setShowForm(false);
    setEditingId(null);
    load();
  };

  const handleDelete = () => {
    if (!deleteId) return;
    const car = cars.find((c) => c.id === deleteId);
    deleteCar(deleteId);
    toast({ title: "🗑️ Deleted", description: `${car?.title || "Vehicle"} has been removed.` });
    setDeleteId(null);
    load();
  };

  const toggleBoolean = (key: "featured" | "goodRate" | "auction") => {
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")} className="text-muted-foreground">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold">Inventory Manager</h1>
              <p className="text-xs text-muted-foreground">{cars.length} vehicles</p>
            </div>
          </div>
          <Button onClick={openAdd} className="bg-champagne text-black hover:bg-champagne/90 gap-2">
            <Plus className="h-4 w-4" /> Add Vehicle
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title, make, model, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white/[0.03] border-white/10"
          />
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl overflow-hidden luxury-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left text-xs text-muted-foreground font-medium uppercase tracking-wider px-4 py-3">Vehicle</th>
                  <th className="text-left text-xs text-muted-foreground font-medium uppercase tracking-wider px-4 py-3 hidden md:table-cell">Make / Model</th>
                  <th className="text-left text-xs text-muted-foreground font-medium uppercase tracking-wider px-4 py-3 hidden md:table-cell">Year</th>
                  <th className="text-left text-xs text-muted-foreground font-medium uppercase tracking-wider px-4 py-3">Price</th>
                  <th className="text-left text-xs text-muted-foreground font-medium uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Mileage</th>
                  <th className="text-left text-xs text-muted-foreground font-medium uppercase tracking-wider px-4 py-3 hidden lg:table-cell">Location</th>
                  <th className="text-right text-xs text-muted-foreground font-medium uppercase tracking-wider px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((car) => (
                  <tr key={car.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-9 rounded-lg overflow-hidden shrink-0 bg-white/[0.05]">
                          <img src={car.image} alt={car.title} data-ci-make={car.make} data-ci-model={car.model} data-ci-year={car.year} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = ""; }} />
                        </div>
                        <div>
                          <Link to={`/vehicle/${car.id}`} className="text-sm font-medium hover:text-champagne transition-colors">
                            {car.title}
                          </Link>
                          <div className="flex gap-1.5 mt-0.5">
                            {car.featured && <Badge className="bg-champagne/20 text-champagne text-[10px] border-0">Featured</Badge>}
                            {car.auction && <Badge className="bg-red-500/20 text-red-400 text-[10px] border-0">Auction</Badge>}
                            {car.goodRate && <Badge className="bg-green-500/20 text-green-400 text-[10px] border-0">Good Rate</Badge>}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="text-sm">{car.make}</div>
                      <div className="text-xs text-muted-foreground">{car.model}</div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className="text-sm">{car.year}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-champagne">${car.price.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">{car.mileage.toLocaleString()} mi</span>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <span className="text-sm text-muted-foreground">{car.location}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(car)} className="h-8 w-8 text-muted-foreground hover:text-champagne">
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(car.id)} className="h-8 w-8 text-muted-foreground hover:text-red-400">
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <CarIcon className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground">
                {search ? "No vehicles match your search." : "No vehicles yet. Add your first one!"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-background border-white/10">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update the vehicle details below." : "Fill in the details to add a new vehicle to inventory."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4 py-4">
            {/* Title - full width */}
            <div className="col-span-2">
              <label className="text-xs text-muted-foreground block mb-1.5">Title *</label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. 2024 Ferrari SF90 Stradale" className="bg-white/[0.03] border-white/10" />
            </div>

            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Make *</label>
              <Select value={form.make} onValueChange={(v) => setForm({ ...form, make: v, model: "" })}>
                <SelectTrigger className="bg-white/[0.03] border-white/10">
                  <SelectValue placeholder="Select Make" />
                </SelectTrigger>
                <SelectContent>
                  {getMakes().map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Model *</label>
              <Select value={form.model} onValueChange={(v) => setForm({ ...form, model: v })} disabled={!form.make}>
                <SelectTrigger className="bg-white/[0.03] border-white/10">
                  <SelectValue placeholder={form.make ? "Select Model" : "Select Make First"} />
                </SelectTrigger>
                <SelectContent>
                  {getModels(form.make).map((m) => (
                    <SelectItem key={m} value={m}>{m}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Year</label>
              <Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 2024 })} className="bg-white/[0.03] border-white/10" />
            </div>

            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Price *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="number" value={form.price || ""} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })} className="pl-9 bg-white/[0.03] border-white/10" />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Mileage</label>
              <div className="relative">
                <Gauge className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="number" value={form.mileage || ""} onChange={(e) => setForm({ ...form, mileage: parseInt(e.target.value) || 0 })} className="pl-9 bg-white/[0.03] border-white/10" />
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-xs text-muted-foreground block mb-1.5">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Beverly Hills, CA" className="pl-9 bg-white/[0.03] border-white/10" />
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-xs text-muted-foreground block mb-1.5">Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://images.unsplash.com/..." className="pl-9 bg-white/[0.03] border-white/10" />
              </div>
            </div>

            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Transmission</label>
              <Select value={form.transmission || "Automatic"} onValueChange={(v) => setForm({ ...form, transmission: v })}>
                <SelectTrigger className="bg-white/[0.03] border-white/10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Automatic">Automatic</SelectItem>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Dual-Clutch">Dual-Clutch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs text-muted-foreground block mb-1.5">Fuel Type</label>
              <Select value={form.fuelType || "Petrol"} onValueChange={(v) => setForm({ ...form, fuelType: v })}>
                <SelectTrigger className="bg-white/[0.03] border-white/10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Petrol">Petrol</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Electric">Electric</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Badge toggles */}
            <div className="col-span-2 pt-2 border-t border-white/[0.06]">
              <label className="text-xs text-muted-foreground block mb-3">Badges</label>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleBoolean("featured")}
                  className={form.featured ? "bg-champagne/20 border-champagne/50 text-champagne" : "border-white/10 text-muted-foreground"}
                >
                  ★ Featured
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleBoolean("goodRate")}
                  className={form.goodRate ? "bg-green-500/20 border-green-500/50 text-green-400" : "border-white/10 text-muted-foreground"}
                >
                  ✓ Good Rate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleBoolean("auction")}
                  className={form.auction ? "bg-red-500/20 border-red-500/50 text-red-400" : "border-white/10 text-muted-foreground"}
                >
                  🔨 Auction
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-white/[0.06]">
            <Button variant="outline" onClick={() => setShowForm(false)} className="border-white/10">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-champagne text-black hover:bg-champagne/90">
              {editingId ? "Save Changes" : "Add Vehicle"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <DialogContent className="sm:max-w-[400px] bg-background border-white/10">
          <DialogHeader>
            <DialogTitle>Delete Vehicle</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteId(null)} className="border-white/10">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
