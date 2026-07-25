const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\menubar.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const MenubarMenu = MenubarPrimitive.Menu;

const MenubarGroup = MenubarPrimitive.Group;

const MenubarPortal = MenubarPrimitive.Portal;

const MenubarSub = MenubarPrimitive.Sub;

const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(MenubarPrimitive.Root, {
    ref: ref,
    className: cn("flex h-10 items-center space-x-1 rounded-md border bg-background p-1", className),
    ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 21}, this
  )
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(MenubarPrimitive.Trigger, {
    ref: ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      className,
    ),
    ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this
  )
));
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef




(({ className, inset, children, ...props }, ref) => (
  _jsxDEV(MenubarPrimitive.SubTrigger, {
    ref: ref,
    className: cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[state=open]:bg-accent data-[state=open]:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    ),
    ...props,
 children: [
    children
    , _jsxDEV(ChevronRight, { className: "ml-auto h-4 w-4"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 60}, this )
  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 50}, this)
));
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(MenubarPrimitive.SubContent, {
    ref: ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    ),
    ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 69}, this
  )
));
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef


(({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => (
  _jsxDEV(MenubarPrimitive.Portal, { children: 
    _jsxDEV(MenubarPrimitive.Content, {
      ref: ref,
      align: align,
      alignOffset: alignOffset,
      sideOffset: sideOffset,
      className: cn(
        "z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className,
      ),
      ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 85}, this
    )
  }, void 0, false, {fileName: _jsxFileName, lineNumber: 84}, this)
));
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef




(({ className, inset, ...props }, ref) => (
  _jsxDEV(MenubarPrimitive.Item, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      inset && "pl-8",
      className,
    ),
    ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 106}, this
  )
));
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef


(({ className, children, checked, ...props }, ref) => (
  _jsxDEV(MenubarPrimitive.CheckboxItem, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    ),
    checked: checked,
    ...props,
 children: [
    _jsxDEV('span', { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"      , children: 
      _jsxDEV(MenubarPrimitive.ItemIndicator, { children: 
        _jsxDEV(Check, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 133}, this )
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 132}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 131}, this)
    , children
  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 122}, this)
));
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef


(({ className, children, ...props }, ref) => (
  _jsxDEV(MenubarPrimitive.RadioItem, {
    ref: ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 focus:bg-accent focus:text-accent-foreground",
      className,
    ),
    ...props,
 children: [
    _jsxDEV('span', { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center"      , children: 
      _jsxDEV(MenubarPrimitive.ItemIndicator, { children: 
        _jsxDEV(Circle, { className: "h-2 w-2 fill-current"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 155}, this )
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 154}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 153}, this)
    , children
  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 145}, this)
));
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef




(({ className, inset, ...props }, ref) => (
  _jsxDEV(MenubarPrimitive.Label, {
    ref: ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 169}, this
  )
));
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef


(({ className, ...props }, ref) => (
  _jsxDEV(MenubarPrimitive.Separator, { ref: ref, className: cn("-mx-1 my-1 h-px bg-muted", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 181}, this )
));
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = ({ className, ...props }) => {
  return _jsxDEV('span', { className: cn("ml-auto text-xs tracking-widest text-muted-foreground", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 186}, this );
};
MenubarShortcut.displayname = "MenubarShortcut";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};
