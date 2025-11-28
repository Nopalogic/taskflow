import MainLayout from "@/components/layout/main";
import { ProjectDialogs } from "@/features/project/components/dialogs";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainLayout>
      {children}
      <ProjectDialogs />
    </MainLayout>
  );
}
