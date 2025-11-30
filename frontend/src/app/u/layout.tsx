import MainLayout from "@/components/layout/main";
import { Dialogs } from "@/components/shared/Dialogs";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout>
      {children}
      <Dialogs />
    </MainLayout>
  );
}
