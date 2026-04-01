"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useIsAdmin } from "@/hooks/use-is-admin";

export default function AdminPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { isAdmin, isLoading } = useIsAdmin();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      router.replace("/home");
    }
  }, [isAdmin, isLoading, router]);

  if (isLoading || isAdmin === null) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Verifying access...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="container-custom py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-primary">Admin Panel</h1>
          <p className="text-muted-foreground mb-8">
            Manage your application settings and content
          </p>

          {session?.user && (
            <div className="glass rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-primary mb-4">Welcome</h2>
              <p className="text-foreground/80">
                You are logged in as <span className="font-semibold">{session.user.name}</span> ({session.user.email})
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Users</h3>
              <p className="text-foreground/70 text-sm mb-4">
                Manage user accounts and permissions
              </p>
              <button className="text-sm py-2 px-4 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all">
                View Users
              </button>
            </div>

            <div className="glass rounded-lg p-6">
              <h3 className="text-lg font-semibold text-primary mb-3">Settings</h3>
              <p className="text-foreground/70 text-sm mb-4">
                Configure application settings
              </p>
              <button className="text-sm py-2 px-4 rounded-lg bg-accent text-white hover:bg-accent/90 transition-all">
                Configure
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
