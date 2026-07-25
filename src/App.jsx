const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\App.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ReportNow from "./pages/ReportNow";
import TrackReport from "./pages/TrackReport";
import Education from "./pages/Education";
import Leaderboard from "./pages/Leaderboard";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  _jsxDEV(QueryClientProvider, { client: queryClient, children: 
    _jsxDEV(AuthProvider, { children: 
      _jsxDEV(LanguageProvider, { children: 
        _jsxDEV(TooltipProvider, { children: [
          _jsxDEV(Toaster, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 28}, this )
          , _jsxDEV(Sonner, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 29}, this )
          , _jsxDEV(BrowserRouter, { children: 
            _jsxDEV(Routes, { children: [
              _jsxDEV(Route, { path: "/", element: _jsxDEV(Index, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 32}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 32}, this )
              , _jsxDEV(Route, { path: "/auth", element: _jsxDEV(Auth, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this )
              , _jsxDEV(Route, { path: "/report", element: _jsxDEV(ReportNow, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 34}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 34}, this )
              , _jsxDEV(Route, { path: "/track", element: _jsxDEV(TrackReport, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 35}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 35}, this )
              , _jsxDEV(Route, { path: "/education", element: _jsxDEV(Education, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 36}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 36}, this )
              , _jsxDEV(Route, { path: "/leaderboard", element: _jsxDEV(Leaderboard, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 37}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 37}, this )
              , _jsxDEV(Route, { path: "/admin", element: _jsxDEV(Admin, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this )
              , _jsxDEV(Route, { path: "/analytics", element: _jsxDEV(Analytics, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 39}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 39}, this )
              , _jsxDEV(Route, { path: "/about", element: _jsxDEV(About, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 40}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 40}, this )
              , _jsxDEV(Route, { path: "/contact", element: _jsxDEV(Contact, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 41}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 41}, this )
              , _jsxDEV(Route, { path: "/resources", element: _jsxDEV(Resources, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this )
              , _jsxDEV(Route, { path: "*", element: _jsxDEV(NotFound, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 43}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 43}, this )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 31}, this)
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 30}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 27}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 26}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 25}, this)
  }, void 0, false, {fileName: _jsxFileName, lineNumber: 24}, this)
);

export default App;
