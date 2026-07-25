const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\layout\\Layout.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";
import Navbar from './Navbar';
import Footer from './Footer';






export default function Layout({ children, showFooter = true }) {
  return (
    _jsxDEV('div', { className: "min-h-screen flex flex-col"  , children: [
      _jsxDEV(Navbar, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 13}, this )
      , _jsxDEV('main', { className: "flex-1", children: children}, void 0, false, {fileName: _jsxFileName, lineNumber: 14}, this)
      , showFooter && _jsxDEV(Footer, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 15}, this )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 12}, this)
  );
}
