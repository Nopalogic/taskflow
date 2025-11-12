"use client";

import { authClient } from "@/lib/auth-client";
import { SignUpForm } from "../components/sign-up-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session) {
      router.replace("/u");
    }
  }, [router, session]);

  return <SignUpForm />;
}
