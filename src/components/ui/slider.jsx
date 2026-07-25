const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\slider.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(SliderPrimitive.Root, {
    ref: ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
 children: [
    _jsxDEV(SliderPrimitive.Track, { className: "relative h-2 w-full grow overflow-hidden rounded-full bg-secondary"      , children: 
      _jsxDEV(SliderPrimitive.Range, { className: "absolute h-full bg-primary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 16}, this )
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 15}, this)
    , _jsxDEV(SliderPrimitive.Thumb, { className: "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"              ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 18}, this )
  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 10}, this)
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
