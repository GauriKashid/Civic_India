const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\home\\CTASection.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    _jsxDEV('section', { className: "py-20 lg:py-28 bg-gradient-to-br from-secondary/10 via-background to-accent/10 relative overflow-hidden"       , children: [
      /* Decorative Elements */
      _jsxDEV('div', { className: "absolute top-10 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"       ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 12}, this )
      , _jsxDEV('div', { className: "absolute bottom-10 right-10 w-60 h-60 bg-accent/10 rounded-full blur-3xl"       ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 13}, this )

      , _jsxDEV('div', { className: "container mx-auto px-4 relative z-10"    , children: 
        _jsxDEV('div', { className: "max-w-4xl mx-auto text-center"  , children: [
          /* Badge */
          _jsxDEV('div', { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary mb-8"          , children: [
            _jsxDEV(Shield, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 19}, this )
            , _jsxDEV('span', { className: "text-sm font-medium" , children: t('join_movement')}, void 0, false, {fileName: _jsxFileName, lineNumber: 20}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 18}, this)

          , _jsxDEV('h2', { className: "font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6"      , children: 
            t('be_the_change')
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 23}, this)
          , _jsxDEV('p', { className: "text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"    , children: 
            t('be_the_change_desc')
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 26}, this)

          /* CTA Buttons */
          , _jsxDEV('div', { className: "flex flex-col sm:flex-row gap-4 justify-center mb-12"     , children: [
            _jsxDEV(Button, { size: "lg", className: "bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 text-lg px-8"     , asChild: true, children: 
              _jsxDEV(Link, { to: "/report", children: [
                t('btn_report_now')
                , _jsxDEV(ArrowRight, { className: "h-5 w-5" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 35}, this )
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 33}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 32}, this)
            , _jsxDEV(Button, { size: "lg", variant: "outline", className: "gap-2 text-lg px-8"  , asChild: true, children: 
              _jsxDEV(Link, { to: "/education", children: 
                t('btn_learn_civic')
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 39}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 31}, this)

          /* Features */
          , _jsxDEV('div', { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"     , children: [
            _jsxDEV('div', { className: "flex items-center gap-3 justify-center md:justify-start"    , children: [
              _jsxDEV('div', { className: "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center"      , children: 
                _jsxDEV(Shield, { className: "h-5 w-5 text-primary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 49}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 48}, this)
              , _jsxDEV('span', { className: "text-foreground font-medium" , children: t('secure_anonymous')}, void 0, false, {fileName: _jsxFileName, lineNumber: 51}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 47}, this)
            , _jsxDEV('div', { className: "flex items-center gap-3 justify-center"   , children: [
              _jsxDEV('div', { className: "w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center"      , children: 
                _jsxDEV(Award, { className: "h-5 w-5 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 55}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 54}, this)
              , _jsxDEV('span', { className: "text-foreground font-medium" , children: t('earn_badges')}, void 0, false, {fileName: _jsxFileName, lineNumber: 57}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 53}, this)
            , _jsxDEV('div', { className: "flex items-center gap-3 justify-center md:justify-end"    , children: [
              _jsxDEV('div', { className: "w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"      , children: 
                _jsxDEV(Users, { className: "h-5 w-5 text-accent"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 61}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 60}, this)
              , _jsxDEV('span', { className: "text-foreground font-medium" , children: t('join_community')}, void 0, false, {fileName: _jsxFileName, lineNumber: 63}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 59}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 46}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 16}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 15}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 10}, this)
  );
}
