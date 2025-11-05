import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY } from "../constants/local-storage";
import { SignUpFormValues, SignUpSchema } from "../forms/sign-up";

export const useSignUpForm = () => {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const { error, data: authResponseData } = await authClient.signUp.email({
        name: data.name,
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

        toast.success(`Hello, ${authResponseData.user.name.split(" ")[0]}`, {
          description: "",
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
