import { ConfirmDialog } from "@/components/confirm-dialog";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY } from "../constants/local-storage";

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const handleSignOut = () => {
    localStorage.setItem(LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY, "");
    authClient.signOut();
    redirect("/auth/sign-in");
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Sign out"
      desc="Are you sure you want to sign out? You will need to sign in again to access your account."
      confirmText="Sign out"
      destructive
      handleConfirm={handleSignOut}
      className="sm:max-w-sm"
    />
  );
}
