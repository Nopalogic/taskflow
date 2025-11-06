"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignUpForm } from "../components/sign-up-form";

export default function SignUpPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session) return router.replace("/u");
  }, [session, router]);

  return <SignUpForm />;
}
