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

type UserData = {
  name: string;
  email: string;
  image?: string | null;
};

type NavUserProps = {
  user?: UserData;
};

/**
 * Extracts initials from a name.
 * e.g., "John Doe" -> "JD", "SingleName" -> "S"
 */
function getInitials(name: string): string {
  if (!name) return "";
  return name
    .toUpperCase()
    .split(" ")
    .splice(0, 2)
    .map((part) => part[0])
    .join("");
}

function UserSkeleton() {
  return (
    <div className="flex flex-1 items-center space-x-2">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <div className="grid flex-1 gap-1">
        <Skeleton className="h-3 w-[150px]" />
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
  );
}

function UserDisplay({ user }: { user: UserData }) {
  return (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={user.image || ""} alt={user.name} />
        <AvatarFallback className="rounded-lg">
          {getInitials(user.name)}
        </AvatarFallback>
      </Avatar>
      <div className="text-muted-foreground grid flex-1 text-start text-sm leading-tight">
        <span className="line-clamp-1 truncate font-semibold">{user.name}</span>
        <span className="line-clamp-1 truncate text-xs">{user.email}</span>
      </div>
    </>
  );
}

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
                    <UserDisplay user={user} />
                    <ChevronsUpDown className="ms-auto size-4" />
                  </>
                ) : (
                  <UserSkeleton />
                )}
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
                    <UserDisplay user={user} />
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

      <SignOutDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
