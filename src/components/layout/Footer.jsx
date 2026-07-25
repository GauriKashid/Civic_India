const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\layout\\Footer.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    _jsxDEV('footer', { className: "bg-primary text-primary-foreground" , children: [
      /* Main Footer */
      _jsxDEV('div', { className: "container mx-auto px-4 py-12 lg:py-16"    , children: 
        _jsxDEV('div', { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12"     , children: [
          /* Brand Section */
          _jsxDEV('div', { className: "lg:col-span-2", children: [
            _jsxDEV(Link, { to: "/", className: "flex items-center gap-3 mb-4"   , children: [
              _jsxDEV('div', { className: "relative w-12 h-12"  , children: 
                _jsxDEV('svg', { viewBox: "0 0 100 100"   , className: "w-full h-full" , children: [
                  _jsxDEV('path', {
                    d: "M50 5 C30 5, 15 20, 15 35 C15 55, 35 75, 50 95 C65 75, 85 55, 85 35 C85 20, 70 5, 50 5"                         ,
                    fill: "hsl(var(--secondary))",
                    stroke: "hsl(var(--primary-foreground))",
                    strokeWidth: "2",}, void 0, false, {fileName: _jsxFileName, lineNumber: 25}, this
                  )
                  , _jsxDEV('path', {
                    d: "M50 25 L55 40 L70 40 L58 50 L63 65 L50 55 L37 65 L42 50 L30 40 L45 40 Z"                    ,
                    fill: "hsl(var(--primary-foreground))",}, void 0, false, {fileName: _jsxFileName, lineNumber: 31}, this
                  )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 24}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 23}, this)
              , _jsxDEV('div', { children: [
                _jsxDEV('h3', { className: "font-display font-bold text-xl"  , children: "CivicIndia.in"}, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this)
                , _jsxDEV('p', { className: "text-sm text-primary-foreground/70" , children: "शिकायत नहीं, बदलाव की शुरुआत"    }, void 0, false, {fileName: _jsxFileName, lineNumber: 39}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 37}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 22}, this)
            , _jsxDEV('p', { className: "text-primary-foreground/80 mb-6 max-w-md"  , children: 
              t('home_hero_subtitle')
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this)

            /* Contact Info */
            , _jsxDEV('div', { className: "space-y-3 text-sm" , children: [
              _jsxDEV('div', { className: "flex items-center gap-3"  , children: [
                _jsxDEV(Mail, { className: "h-4 w-4 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 49}, this )
                , _jsxDEV('span', { children: "support@civicindia.in"}, void 0, false, {fileName: _jsxFileName, lineNumber: 50}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 48}, this)
              , _jsxDEV('div', { className: "flex items-center gap-3"  , children: [
                _jsxDEV(Phone, { className: "h-4 w-4 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 53}, this )
                , _jsxDEV('span', { children: "1800-XXX-XXXX (Toll Free)"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 54}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 52}, this)
              , _jsxDEV('div', { className: "flex items-center gap-3"  , children: [
                _jsxDEV(MapPin, { className: "h-4 w-4 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 57}, this )
                , _jsxDEV('span', { children: "Pune, India" }, void 0, false, {fileName: _jsxFileName, lineNumber: 58}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 56}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 47}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 21}, this)

          /* Platform Links */
          , _jsxDEV('div', { children: [
            _jsxDEV('h4', { className: "font-display font-semibold text-lg mb-4"   , children: t('nav_home')}, void 0, false, {fileName: _jsxFileName, lineNumber: 65}, this)
            , _jsxDEV('ul', { className: "space-y-3", children: [
              _jsxDEV('li', { children: 
                _jsxDEV(Link, { to: "/report", className: "text-primary-foreground/70 hover:text-secondary transition-colors"  , children: 
                  t('nav_report')
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 68}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 67}, this)
              , _jsxDEV('li', { children: 
                _jsxDEV(Link, { to: "/track", className: "text-primary-foreground/70 hover:text-secondary transition-colors"  , children: 
                  t('nav_track')
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 73}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 72}, this)
              , _jsxDEV('li', { children: 
                _jsxDEV(Link, { to: "/education", className: "text-primary-foreground/70 hover:text-secondary transition-colors"  , children: 
                  t('nav_education')
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 78}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 77}, this)
              , _jsxDEV('li', { children: 
                _jsxDEV(Link, { to: "/leaderboard", className: "text-primary-foreground/70 hover:text-secondary transition-colors"  , children: 
                  t('nav_leaderboard')
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 83}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 82}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 66}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 64}, this)

          /* Resources Links */
          , _jsxDEV('div', { children: [
            _jsxDEV('h4', { className: "font-display font-semibold text-lg mb-4"   , children: t('nav_resources')}, void 0, false, {fileName: _jsxFileName, lineNumber: 92}, this)
            , _jsxDEV('ul', { className: "space-y-3", children: [
              _jsxDEV('li', { children: 
                _jsxDEV(Link, { to: "/resources#traffic", className: "text-primary-foreground/70 hover:text-secondary transition-colors"  , children: "Traffic Rules"

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 95}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 94}, this)
              , _jsxDEV('li', { children: 
                _jsxDEV(Link, { to: "/resources#civic", className: "text-primary-foreground/70 hover:text-secondary transition-colors"  , children: "Civic Guidelines"

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 100}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 99}, this)
              , _jsxDEV('li', { children: 
                _jsxDEV(Link, { to: "/resources#safety", className: "text-primary-foreground/70 hover:text-secondary transition-colors"  , children: "Safety Tips"

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 105}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 104}, this)
              , _jsxDEV('li', { children: 
                _jsxDEV(Link, { to: "/resources#faq", className: "text-primary-foreground/70 hover:text-secondary transition-colors"  , children: "FAQs"

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 110}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 109}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 93}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 91}, this)

          /* Company Links */
          , _jsxDEV('div', { children: [
            _jsxDEV('h4', { className: "font-display font-semibold text-lg mb-4"   , children: t('nav_about')}, void 0, false, {fileName: _jsxFileName, lineNumber: 119}, this)
            , _jsxDEV('ul', { className: "space-y-3", children: [
              _jsxDEV('li', { children: 
                _jsxDEV(Link, { to: "/about", className: "text-primary-foreground/70 hover:text-secondary transition-colors"  , children: 
                  t('nav_about')
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 122}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 121}, this)
              , _jsxDEV('li', { children: 
                _jsxDEV(Link, { to: "/contact", className: "text-primary-foreground/70 hover:text-secondary transition-colors"  , children: 
                  t('nav_contact')
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 127}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 126}, this)
              , _jsxDEV('li', { children: 
                _jsxDEV(Link, { to: "/privacy", className: "text-primary-foreground/70 hover:text-secondary transition-colors"  , children: "Privacy Policy"

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 132}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 131}, this)
              , _jsxDEV('li', { children: 
                _jsxDEV(Link, { to: "/terms", className: "text-primary-foreground/70 hover:text-secondary transition-colors"  , children: "Terms of Service"

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 137}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 136}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 120}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 118}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 19}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 18}, this)

      /* Bottom Bar */
      , _jsxDEV('div', { className: "border-t border-primary-foreground/10" , children: 
        _jsxDEV('div', { className: "container mx-auto px-4 py-6"   , children: 
          _jsxDEV('div', { className: "flex flex-col md:flex-row items-center justify-between gap-4"     , children: [
            _jsxDEV('p', { className: "text-sm text-primary-foreground/60" , children: ["© "
               , new Date().getFullYear(), " CivicIndia.in. All rights reserved. Made with ❤️ for India."
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 150}, this)
            , _jsxDEV('div', { className: "flex items-center gap-4"  , children: 
              socialLinks.map((social) => (
                _jsxDEV('a', {

                  href: social.href,
                  className: "p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors"    ,
                  'aria-label': social.name,
 children: 
                  _jsxDEV(social.icon, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 161}, this )
                }, social.name, false, {fileName: _jsxFileName, lineNumber: 155}, this)
              ))
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 153}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 149}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 148}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 147}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 16}, this)
  );
}
