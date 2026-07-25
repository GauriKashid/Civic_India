const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\badge.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";
import { cva, } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);



function Badge({ className, variant, ...props }) {
  return _jsxDEV('div', { className: cn(badgeVariants({ variant }), className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 26}, this );
}

export { Badge, badgeVariants };
