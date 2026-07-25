const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\textarea.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";

import { cn } from "@/lib/utils";

 

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    _jsxDEV('textarea', {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      ),
      ref: ref,
      ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 9}, this
    )
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
