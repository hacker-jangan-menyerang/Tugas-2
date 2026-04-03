"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AccessDeniedPage() {
  const router = useRouter();

  useEffect(() => {
    toast.error("Access denied. Admin only area.", {
      style: {
        border: "1px solid #9f1239",
        padding: "16px",
        color: "#9f1239",
        background: "#fff1f2",
      },
      iconTheme: {
        primary: "#be123c",
        secondary: "#ffe4e6",
      },
    });
    router.replace("/home");
  }, [router]);

  return null;
}
