const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\checkbox.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(CheckboxPrimitive.Root, {
    ref: ref,
    className: cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className,
    ),
    ...props,
 children: 
    _jsxDEV(CheckboxPrimitive.Indicator, { className: cn("flex items-center justify-center text-current"), children: 
      _jsxDEV(Check, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 20}, this )
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 19}, this)
  }, void 0, false, {fileName: _jsxFileName, lineNumber: 11}, this)
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
