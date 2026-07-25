const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\NavLink.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { NavLink as RouterNavLink, } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";







const NavLink = forwardRef(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      _jsxDEV(RouterNavLink, {
        ref: ref,
        to: to,
        className: ({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        ,
        ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 14}, this
      )
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
