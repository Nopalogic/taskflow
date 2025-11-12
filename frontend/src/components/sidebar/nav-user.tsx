import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { SignOutDialog } from "@/features/auth/components/sign-out-dialog";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";

type NavUserProps = {
  user?: {
    name: string;
    email: string;
    image?: string | null;
  };
};

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();
  const [open, setOpen] = useState(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                {user ? (
                  <>
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.image || ""} alt={user.name} />
                      <AvatarFallback className="rounded-lg">
                        {user.name.split(" ").map((name) => name[0])}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-muted-foreground grid flex-1 text-start text-sm leading-tight">
                      <span className="line-clamp-1 truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="line-clamp-1 truncate text-xs">
                        {user.email}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <div className="grid flex-1 gap-1">
                      <Skeleton className="h-3 w-[150px]" />
                      <Skeleton className="h-3 w-[100px]" />
                    </div>
                  </div>
                )}
                <ChevronsUpDown className="ms-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            {user && (
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage src={user.image || ""} alt={user.name} />
                      <AvatarFallback className="rounded-lg">
                        {user.name.split(" ").map((name) => name[0])}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-muted-foreground grid flex-1 text-start text-sm leading-tight">
                      <span className="line-clamp-1 truncate font-semibold">
                        {user.name}
                      </span>
                      <span className="line-clamp-1 truncate text-xs">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setOpen(true)}
                >
                  <LogOut />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <SignOutDialog open={!!open} onOpenChange={setOpen} />
    </>
  );
}
