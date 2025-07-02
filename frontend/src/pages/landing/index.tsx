import { Footer } from "@/components/landing/footer";
import { Navbar } from "@/components/landing/navbar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <section className="px-4 pb-16 pt-12 md:px-6 md:pb-24">
          <div className="flex flex-col items-center gap-12 md:flex-row md:gap-16">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Manage tasks with ease
              </div>

              <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Stay organized,
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                  {" "}
                  deliver on time
                </span>
              </h1>

              <p className="mx-auto max-w-xl text-lg text-muted-foreground md:mx-0 md:text-xl">
                TaskFlow helps teams organize projects, align on priorities, and
                get more done together. Simplify your workflow today.
              </p>

              <div className="flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
                <Link to="/auth/register">
                  <Button size="lg" className="h-12 px-6">
                    Get Started
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-4 text-sm md:justify-start">
                {[
                  "No credit card required",
                  "Free 14-day trial",
                  "24/7 support",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex-1">
              <div className="relative z-10 overflow-hidden rounded-xl border shadow-2xl">
                <AppScreenshot />
              </div>
              <div
                className={cn(
                  "absolute inset-0 z-0 -rotate-3 scale-[0.96] rounded-xl bg-gradient-to-r from-primary/30 to-blue-400/30",
                  "dark:from-primary/20 dark:to-blue-400/20",
                )}
              />
            </div>
          </div>
        </section>
        {/* <Features /> */}
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        {/* <Newsletter /> */}
      </main>
      <Footer />
    </div>
  );
}

function AppScreenshot() {
  return (
    <div className="bg-background">
      <div className="flex h-10 items-center gap-2 border-b bg-muted/80 px-4">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
      </div>
      <div className="grid h-[360px] grid-cols-4 md:h-[400px]">
        {/* Sidebar */}
        <div className="col-span-1 border-r bg-muted/30 p-3">
          <div className="space-y-2">
            <div className="h-8 rounded-md bg-primary/10" />
            <div className="h-6 w-4/5 rounded-md bg-muted-foreground/10" />
            <div className="h-6 w-3/4 rounded-md bg-muted-foreground/10" />
            <div className="h-6 w-5/6 rounded-md bg-muted-foreground/10" />
            <div className="pt-4">
              <div className="mb-3 h-1 w-full rounded-md bg-muted-foreground/10" />
              <div className="h-6 w-1/2 rounded-md bg-muted-foreground/10" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="col-span-3 p-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="h-8 w-1/3 rounded-md bg-primary/10" />
              <div className="h-8 w-1/4 rounded-md bg-muted-foreground/10" />
            </div>

            <div className="grid gap-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-sm border bg-primary/10" />
                    <div className="h-5 w-[140px] rounded-md bg-muted-foreground/10" />
                  </div>
                  <div className="h-5 w-[60px] rounded-md bg-muted-foreground/10" />
                </div>
              ))}

              <div className="flex items-center justify-between rounded-lg border border-primary/30 bg-primary/5 p-3">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-sm border bg-primary/20" />
                  <div className="h-5 w-[160px] rounded-md bg-primary/15" />
                </div>
                <div className="h-5 w-[80px] rounded-md bg-primary/15" />
              </div>

              {[5, 6].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-4 rounded-sm border bg-muted-foreground/10" />
                    <div className="h-5 w-[120px] rounded-md bg-muted-foreground/10" />
                  </div>
                  <div className="h-5 w-[70px] rounded-md bg-muted-foreground/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
