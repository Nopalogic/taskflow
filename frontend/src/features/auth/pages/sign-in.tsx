"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SignInForm } from "../components/sign-in-form";

export default function SignUpPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.replace("/u");
    }
  }, [router, session]);

  return <SignInForm />;
}
