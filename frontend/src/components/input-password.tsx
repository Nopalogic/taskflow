import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

function InputPassword({ className, ...props }: React.ComponentProps<"input">) {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  return (
    <div
      className={cn(
        "flex items-center",
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent pr-3 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px]",
        "has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40 has-aria-invalid:border-destructive",
        className,
      )}
    >
      <input
        type={showPassword ? "text" : "password"}
        data-slot="input"
        className="placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground h-9 w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        {...props}
      />
      <button
        type="button"
        className="text-muted-foreground"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

export { InputPassword };
