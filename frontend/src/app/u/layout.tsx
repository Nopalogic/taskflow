import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset
        className={cn(
          "@container/content",
          "has-data-[layout=fixed]:h-svh",
          "peer-data-[variant=inset]:has-data-[layout=fixed]:h-[calc(100svh-(var(--spacing)*4))]",
        )}
      >
        <header className="h-16 w-[inherit]">
          <div className="relative flex h-full items-center px-4">
            <SidebarTrigger variant="outline" className="max-md:scale-125" />
          </div>
        </header>
        <main className="px-4 pb-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
