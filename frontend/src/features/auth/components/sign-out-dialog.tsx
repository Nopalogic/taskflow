import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY } from "../constants/local-storage";

interface SignOutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          localStorage.setItem(LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY, "");
          router.replace("/auth/sign-in");
        },
      },
    });
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
