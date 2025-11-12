"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const router = useRouter();
  const { data: authData } = authClient.useSession();

  useEffect(() => {
    if (!authData) {
      router.replace("/auth/sign-in");
    }
  }, [router, authData]);

  return <h1>Hello, {authData?.user.name}</h1>;
}
