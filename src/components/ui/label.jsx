const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\label.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(LabelPrimitive.Root, { ref: ref, className: cn(labelVariants(), className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 13}, this )
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
