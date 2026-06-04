import { FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getCurrentStaffRole, signInStaff, signOutStaff } from "@/lib/repository";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const { error } = await signInStaff(email, password);
    if (error) {
      setLoading(false);
      toast({
        title: "Sign in failed",
        description: "Use a Supabase staff account with an admin or staff role.",
        variant: "destructive",
      });
      return;
    }

    const role = await getCurrentStaffRole();
    if (!role) {
      await signOutStaff();
      setLoading(false);
      toast({
        title: "Access denied",
        description: "This account is not assigned to the Jersey Auto Lease staff role table.",
        variant: "destructive",
      });
      return;
    }

    setAllowed(true);
    navigate("/admin", { replace: true });
  };

  if (allowed) return <Navigate to="/admin" replace />;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md glass-card rounded-2xl p-8">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
          <Lock className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-2">Staff Sign In</h1>
        <p className="text-muted-foreground mb-8">
          Admin data is protected. Sign in with a staff account configured in Supabase roles.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-email" className="text-sm font-medium mb-2 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="admin-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="pl-10 bg-secondary border-border"
              />
            </div>
          </div>
          <div>
            <label htmlFor="admin-password" className="text-sm font-medium mb-2 block">
              Password
            </label>
            <Input
              id="admin-password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="bg-secondary border-border"
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground">
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
}
