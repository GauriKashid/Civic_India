const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\table.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('div', { className: "relative w-full overflow-auto"  , children: 
      _jsxDEV('table', { ref: ref, className: cn("w-full caption-bottom text-sm", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 8}, this )
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 7}, this)
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef(
  ({ className, ...props }, ref) => _jsxDEV('thead', { ref: ref, className: cn("[&_tr]:border-b", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 15}, this ),
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('tbody', { ref: ref, className: cn("[&_tr:last-child]:border-0", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 21}, this )
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('tfoot', { ref: ref, className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 28}, this )
  ),
);
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('tr', {
      ref: ref,
      className: cn("border-b transition-colors data-[state=selected]:bg-muted hover:bg-muted/50", className),
      ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 35}, this
    )
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('th', {
      ref: ref,
      className: cn(
        "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
        className,
      ),
      ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 46}, this
    )
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('td', { ref: ref, className: cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 60}, this )
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(
  ({ className, ...props }, ref) => (
    _jsxDEV('caption', { ref: ref, className: cn("mt-4 text-sm text-muted-foreground", className), ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 67}, this )
  ),
);
TableCaption.displayName = "TableCaption";

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
