"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignInForm } from "../components/sign-in-form";

export default function SignInPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session) return router.replace("/u");
  }, [session, router]);

  return <SignInForm />;
}
