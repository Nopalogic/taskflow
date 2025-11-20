"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ElementType } from "react";

export function NavItems({
  title,
  items,
}: {
  title?: React.ReactNode;
  items: {
    title: string;
    url: string;
    icon: ElementType;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`;

          return (
            <SidebarMenuItem key={key}>
              <SidebarMenuButton
                asChild
                isActive={checkIsActive(pathname, item.url)}
                tooltip={item.title}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function checkIsActive(href: string, url: string) {
  return (
    href === url || // /endpint?search=param
    href.split("?")[0] === url // endpoint
  );
}
