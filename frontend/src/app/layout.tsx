import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Taskflow",
  description: "Task Management Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              info: "backdrop-blur-sm !border-sky-600/20 !bg-sky-200/70 dark:!bg-sky-400/10 !text-sky-500 [&_svg]:!text-sky-500 [&>*>_svg]:!text-sky-500",
              success:
                "backdrop-blur-sm !border-green-600/20 !bg-green-200/70 dark:!bg-green-400/10 !text-green-500 [&_svg]:!text-green-500 [&>*>_svg]:!text-green-500",
              warning:
                "backdrop-blur-sm !border-amber-600/20 !bg-amber-200/70 dark:!bg-amber-400/10 !text-amber-500 [&_svg]:!text-amber-500 [&>*>_svg]:!text-amber-500",
              error:
                "backdrop-blur-sm !border-red-600/20 !bg-red-200/70 dark:!bg-red-400/10 !text-red-500 [&_svg]:!text-red-500 [&>*>_svg]:!text-red-500",
            },
          }}
        />
      </body>
    </html>
  );
}
