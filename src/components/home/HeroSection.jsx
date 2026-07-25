const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\home\\HeroSection.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    _jsxDEV('section', { className: "relative min-h-[90vh] flex items-center overflow-hidden bg-hero-pattern"     , children: [
      /* Background Decorations */
      _jsxDEV('div', { className: "absolute inset-0 overflow-hidden"  , children: [
        _jsxDEV('div', { className: "absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow"        ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 13}, this )
        , _jsxDEV('div', { className: "absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow"        , style: { animationDelay: '1s' },}, void 0, false, {fileName: _jsxFileName, lineNumber: 14}, this )
        , _jsxDEV('div', { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"         ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 15}, this )
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 12}, this)

      , _jsxDEV('div', { className: "container mx-auto px-4 py-16 lg:py-24 relative z-10"      , children: 
        _jsxDEV('div', { className: "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"    , children: [
          /* Content */
          _jsxDEV('div', { className: "space-y-8 animate-fade-in-up" , children: [
            /* Badge */
            _jsxDEV('div', { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary"         , children: [
              _jsxDEV('span', { className: "relative flex h-2 w-2"   , children: [
                _jsxDEV('span', { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"       ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 25}, this)
                , _jsxDEV('span', { className: "relative inline-flex rounded-full h-2 w-2 bg-secondary"     ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 26}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 24}, this)
              , _jsxDEV('span', { className: "text-sm font-medium" , children: "Smart Citizen Engagement Platform"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 28}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 23}, this)

            /* Tagline */
            , _jsxDEV('div', { className: "space-y-4", children: [
              _jsxDEV('h1', { className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight"      , children: 
                _jsxDEV('span', { className: "text-primary", children: t('home_hero_title')}, void 0, false, {fileName: _jsxFileName, lineNumber: 34}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this)
              , _jsxDEV('p', { className: "text-lg md:text-xl text-muted-foreground font-medium"   , children: "शिकायत नहीं, बदलाव की शुरुआत"

              }, void 0, false, {fileName: _jsxFileName, lineNumber: 36}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 32}, this)

            /* Description */
            , _jsxDEV('p', { className: "text-lg text-muted-foreground max-w-lg"  , children: 
              t('home_hero_subtitle')
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this)

            /* CTA Buttons */
            , _jsxDEV('div', { className: "flex flex-col sm:flex-row gap-4"   , children: [
              _jsxDEV(Button, { size: "lg", className: "bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 text-lg px-8"     , asChild: true, children: 
                _jsxDEV(Link, { to: "/report", children: [
                  t('btn_report_now')
                  , _jsxDEV(ArrowRight, { className: "h-5 w-5" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 51}, this )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 49}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 48}, this)
              , _jsxDEV(Button, { size: "lg", variant: "outline", className: "gap-2 text-lg px-8"  , asChild: true, children: 
                _jsxDEV(Link, { to: "/track", children: 
                  t('btn_track_status')
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 55}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 54}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 47}, this)

            /* Stats */
            , _jsxDEV('div', { className: "grid grid-cols-3 gap-6 pt-8 border-t border-border"     , children: [
              _jsxDEV('div', { children: [
                _jsxDEV('p', { className: "text-3xl font-display font-bold text-primary"   , children: "50K+"}, void 0, false, {fileName: _jsxFileName, lineNumber: 64}, this)
                , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: t('stats_reports_filed')}, void 0, false, {fileName: _jsxFileName, lineNumber: 65}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 63}, this)
              , _jsxDEV('div', { children: [
                _jsxDEV('p', { className: "text-3xl font-display font-bold text-accent"   , children: "85%"}, void 0, false, {fileName: _jsxFileName, lineNumber: 68}, this)
                , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: t('stats_reports_resolved')}, void 0, false, {fileName: _jsxFileName, lineNumber: 69}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 67}, this)
              , _jsxDEV('div', { children: [
                _jsxDEV('p', { className: "text-3xl font-display font-bold text-secondary"   , children: "100+"}, void 0, false, {fileName: _jsxFileName, lineNumber: 72}, this)
                , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: t('stats_communities')}, void 0, false, {fileName: _jsxFileName, lineNumber: 73}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 71}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 62}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 21}, this)

          /* Hero Image/Illustration */
          , _jsxDEV('div', { className: "relative animate-fade-in" , style: { animationDelay: '0.3s' }, children: 
            _jsxDEV('div', { className: "relative aspect-square max-w-lg mx-auto"   , children: [
              /* India Map SVG */
              _jsxDEV('svg', { 
                viewBox: "0 0 400 400"   , 
                className: "w-full h-full india-map-pulse drop-shadow-2xl"   ,
 children: [
                /* Stylized India outline */
                _jsxDEV('defs', { children: 
                  _jsxDEV('linearGradient', { id: "indiaGradient", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
                    _jsxDEV('stop', { offset: "0%", stopColor: "hsl(var(--primary))",}, void 0, false, {fileName: _jsxFileName, lineNumber: 89}, this )
                    , _jsxDEV('stop', { offset: "50%", stopColor: "hsl(var(--navy-light))",}, void 0, false, {fileName: _jsxFileName, lineNumber: 90}, this )
                    , _jsxDEV('stop', { offset: "100%", stopColor: "hsl(var(--secondary))",}, void 0, false, {fileName: _jsxFileName, lineNumber: 91}, this )
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 88}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 87}, this)

                /* Simplified India shape */
                , _jsxDEV('path', {
                  d: "M200 20  C280 30, 350 80, 370 150 C380 200, 360 260, 340 300 C320 340, 280 370, 240 380 C220 385, 200 390, 180 380 C140 370, 100 340, 80 300 C60 260, 50 200, 60 150 C80 80, 140 30, 200 20Z"






                          ,
                  fill: "url(#indiaGradient)",
                  stroke: "hsl(var(--secondary))",
                  strokeWidth: "3",
                  opacity: "0.9",}, void 0, false, {fileName: _jsxFileName, lineNumber: 96}, this
                )

                /* Floating icons representing features */
                , _jsxDEV('g', { className: "animate-float", children: [
                  _jsxDEV('circle', { cx: "120", cy: "150", r: "25", fill: "hsl(var(--card))", stroke: "hsl(var(--secondary))", strokeWidth: "2",}, void 0, false, {fileName: _jsxFileName, lineNumber: 113}, this )
                  , _jsxDEV('g', { transform: "translate(108, 138)" , children: 
                    _jsxDEV(MapPin, { className: "text-secondary", width: "24", height: "24",}, void 0, false, {fileName: _jsxFileName, lineNumber: 115}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 114}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 112}, this)

                , _jsxDEV('g', { className: "animate-float", style: { animationDelay: '1s' }, children: [
                  _jsxDEV('circle', { cx: "280", cy: "180", r: "25", fill: "hsl(var(--card))", stroke: "hsl(var(--accent))", strokeWidth: "2",}, void 0, false, {fileName: _jsxFileName, lineNumber: 120}, this )
                  , _jsxDEV('g', { transform: "translate(268, 168)" , children: 
                    _jsxDEV(FileText, { className: "text-accent", width: "24", height: "24",}, void 0, false, {fileName: _jsxFileName, lineNumber: 122}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 121}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 119}, this)

                , _jsxDEV('g', { className: "animate-float", style: { animationDelay: '2s' }, children: [
                  _jsxDEV('circle', { cx: "200", cy: "280", r: "25", fill: "hsl(var(--card))", stroke: "hsl(var(--primary))", strokeWidth: "2",}, void 0, false, {fileName: _jsxFileName, lineNumber: 127}, this )
                  , _jsxDEV('g', { transform: "translate(188, 268)" , children: 
                    _jsxDEV(CheckCircle, { className: "text-primary", width: "24", height: "24",}, void 0, false, {fileName: _jsxFileName, lineNumber: 129}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 128}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 126}, this)

                /* Decorative dots */
                , _jsxDEV('circle', { cx: "150", cy: "100", r: "4", fill: "hsl(var(--secondary))", opacity: "0.6",}, void 0, false, {fileName: _jsxFileName, lineNumber: 134}, this )
                , _jsxDEV('circle', { cx: "250", cy: "120", r: "3", fill: "hsl(var(--accent))", opacity: "0.6",}, void 0, false, {fileName: _jsxFileName, lineNumber: 135}, this )
                , _jsxDEV('circle', { cx: "180", cy: "200", r: "5", fill: "hsl(var(--secondary))", opacity: "0.4",}, void 0, false, {fileName: _jsxFileName, lineNumber: 136}, this )
                , _jsxDEV('circle', { cx: "220", cy: "320", r: "3", fill: "hsl(var(--primary-foreground))", opacity: "0.6",}, void 0, false, {fileName: _jsxFileName, lineNumber: 137}, this )
                , _jsxDEV('circle', { cx: "300", cy: "250", r: "4", fill: "hsl(var(--accent))", opacity: "0.5",}, void 0, false, {fileName: _jsxFileName, lineNumber: 138}, this )
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 82}, this)

              /* Glow effect */
              , _jsxDEV('div', { className: "absolute inset-0 bg-gradient-radial from-secondary/20 to-transparent rounded-full blur-2xl -z-10"       ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 142}, this )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 80}, this)
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 79}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 19}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 18}, this)

      /* Bottom wave decoration */
      , _jsxDEV('div', { className: "absolute bottom-0 left-0 right-0"   , children: 
        _jsxDEV('svg', { viewBox: "0 0 1440 120"   , fill: "none", xmlns: "http://www.w3.org/2000/svg", className: "w-full", children: 
          _jsxDEV('path', { 
            d: "M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"                                           , 
            fill: "hsl(var(--background))",}, void 0, false, {fileName: _jsxFileName, lineNumber: 151}, this
          )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 150}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 149}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 10}, this)
  );
}
