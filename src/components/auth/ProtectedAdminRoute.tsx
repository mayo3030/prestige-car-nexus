import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getCurrentStaffRole } from "@/lib/repository";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

export function ProtectedAdminRoute({ children }: ProtectedAdminRouteProps) {
  const [status, setStatus] = useState<"checking" | "allowed" | "blocked">("checking");

  useEffect(() => {
    let mounted = true;

    getCurrentStaffRole()
      .then((role) => {
        if (mounted) setStatus(role ? "allowed" : "blocked");
      })
      .catch(() => {
        if (mounted) setStatus("blocked");
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-sm uppercase tracking-wider text-primary mb-2">Staff Access</div>
          <h1 className="text-2xl font-display font-bold">Checking credentials</h1>
        </div>
      </div>
    );
  }

  if (status === "blocked") {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
