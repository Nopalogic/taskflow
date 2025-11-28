"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignInForm } from "../components/sign-in-form";

export default function SignUpPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/u");
    }
  }, [router, session]);

  return <SignInForm />;
}
