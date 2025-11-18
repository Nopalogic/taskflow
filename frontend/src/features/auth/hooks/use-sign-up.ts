import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY } from "../constants/local-storage";
import { SignUpFormValues, SignUpSchema } from "../forms/sign-up";
import { useWorkspaceStore } from "@/features/workspace/stores/use-workspace";

export const useSignUpForm = () => {
  const { initializeUserWorkspace } = useWorkspaceStore();

  const form = useForm<SignUpFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(SignUpSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const { error, data: authResponseData } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      // handle auth errors
      if (error?.status) {
        toast.error("Email already registered", {
          description: "It seems you already have an account. Please sign in.",
        });

        return;
      }

      if (authResponseData?.token) {
        localStorage.setItem(
          LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY,
          authResponseData.token,
        );

        await initializeUserWorkspace();

        toast.success(`Hello, ${authResponseData.user.name.split(" ")[0]}`, {
          description: "We're glad you're here.",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Oops.. Something went wrong.", {
        description: "Please try again in a few moments",
      });
    }
  };

  return { form, onSubmit };
};
