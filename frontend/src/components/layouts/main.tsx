import { HTMLAttributes, Ref } from "react";
import { cn } from "@/lib/utils";

interface MainProps extends HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: Ref<HTMLElement>;
}

export const Main = ({ fixed, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        "peer-[.header-fixed]/header:mt-16",
        "px-4 py-6",
        fixed && "fixed-main flex flex-grow flex-col overflow-hidden",
      )}
      {...props}
    />
  );
};

Main.displayName = "Main";
