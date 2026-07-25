const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\progress.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef


(({ className, value, ...props }, ref) => (
  _jsxDEV(ProgressPrimitive.Root, {
    ref: ref,
    className: cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className),
    ...props,
 children: 
    _jsxDEV(ProgressPrimitive.Indicator, {
      className: "h-full w-full flex-1 bg-primary transition-all"    ,
      style: { transform: `translateX(-${100 - (value || 0)}%)` },}, void 0, false, {fileName: _jsxFileName, lineNumber: 15}, this
    )
  }, void 0, false, {fileName: _jsxFileName, lineNumber: 10}, this)
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
