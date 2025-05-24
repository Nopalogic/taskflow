import FormField from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { registerUser } from "@/services/auth";
import { useAuthStore } from "@/stores/auth";
import { registerSchema } from "@/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";

type FormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await registerUser(data);

      if (response.success) {
        toast({
          title: "Registration successfully!",
        });
        login(response.token, response.data);
        navigate("/u");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error instanceof Error ? error.message : "Register failed",
      });
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div>
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent>
              <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Create an account</h1>
                    <p className="text-balance text-muted-foreground">
                      Sign up to get started with TaskFlow
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <FormField id="first_name" label="First name">
                      <Input
                        id="first_name"
                        type="text"
                        className={cn({
                          "border-destructive": errors.first_name?.message,
                        })}
                        {...register("first_name")}
                      />
                      {errors.email?.message && (
                        <span className="text-xs text-destructive">
                          {errors.email.message}
                        </span>
                      )}
                    </FormField>
                    <FormField id="last_name" label="Last name">
                      <Input
                        id="last_name"
                        type="text"
                        className={cn({
                          "border-destructive": errors.last_name?.message,
                        })}
                        {...register("last_name")}
                      />
                      {errors.email?.message && (
                        <span className="text-xs text-destructive">
                          {errors.email.message}
                        </span>
                      )}
                    </FormField>
                  </div>
                  <FormField id="email" label="Email">
                    <Input
                      id="email"
                      type="text"
                      className={cn({
                        "border-destructive": errors.email?.message,
                      })}
                      {...register("email")}
                    />
                    {errors.email?.message && (
                      <span className="text-xs text-destructive">
                        {errors.email.message}
                      </span>
                    )}
                  </FormField>
                  <FormField id="password" label="Password">
                    <Input
                      id="password"
                      type="password"
                      className={cn({
                        "border-destructive": errors.password?.message,
                      })}
                      {...register("password")}
                    />
                    {errors.email?.message && (
                      <span className="text-xs text-destructive">
                        {errors.email.message}
                      </span>
                    )}
                  </FormField>
                  <FormField
                    id="password_confirmation"
                    label="Confirm password"
                  >
                    <Input
                      id="password_confirmation"
                      type="password"
                      className={cn({
                        "border-destructive":
                          errors.password_confirmation?.message,
                      })}
                      {...register("password_confirmation")}
                    />
                    {errors.email?.message && (
                      <span className="text-xs text-destructive">
                        {errors.email.message}
                      </span>
                    )}
                  </FormField>
                  <Button type="submit" className="w-full">
                    Create account
                  </Button>
                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                  <Button type="button" variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Sign up with Google</span>
                  </Button>
                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <a
                      href="/auth/login"
                      className="underline underline-offset-4"
                    >
                      Login
                    </a>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
