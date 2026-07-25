const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\components\\home\\StatsSection.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { TrendingUp, Users, MapPin, Clock } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export default function StatsSection() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: TrendingUp,
      value: '50,000+',
      label: t('stats_reports_filed'),
      description: t('reports_filed_desc'),
    },
    {
      icon: Users,
      value: '25,000+',
      label: t('stats_active_users'),
      description: t('active_citizens_desc'),
    },
    {
      icon: MapPin,
      value: '100+',
      label: t('stats_communities'),
      description: t('cities_covered_desc'),
    },
    {
      icon: Clock,
      value: '72 hrs',
      label: t('avg_response_time'),
      description: t('quick_ack'),
    },
  ];

  const problemStats = [
    { problem: t('prob_potholes'), stat: '30%', detail: t('prob_potholes_detail') },
    { problem: t('prob_streetlights'), stat: '40%', detail: t('prob_streetlights_detail') },
    { problem: t('prob_garbage'), stat: '45%', detail: t('prob_garbage_detail') },
    { problem: t('prob_water'), stat: '25%', detail: t('prob_water_detail') },
  ];

  return (
    _jsxDEV('section', { className: "py-20 lg:py-28 bg-primary text-primary-foreground relative overflow-hidden"     , children: [
      /* Background Pattern */
      _jsxDEV('div', { className: "absolute inset-0 opacity-10"  , children: 
        _jsxDEV('div', { className: "absolute top-0 left-0 w-full h-full"    , style: {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        },}, void 0, false, {fileName: _jsxFileName, lineNumber: 45}, this )
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 44}, this)

      , _jsxDEV('div', { className: "container mx-auto px-4 relative z-10"    , children: [
        /* Section Header */
        _jsxDEV('div', { className: "text-center max-w-2xl mx-auto mb-16"   , children: [
          _jsxDEV('span', { className: "text-secondary font-medium text-sm uppercase tracking-wider"    , children: t('impact_badge')}, void 0, false, {fileName: _jsxFileName, lineNumber: 53}, this)
          , _jsxDEV('h2', { className: "font-display text-3xl md:text-4xl font-bold mt-2 mb-4"     , children: 
            t('impact_title')
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 54}, this)
          , _jsxDEV('p', { className: "text-primary-foreground/80 text-lg" , children: 
            t('impact_desc')
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 57}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 52}, this)

        /* Problem Stats */
        , _jsxDEV('div', { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16"    , children: 
          problemStats.map((item, index) => (
            _jsxDEV('div', {

              className: "bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 text-center animate-fade-in-up"     ,
              style: { animationDelay: `${index * 0.1}s` },
 children: [
              _jsxDEV('p', { className: "text-4xl lg:text-5xl font-display font-bold text-secondary mb-2"     , children: 
                item.stat
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 70}, this)
              , _jsxDEV('p', { className: "text-sm text-primary-foreground/80 font-medium"  , children: 
                item.problem
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 73}, this)
              , _jsxDEV('p', { className: "text-xs text-primary-foreground/60 mt-1"  , children: 
                item.detail
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 76}, this)
            ]}, index, true, {fileName: _jsxFileName, lineNumber: 65}, this)
          ))
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 63}, this)

        /* Platform Stats */
        , _jsxDEV('div', { className: "grid grid-cols-2 lg:grid-cols-4 gap-6"   , children: 
          stats.map((stat, index) => (
            _jsxDEV('div', {

              className: "text-center animate-fade-in-up" ,
              style: { animationDelay: `${index * 0.1 + 0.4}s` },
 children: [
              _jsxDEV('div', { className: "w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-4"        , children: 
                _jsxDEV(stat.icon, { className: "h-8 w-8 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 92}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 91}, this)
              , _jsxDEV('p', { className: "text-3xl lg:text-4xl font-display font-bold mb-1"    , children: 
                stat.value
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 94}, this)
              , _jsxDEV('p', { className: "font-medium mb-1" , children: stat.label}, void 0, false, {fileName: _jsxFileName, lineNumber: 97}, this)
              , _jsxDEV('p', { className: "text-sm text-primary-foreground/60" , children: 
                stat.description
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 98}, this)
            ]}, index, true, {fileName: _jsxFileName, lineNumber: 86}, this)
          ))
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 84}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 50}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 42}, this)
  );
}
