const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\ui\\toaster.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { useToast } from "@/hooks/use-toast";
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    _jsxDEV(ToastProvider, { children: [
      toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          _jsxDEV(Toast, { ...props, children: [
            _jsxDEV('div', { className: "grid gap-1" , children: [
              title && _jsxDEV(ToastTitle, { children: title}, void 0, false, {fileName: _jsxFileName, lineNumber: 13}, this)
              , description && _jsxDEV(ToastDescription, { children: description}, void 0, false, {fileName: _jsxFileName, lineNumber: 14}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 12}, this)
            , action
            , _jsxDEV(ToastClose, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 17}, this )
          ]}, id, true, {fileName: _jsxFileName, lineNumber: 11}, this)
        );
      })
      , _jsxDEV(ToastViewport, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 21}, this )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 8}, this)
  );
}
