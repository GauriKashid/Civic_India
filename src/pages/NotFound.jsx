const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\pages\\NotFound.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    _jsxDEV('div', { className: "flex min-h-screen items-center justify-center bg-muted"    , children: 
      _jsxDEV('div', { className: "text-center", children: [
        _jsxDEV('h1', { className: "mb-4 text-4xl font-bold"  , children: "404"}, void 0, false, {fileName: _jsxFileName, lineNumber: 14}, this)
        , _jsxDEV('p', { className: "mb-4 text-xl text-muted-foreground"  , children: "Oops! Page not found"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 15}, this)
        , _jsxDEV('a', { href: "/", className: "text-primary underline hover:text-primary/90"  , children: "Return to Home"

        }, void 0, false, {fileName: _jsxFileName, lineNumber: 16}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 13}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 12}, this)
  );
};

export default NotFound;
