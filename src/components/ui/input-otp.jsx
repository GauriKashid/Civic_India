const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\input-otp.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";

const InputOTP = React.forwardRef(
  ({ className, containerClassName, ...props }, ref) => (
    _jsxDEV(OTPInput, {
      ref: ref,
      containerClassName: cn("flex items-center gap-2 has-[:disabled]:opacity-50", containerClassName),
      className: cn("disabled:cursor-not-allowed", className),
      ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 9}, this
    )
  ),
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef(
  ({ className, ...props }, ref) => _jsxDEV('div', { ref: ref, className: cn("flex items-center", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 20}, this ),
);
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = React.forwardRef


(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    _jsxDEV('div', {
      ref: ref,
      className: cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
        className,
      ),
      ...props,
 children: [
      char
      , hasFakeCaret && (
        _jsxDEV('div', { className: "pointer-events-none absolute inset-0 flex items-center justify-center"     , children: 
          _jsxDEV('div', { className: "animate-caret-blink h-4 w-px bg-foreground duration-1000"    ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 44}, this )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 43}, this)
      )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 32}, this)
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef(
  ({ ...props }, ref) => (
    _jsxDEV('div', { ref: ref, role: "separator", ...props, children: 
      _jsxDEV(Dot, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 55}, this )
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 54}, this)
  ),
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
