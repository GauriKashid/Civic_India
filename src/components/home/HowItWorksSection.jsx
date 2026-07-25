const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\home\\HowItWorksSection.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Camera, Send, CheckCircle, Bell } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export default function HowItWorksSection() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Camera,
      title: t('step1_title'),
      description: t('step1_desc'),
      color: 'secondary',
    },
    {
      icon: Send,
      title: t('step2_title'),
      description: t('step2_desc'),
      color: 'accent',
    },
    {
      icon: CheckCircle,
      title: t('step3_title'),
      description: t('step3_desc'),
      color: 'primary',
    },
  ];

  return (
    _jsxDEV('section', { className: "py-20 lg:py-28 bg-background"  , children: 
      _jsxDEV('div', { className: "container mx-auto px-4"  , children: [
        /* Section Header */
        _jsxDEV('div', { className: "text-center max-w-2xl mx-auto mb-16"   , children: [
          _jsxDEV('span', { className: "text-secondary font-medium text-sm uppercase tracking-wider"    , children: t('simple_process')}, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this)
          , _jsxDEV('h2', { className: "font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4"      , children: 
            t('how_it_works')
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 34}, this)
          , _jsxDEV('p', { className: "text-muted-foreground text-lg" , children: 
            t('how_desc')
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 37}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 32}, this)

        /* Steps */
        , _jsxDEV('div', { className: "relative", children: [
          /* Connection Line */
          _jsxDEV('div', { className: "hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-1 bg-gradient-to-r from-secondary via-accent to-primary rounded-full -translate-y-1/2"            ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 45}, this )

          , _jsxDEV('div', { className: "grid md:grid-cols-3 gap-8 lg:gap-12"   , children: 
            steps.map((step, index) => (
              _jsxDEV('div', {

                className: "relative animate-fade-in-up" ,
                style: { animationDelay: `${index * 0.2}s` },
 children: 
                _jsxDEV('div', { className: "bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow border border-border text-center relative z-10"          , children: [
                  /* Step Number */
                  _jsxDEV('div', { className: "absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm"             , children: 
                    index + 1
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 56}, this)

                  /* Icon */
                  , _jsxDEV('div', { className: `w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                    step.color === 'secondary' ? 'bg-secondary/10' :
                    step.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
                  }`, children: 
                    _jsxDEV(step.icon, { className: `h-10 w-10 ${
                      step.color === 'secondary' ? 'text-secondary' :
                      step.color === 'accent' ? 'text-accent' : 'text-primary'
                    }`,}, void 0, false, {fileName: _jsxFileName, lineNumber: 65}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 61}, this)

                  /* Content */
                  , _jsxDEV('h3', { className: "font-display text-xl font-semibold text-foreground mb-3"    , children: 
                    step.title
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 72}, this)
                  , _jsxDEV('p', { className: "text-muted-foreground", children: 
                    step.description
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 75}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 54}, this)
              }, index, false, {fileName: _jsxFileName, lineNumber: 49}, this)
            ))
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 47}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 43}, this)

        /* Notification Feature */
        , _jsxDEV('div', { className: "mt-16 bg-primary/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left"           , children: [
          _jsxDEV('div', { className: "w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0"       , children: 
            _jsxDEV(Bell, { className: "h-8 w-8 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 87}, this )
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 86}, this)
          , _jsxDEV('div', { children: [
            _jsxDEV('h3', { className: "font-display text-xl font-semibold text-foreground mb-2"    , children: 
              t('stay_updated_title')
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 90}, this)
            , _jsxDEV('p', { className: "text-muted-foreground", children: 
              t('stay_updated_desc')
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 93}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 89}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 85}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 30}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 29}, this)
  );
}
