"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Controller } from "react-hook-form";
import { useSignUpForm } from "../hooks/use-sign-up";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { InputPassword } from "@/components/ui/input-password";

export function SignUpForm() {
  const { form, onSubmit } = useSignUpForm();
  return (
    <div className="w-full max-w-sm md:max-w-4xl">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="flex max-w-md flex-col gap-4 p-6 md:p-8">
            <div className="mb-3 flex flex-col">
              <h1 className="text-2xl font-bold">Sign Up</h1>
              <p className="text-muted-foreground space-x-1 text-sm text-balance">
                <span>Already have an account?</span>
                <a
                  href="/auth/sign-in"
                  className="text-primary font-semibold underline-offset-4 hover:underline"
                >
                  Sign in
                </a>
              </p>
            </div>

            <Button variant="outline" className="w-full gap-3">
              <Image
                src="/icons/google.svg"
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
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="grid gap-1"
                    >
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="text"
                        placeholder="your name"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
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
                {form.formState.isSubmitting ? "Signing up" : "Sign up"}
              </Button>
            </form>
          </div>

          <div>
            <div className="bg-primary h-full w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
