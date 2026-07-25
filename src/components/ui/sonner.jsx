const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\sonner.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { useTheme } from "next-themes";
import { Toaster as Sonner, toast } from "sonner";



const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    _jsxDEV(Sonner, {
      theme: theme ,
      className: "toaster group" ,
      toastOptions: {
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      },
      ...props,}, void 0, false, {fileName: _jsxFileName, lineNumber: 10}, this
    )
  );
};

export { Toaster, toast };
