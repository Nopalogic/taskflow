"use client";

import { InputPassword } from "@/components/input-password";
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
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useSignInForm } from "../hooks/use-sign-in";

export function SignInForm() {
  const { form, onSubmit } = useSignInForm();

  return (
    <div className="w-full max-w-sm">
      <Card className="p-0">
        <CardContent className="p-0">
          <div className="flex max-w-md flex-col gap-4 p-6 md:p-8">
            <div className="mb-3 flex flex-col">
              <h1 className="text-2xl font-bold">Sign In</h1>
              <p className="text-muted-foreground space-x-1 text-sm text-balance">
                <span>Don&apos;t have an account?</span>
                <a
                  href="/auth/sign-up"
                  className="text-primary font-semibold underline-offset-4 hover:underline"
                >
                  Sign up
                </a>
              </p>
            </div>

            <Button variant="outline" className="w-full gap-3">
              <Image
                src="/icons/google-icon.svg"
                alt="google-icon"
                width={18}
                height={18}
              />
              Continue with Google
            </Button>

            <div className="flex w-full items-center justify-center overflow-hidden">
              <Separator />
              <span className="px-2 text-sm">OR</span>
              <Separator />
            </div>

            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className="gap-4">
                <Controller
                  name="email"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="grid gap-1"
                    >
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        placeholder="m@example.com"
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
                    <Field
                      data-invalid={fieldState.invalid}
                      className="grid gap-1"
                    >
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <InputPassword
                        {...field}
                        id={field.name}
                        placeholder="your password"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 w-full cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Signing in" : "Sign in"}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
