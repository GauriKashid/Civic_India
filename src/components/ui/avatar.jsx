const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\avatar.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(AvatarPrimitive.Root, {
    ref: ref,
    className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
    ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 10}, this
  )
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(AvatarPrimitive.Image, { ref: ref, className: cn("aspect-square h-full w-full", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 22}, this )
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(AvatarPrimitive.Fallback, {
    ref: ref,
    className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
    ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 30}, this
  )
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
