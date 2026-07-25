const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\home\\TestimonialsSection.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const testimonials = [
  {
    key: 'test1',
    avatar: 'RK',
    rating: 5,
  },
  {
    key: 'test2',
    avatar: 'PS',
    rating: 5,
  },
  {
    key: 'test3',
    avatar: 'AP',
    rating: 5,
  },
  {
    key: 'test4',
    avatar: 'SR',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    _jsxDEV('section', { className: "py-20 lg:py-28 bg-background"  , children: 
      _jsxDEV('div', { className: "container mx-auto px-4"  , children: [
        /* Section Header */
        _jsxDEV('div', { className: "text-center max-w-2xl mx-auto mb-16"   , children: [
          _jsxDEV('span', { className: "text-secondary font-medium text-sm uppercase tracking-wider"    , children: 
            t('testimonials_badge')
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 35}, this)
          , _jsxDEV('h2', { className: "font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4"      , children: 
            t('testimonials_title')
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this)
          , _jsxDEV('p', { className: "text-muted-foreground text-lg" , children: 
            t('testimonials_desc')
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 41}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 34}, this)

        /* Testimonials Grid */
        , _jsxDEV('div', { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6"   , children: 
          testimonials.map((testimonial, index) => (
            _jsxDEV('div', {

              className: "bg-card rounded-2xl p-6 shadow-card border border-border relative animate-fade-in-up"       ,
              style: { animationDelay: `${index * 0.1}s` },
 children: [
              /* Quote Icon */
              _jsxDEV(Quote, { className: "absolute top-4 right-4 h-8 w-8 text-secondary/20"     ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 55}, this )

              /* Rating */
              , _jsxDEV('div', { className: "flex gap-1 mb-4"  , children: 
                [...Array(testimonial.rating)].map((_, i) => (
                  _jsxDEV(Star, { className: "h-4 w-4 fill-secondary text-secondary"   ,}, i, false, {fileName: _jsxFileName, lineNumber: 60}, this )
                ))
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 58}, this)

              /* Text */
              , _jsxDEV('p', { className: "text-muted-foreground mb-6 line-clamp-4"  , children: ["\""
                , t(`${testimonial.key}_text`), "\""
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 65}, this)

              /* Author */
              , _jsxDEV('div', { className: "flex items-center gap-3"  , children: [
                _jsxDEV('div', { className: "w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center text-sm"         , children: 
                  testimonial.avatar
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 71}, this)
                , _jsxDEV('div', { children: [
                  _jsxDEV('p', { className: "font-medium text-foreground" , children: t(`${testimonial.key}_name`)}, void 0, false, {fileName: _jsxFileName, lineNumber: 75}, this)
                  , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: t(`${testimonial.key}_loc`)}, void 0, false, {fileName: _jsxFileName, lineNumber: 76}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 74}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 70}, this)
            ]}, testimonial.key, true, {fileName: _jsxFileName, lineNumber: 49}, this)
          ))
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 47}, this)

        /* Trust Badges */
        , _jsxDEV('div', { className: "mt-16 flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-60"       , children: [
          _jsxDEV('div', { className: "text-center", children: [
            _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: t('trusted_by')}, void 0, false, {fileName: _jsxFileName, lineNumber: 86}, this)
            , _jsxDEV('p', { className: "font-display font-bold text-lg text-foreground"   , children: t('gov_bodies')}, void 0, false, {fileName: _jsxFileName, lineNumber: 87}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 85}, this)
          , _jsxDEV('div', { className: "text-center", children: [
            _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: t('partnered_with')}, void 0, false, {fileName: _jsxFileName, lineNumber: 90}, this)
            , _jsxDEV('p', { className: "font-display font-bold text-lg text-foreground"   , children: t('mun_corps')}, void 0, false, {fileName: _jsxFileName, lineNumber: 91}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 89}, this)
          , _jsxDEV('div', { className: "text-center", children: [
            _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: t('recognized_by')}, void 0, false, {fileName: _jsxFileName, lineNumber: 94}, this)
            , _jsxDEV('p', { className: "font-display font-bold text-lg text-foreground"   , children: t('smart_cities')}, void 0, false, {fileName: _jsxFileName, lineNumber: 95}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 93}, this)
          , _jsxDEV('div', { className: "text-center", children: [
            _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: t('featured_in')}, void 0, false, {fileName: _jsxFileName, lineNumber: 98}, this)
            , _jsxDEV('p', { className: "font-display font-bold text-lg text-foreground"   , children: t('digital_india')}, void 0, false, {fileName: _jsxFileName, lineNumber: 99}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 97}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 84}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 32}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 31}, this)
  );
}
