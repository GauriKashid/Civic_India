const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\card.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  _jsxDEV('div', { ref: ref, className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 6}, this )
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('div', { ref: ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 12}, this )
  ),
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('h3', { ref: ref, className: cn("text-2xl font-semibold leading-none tracking-tight", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 19}, this )
  ),
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('p', { ref: ref, className: cn("text-sm text-muted-foreground", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 26}, this )
  ),
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(
  ({ className, ...props }, ref) => _jsxDEV('div', { ref: ref, className: cn("p-6 pt-0", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 32}, this ),
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('div', { ref: ref, className: cn("flex items-center p-6 pt-0", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this )
  ),
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
