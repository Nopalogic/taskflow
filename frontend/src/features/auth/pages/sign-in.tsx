"use client";

import { authClient } from "@/lib/auth-client";
import { SignInForm } from "../components/sign-in-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.replace("/u");
    }
  }, [router, session]);

  return <SignInForm />;
}
