"use client";

import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import React from "react";

import { Input, type InputProps } from "~/components/ui/input";

import { cn } from "~/lib/utils";

const InputPassword = React.forwardRef<
  HTMLInputElement,
  InputProps & {
    eyeClassName?: string;
    eyeType?: "hold" | "click";
  }
>(({ className, eyeClassName, eyeType = "hold", ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        ref={ref}
        className={cn("pr-10", className)}
        {...props}
      />
      <span
        className={cn(
          eyeClassName,
          "absolute right-0 top-2/4 -translate-y-2/4 pr-2",
        )}
        {...(eyeType === "click" && {
          onClick: () => setShowPassword((prev) => !prev),
        })}
        {...(eyeType === "hold" && {
          onMouseDown: () => setShowPassword(true),
          onMouseUp: () => setShowPassword(false),
          onMouseLeave: () => setShowPassword(false),
        })}
      >
        {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
      </span>
    </div>
  );
});
InputPassword.displayName = "InputPassword";

export { InputPassword };
