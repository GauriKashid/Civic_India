const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\select.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef


(({ className, children, ...props }, ref) => (
  _jsxDEV(SelectPrimitive.Trigger, {
    ref: ref,
    className: cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    ),
    ...props,
 children: [
    children
    , _jsxDEV(SelectPrimitive.Icon, { asChild: true, children: 
      _jsxDEV(ChevronDown, { className: "h-4 w-4 opacity-50"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 27}, this )
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 26}, this)
  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 17}, this)
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(SelectPrimitive.ScrollUpButton, {
    ref: ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
 children: 
    _jsxDEV(ChevronUp, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this )
  }, void 0, false, {fileName: _jsxFileName, lineNumber: 37}, this)
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(SelectPrimitive.ScrollDownButton, {
    ref: ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
 children: 
    _jsxDEV(ChevronDown, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 56}, this )
  }, void 0, false, {fileName: _jsxFileName, lineNumber: 51}, this)
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef


(({ className, children, position = "popper", ...props }, ref) => (
  _jsxDEV(SelectPrimitive.Portal, { children: 
    _jsxDEV(SelectPrimitive.Content, {
      ref: ref,
      className: cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      ),
      position: position,
      ...props,
 children: [
      _jsxDEV(SelectScrollUpButton, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 77}, this )
      , _jsxDEV(SelectPrimitive.Viewport, {
        className: cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        ),
 children: 
        children
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 78}, this)
      , _jsxDEV(SelectScrollDownButton, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 87}, this )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 66}, this)
  }, void 0, false, {fileName: _jsxFileName, lineNumber: 65}, this)
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(SelectPrimitive.Label, { ref: ref, className: cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 97}, this )
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef


(({ className, children, ...props }, ref) => (
  _jsxDEV(SelectPrimitive.Item, {
    ref: ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    ),
    ...props,
 children: [
    _jsxDEV('span', { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"      , children: 
      _jsxDEV(SelectPrimitive.ItemIndicator, { children: 
        _jsxDEV(Check, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 115}, this )
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 114}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 113}, this)

    , _jsxDEV(SelectPrimitive.ItemText, { children: children}, void 0, false, {fileName: _jsxFileName, lineNumber: 119}, this)
  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 105}, this)
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(SelectPrimitive.Separator, { ref: ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 128}, this )
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
