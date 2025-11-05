import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY } from "../constants/local-storage";
import { SignInFormValues, SignInSchema } from "../forms/sign-in";

export const useSignInForm = () => {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const { error, data: authResponseData } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      if (error?.code) {
        toast.error(error.message);
        return;
      }

      if (authResponseData?.token) {
        localStorage.setItem(
          LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY,
          authResponseData.token,
        );

        toast.success("Welcome back!", {
          description: `It's great to see you again, ${authResponseData.user.name.split(" ")[0]}`,
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Oops... Something went wrong!", {
        description:
          "There seems to be a problem on our end. Please try again later.",
      });
    }
  };

  return { form, onSubmit };
};
