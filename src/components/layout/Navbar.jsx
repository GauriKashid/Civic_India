const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\layout\\Navbar.tsx";import {jsxDEV as _jsxDEV, Fragment as _Fragment} from "react/jsx-dev-runtime";import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, LayoutDashboard, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { languageNames, } from '@/lib/translations';
import { cn } from '@/lib/utils';

const navigation = [
  { key: 'nav_home', href: '/' },
  { key: 'nav_report', href: '/report' },
  { key: 'nav_track', href: '/track' },
  { key: 'nav_education', href: '/education' },
  { key: 'nav_leaderboard', href: '/leaderboard' },
  { key: 'nav_resources', href: '/resources' },
  { key: 'nav_about', href: '/about' },
  { key: 'nav_contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const isActive = (href) => location.pathname === href;

  return (
    _jsxDEV('header', { className: "sticky top-0 z-50 w-full glass border-b border-border/50"      , children: [
      _jsxDEV('nav', { className: "container mx-auto flex items-center justify-between px-4 py-3 lg:px-8"       , children: [
        /* Logo */
        _jsxDEV(Link, { to: "/", className: "flex items-center gap-2"  , children: [
          _jsxDEV('div', { className: "relative w-10 h-10"  , children: 
            _jsxDEV('svg', { viewBox: "0 0 100 100"   , className: "w-full h-full india-map-pulse"  , children: [
              _jsxDEV('path', {
                d: "M50 5 C30 5, 15 20, 15 35 C15 55, 35 75, 50 95 C65 75, 85 55, 85 35 C85 20, 70 5, 50 5"                         ,
                fill: "hsl(var(--primary))",
                stroke: "hsl(var(--secondary))",
                strokeWidth: "3",}, void 0, false, {fileName: _jsxFileName, lineNumber: 43}, this
              )
              , _jsxDEV('path', {
                d: "M50 25 L55 40 L70 40 L58 50 L63 65 L50 55 L37 65 L42 50 L30 40 L45 40 Z"                    ,
                fill: "hsl(var(--secondary))",}, void 0, false, {fileName: _jsxFileName, lineNumber: 49}, this
              )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 42}, this)
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 41}, this)
          , _jsxDEV('div', { className: "flex flex-col" , children: [
            _jsxDEV('span', { className: "font-display font-bold text-lg text-primary leading-tight"    , children: "CivicIndia"}, void 0, false, {fileName: _jsxFileName, lineNumber: 56}, this)
            , _jsxDEV('span', { className: "text-[10px] text-muted-foreground leading-tight"  , children: "शिकायत नहीं, बदलाव की शुरुआत"    }, void 0, false, {fileName: _jsxFileName, lineNumber: 57}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 55}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 40}, this)

        /* Desktop Navigation */
        , _jsxDEV('div', { className: "hidden lg:flex lg:items-center lg:gap-1"   , children: 
          navigation.map((item) => (
            _jsxDEV(Link, {

              to: item.href,
              className: cn(
                "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              ),
 children: 
              t(item.key)
            }, item.key, false, {fileName: _jsxFileName, lineNumber: 64}, this)
          ))
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 62}, this)

        /* Language & Auth Section */
        , _jsxDEV('div', { className: "hidden lg:flex lg:items-center lg:gap-3"   , children: [
          /* Language Selector */
          _jsxDEV(DropdownMenu, { children: [
            _jsxDEV(DropdownMenuTrigger, { asChild: true, children: 
              _jsxDEV(Button, { variant: "ghost", size: "sm", className: "gap-2", children: [
                _jsxDEV(Languages, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 85}, this )
                , _jsxDEV('span', { children: languageNames[language]}, void 0, false, {fileName: _jsxFileName, lineNumber: 86}, this)
                , _jsxDEV(ChevronDown, { className: "h-3 w-3" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 87}, this )
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 84}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 83}, this)
            , _jsxDEV(DropdownMenuContent, { align: "end", className: "max-h-60 overflow-y-auto w-48"  , children: 
              Object.entries(languageNames).map(([code, name]) => (
                _jsxDEV(DropdownMenuItem, {

                  onClick: () => setLanguage(code ),
                  className: cn(code === language && "font-bold bg-muted"),
 children: 
                  name
                }, code, false, {fileName: _jsxFileName, lineNumber: 92}, this)
              ))
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 90}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 82}, this)

          , user ? (
            _jsxDEV(DropdownMenu, { children: [
              _jsxDEV(DropdownMenuTrigger, { asChild: true, children: 
                _jsxDEV(Button, { variant: "outline", className: "gap-2", children: [
                  _jsxDEV(User, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 107}, this )
                  , _jsxDEV('span', { className: "max-w-[100px] truncate" , children: user.email}, void 0, false, {fileName: _jsxFileName, lineNumber: 108}, this)
                  , _jsxDEV(ChevronDown, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 109}, this )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 106}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 105}, this)
              , _jsxDEV(DropdownMenuContent, { align: "end", className: "w-48", children: [
                _jsxDEV(DropdownMenuItem, { asChild: true, children: 
                  _jsxDEV(Link, { to: "/", className: "flex items-center gap-2"  , children: [
                    _jsxDEV(LayoutDashboard, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 115}, this )
                    , t('btn_profile')
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 114}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 113}, this)
                , isAdmin && (
                  _jsxDEV(_Fragment, { children: [
                    _jsxDEV(DropdownMenuItem, { asChild: true, children: 
                      _jsxDEV(Link, { to: "/admin", className: "flex items-center gap-2"  , children: [
                        _jsxDEV(LayoutDashboard, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 123}, this ), "Admin Dashboard"

                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 122}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 121}, this)
                    , _jsxDEV(DropdownMenuItem, { asChild: true, children: 
                      _jsxDEV(Link, { to: "/analytics", className: "flex items-center gap-2"  , children: [
                        _jsxDEV(LayoutDashboard, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 129}, this ), "Analytics Dashboard"

                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 128}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 127}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 120}, this)
                )
                , _jsxDEV(DropdownMenuSeparator, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 135}, this )
                , _jsxDEV(DropdownMenuItem, { onClick: signOut, className: "text-destructive", children: [
                  _jsxDEV(LogOut, { className: "h-4 w-4 mr-2"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 137}, this ), "Sign Out"

                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 136}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 112}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 104}, this)
          ) : (
            _jsxDEV(_Fragment, { children: [
              _jsxDEV(Button, { variant: "ghost", asChild: true, children: 
                _jsxDEV(Link, { to: "/auth", children: t('btn_signin')}, void 0, false, {fileName: _jsxFileName, lineNumber: 145}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 144}, this)
              , _jsxDEV(Button, { asChild: true, className: "bg-secondary hover:bg-secondary/90 text-secondary-foreground"  , children: 
                _jsxDEV(Link, { to: "/auth?mode=signup", children: t('btn_signup')}, void 0, false, {fileName: _jsxFileName, lineNumber: 148}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 147}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 143}, this)
          )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 80}, this)

        /* Mobile menu button */
        , _jsxDEV('div', { className: "flex items-center gap-2 lg:hidden"   , children: [
          /* Mobile Language Selector */
          _jsxDEV(DropdownMenu, { children: [
            _jsxDEV(DropdownMenuTrigger, { asChild: true, children: 
              _jsxDEV(Button, { variant: "ghost", size: "sm", className: "px-2", children: 
                _jsxDEV(Languages, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 160}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 159}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 158}, this)
            , _jsxDEV(DropdownMenuContent, { align: "end", className: "max-h-60 overflow-y-auto w-48"  , children: 
              Object.entries(languageNames).map(([code, name]) => (
                _jsxDEV(DropdownMenuItem, {

                  onClick: () => setLanguage(code ),
                  className: cn(code === language && "font-bold bg-muted"),
 children: 
                  name
                }, code, false, {fileName: _jsxFileName, lineNumber: 165}, this)
              ))
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 163}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 157}, this)

          , _jsxDEV('button', {
            type: "button",
            className: "p-2 rounded-lg hover:bg-muted"  ,
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
 children: 
            mobileMenuOpen ? (
              _jsxDEV(X, { className: "h-6 w-6" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 182}, this )
            ) : (
              _jsxDEV(Menu, { className: "h-6 w-6" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 184}, this )
            )
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 176}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 155}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 38}, this)

      /* Mobile Navigation */
      , mobileMenuOpen && (
        _jsxDEV('div', { className: "lg:hidden border-t border-border"  , children: 
          _jsxDEV('div', { className: "container mx-auto px-4 py-4 space-y-2"    , children: [
            navigation.map((item) => (
              _jsxDEV(Link, {

                to: item.href,
                onClick: () => setMobileMenuOpen(false),
                className: cn(
                  "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                ),
 children: 
                t(item.key)
              }, item.key, false, {fileName: _jsxFileName, lineNumber: 195}, this)
            ))
            , _jsxDEV('div', { className: "pt-4 border-t border-border space-y-2"   , children: 
              user ? (
                _jsxDEV(_Fragment, { children: [
                  _jsxDEV(Link, {
                    to: "/",
                    onClick: () => setMobileMenuOpen(false),
                    className: "block px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted"      ,
 children: 
                    t('btn_profile')
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 212}, this)
                  , isAdmin && (
                    _jsxDEV(_Fragment, { children: [
                      _jsxDEV(Link, {
                        to: "/admin",
                        onClick: () => setMobileMenuOpen(false),
                        className: "block px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted"      ,
 children: "Admin Dashboard"

                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 221}, this)
                      , _jsxDEV(Link, {
                        to: "/analytics",
                        onClick: () => setMobileMenuOpen(false),
                        className: "block px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted"      ,
 children: "Analytics Dashboard"

                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 228}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 220}, this)
                  )
                  , _jsxDEV('button', {
                    onClick: () => {
                      signOut();
                      setMobileMenuOpen(false);
                    },
                    className: "block w-full text-left px-4 py-3 text-sm font-medium rounded-lg text-destructive hover:bg-destructive/10"         ,
 children: "Sign Out"

                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 237}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 211}, this)
              ) : (
                _jsxDEV(_Fragment, { children: [
                  _jsxDEV(Link, {
                    to: "/auth",
                    onClick: () => setMobileMenuOpen(false),
                    className: "block px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted"      ,
 children: 
                    t('btn_signin')
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 249}, this)
                  , _jsxDEV(Link, {
                    to: "/auth?mode=signup",
                    onClick: () => setMobileMenuOpen(false),
                    className: "block px-4 py-3 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground text-center"        ,
 children: 
                    t('btn_signup')
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 256}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 248}, this)
              )
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 209}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 193}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 192}, this)
      )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 37}, this)
  );
}
