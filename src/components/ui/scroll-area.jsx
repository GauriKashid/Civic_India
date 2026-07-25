const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\scroll-area.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/lib/utils";

const ScrollArea = React.forwardRef


(({ className, children, ...props }, ref) => (
  _jsxDEV(ScrollAreaPrimitive.Root, { ref: ref, className: cn("relative overflow-hidden", className), ...props, children: [
    _jsxDEV(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]"  , children: children}, void 0, false, {fileName: _jsxFileName, lineNumber: 11}, this)
    , _jsxDEV(ScrollBar, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 12}, this )
    , _jsxDEV(ScrollAreaPrimitive.Corner, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 13}, this )
  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 10}, this)
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef


(({ className, orientation = "vertical", ...props }, ref) => (
  _jsxDEV(ScrollAreaPrimitive.ScrollAreaScrollbar, {
    ref: ref,
    orientation: orientation,
    className: cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className,
    ),
    ...props,
 children: 
    _jsxDEV(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this )
  }, void 0, false, {fileName: _jsxFileName, lineNumber: 22}, this)
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };
