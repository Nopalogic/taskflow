import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Controller } from "react-hook-form";
import { useSignInForm } from "../hooks/use-sign-in";

export function SignInForm() {
  const { form, onSubmit } = useSignInForm();
  return (
    <div className="w-full max-w-sm">
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="flex flex-col gap-4 p-6 md:p-8">
            <h1 className="text-2xl font-bold">Welcome to Taskflow</h1>

            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="gap-3">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="m@example.com"
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="gap-1">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <Input
                        id="password"
                        type="password"
                        aria-invalid={fieldState.invalid}
                        placeholder="your password"
                        {...field}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <div className="grid text-right">
                <a href="#" className="text-primary text-xs font-medium">
                  Forgot password?
                </a>
              </div>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-background w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Signing in" : "Sign in"}
              </Button>
            </form>

            <div className="flex w-full items-center justify-center overflow-hidden">
              <Separator />
              <span className="px-2 text-sm">OR</span>
              <Separator />
            </div>

            <Button variant="outline" className="mb-3 w-full gap-3">
              <svg
                width="1.2em"
                height="1.2em"
                id="icon-google"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-lg inline-block shrink-0 align-sub text-inherit"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M15.6823 8.18368C15.6823 7.63986 15.6382 7.0931 15.5442 6.55811H7.99829V9.63876H12.3194C12.1401 10.6323 11.564 11.5113 10.7203 12.0698V14.0687H13.2983C14.8122 12.6753 15.6823 10.6176 15.6823 8.18368Z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M7.99812 16C10.1558 16 11.9753 15.2915 13.3011 14.0687L10.7231 12.0698C10.0058 12.5578 9.07988 12.8341 8.00106 12.8341C5.91398 12.8341 4.14436 11.426 3.50942 9.53296H0.849121V11.5936C2.2072 14.295 4.97332 16 7.99812 16Z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M3.50665 9.53295C3.17154 8.53938 3.17154 7.4635 3.50665 6.46993V4.4093H0.849292C-0.285376 6.66982 -0.285376 9.33306 0.849292 11.5936L3.50665 9.53295Z"
                    fill="#FBBC04"
                  ></path>
                  <path
                    d="M7.99812 3.16589C9.13867 3.14825 10.241 3.57743 11.067 4.36523L13.3511 2.0812C11.9048 0.723121 9.98526 -0.0235266 7.99812 -1.02057e-05C4.97332 -1.02057e-05 2.2072 1.70493 0.849121 4.40932L3.50648 6.46995C4.13848 4.57394 5.91104 3.16589 7.99812 3.16589Z"
                    fill="#EA4335"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="15.6825" height="16" fill="white"></rect>
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </Button>

            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="font-semibold underline-offset-4 hover:underline"
              >
                Sign up
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
