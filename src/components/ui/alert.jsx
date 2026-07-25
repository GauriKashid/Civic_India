const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\alert.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";
import { cva, } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const Alert = React.forwardRef


(({ className, variant, ...props }, ref) => (
  _jsxDEV('div', { ref: ref, role: "alert", className: cn(alertVariants({ variant }), className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 25}, this )
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('h5', { ref: ref, className: cn("mb-1 font-medium leading-none tracking-tight", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 31}, this )
  ),
);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('div', { ref: ref, className: cn("text-sm [&_p]:leading-relaxed", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this )
  ),
);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
