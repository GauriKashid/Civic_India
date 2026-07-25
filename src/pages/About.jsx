const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\pages\\About.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Shield, 
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Transparency',
    description: 'Every report is tracked openly, ensuring accountability at every step.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Built by citizens, for citizens. Your voice drives positive change.',
  },
  {
    icon: Heart,
    title: 'Empathy',
    description: 'We understand civic issues affect daily lives and treat each report with urgency.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to delivering the best platform for civic engagement.',
  },
];

const milestones = [
  { year: '2026', title: 'Platform Launch', description: 'Launch in selected pilot cities.' },
  { year: '2026', title: 'First 1,000 Reports', description: 'Reach our first 1,000 reports.' },
  { year: '2026', title: 'Government Partnership', description: 'Partner with local authorities.' },
  { year: '2027', title: 'Pan India Expansion', description: 'Expand to 100+ cities.' },
];

export default function About() {
  return (
    _jsxDEV(Layout, { children: 
      _jsxDEV('div', { className: "py-12 lg:py-20" , children: 
        _jsxDEV('div', { className: "container mx-auto px-4"  , children: [
          /* Hero Section */
          _jsxDEV('div', { className: "max-w-4xl mx-auto text-center mb-16"   , children: [
            _jsxDEV('h1', { className: "font-display text-4xl md:text-5xl font-bold text-foreground mb-6"     , children: ["About "
               , _jsxDEV('span', { className: "text-gradient", children: "CivicIndia"}, void 0, false, {fileName: _jsxFileName, lineNumber: 54}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 53}, this)
            , _jsxDEV('p', { className: "text-xl text-muted-foreground mb-8"  , children: "Empowering millions of citizens to build a cleaner, safer, and better India through technology-driven civic engagement."


            }, void 0, false, {fileName: _jsxFileName, lineNumber: 56}, this)
            , _jsxDEV('div', { className: "flex items-center justify-center gap-4 text-sm text-muted-foreground"     , children: [
              _jsxDEV('span', { className: "flex items-center gap-2"  , children: [
                _jsxDEV(CheckCircle, { className: "h-4 w-4 text-accent"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 62}, this ), "100+ Cities"

              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 61}, this)
              , _jsxDEV('span', { className: "flex items-center gap-2"  , children: [
                _jsxDEV(CheckCircle, { className: "h-4 w-4 text-accent"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 66}, this ), "50,000+ Reports"

              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 65}, this)
              , _jsxDEV('span', { className: "flex items-center gap-2"  , children: [
                _jsxDEV(CheckCircle, { className: "h-4 w-4 text-accent"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 70}, this ), "85% Resolution Rate"

              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 69}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 60}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 52}, this)

          /* Mission & Vision */
          , _jsxDEV('div', { className: "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20"     , children: [
            _jsxDEV(Card, { className: "bg-primary text-primary-foreground" , children: 
              _jsxDEV(CardContent, { className: "pt-8 pb-8" , children: [
                _jsxDEV('div', { className: "w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6"       , children: 
                  _jsxDEV(Target, { className: "h-7 w-7 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 81}, this )
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 80}, this)
                , _jsxDEV('h2', { className: "font-display text-2xl font-bold mb-4"   , children: "Our Mission" }, void 0, false, {fileName: _jsxFileName, lineNumber: 83}, this)
                , _jsxDEV('p', { className: "text-primary-foreground/80 leading-relaxed" , children: "To bridge the gap between citizens and local authorities by providing a seamless platform for reporting and resolving civic issues. We believe that every citizen has the power to transform their community, one report at a time."



                }, void 0, false, {fileName: _jsxFileName, lineNumber: 84}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 79}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 78}, this)

            , _jsxDEV(Card, { children: 
              _jsxDEV(CardContent, { className: "pt-8 pb-8" , children: [
                _jsxDEV('div', { className: "w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6"       , children: 
                  _jsxDEV(Eye, { className: "h-7 w-7 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 95}, this )
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 94}, this)
                , _jsxDEV('h2', { className: "font-display text-2xl font-bold mb-4"   , children: "Our Vision" }, void 0, false, {fileName: _jsxFileName, lineNumber: 97}, this)
                , _jsxDEV('p', { className: "text-muted-foreground leading-relaxed" , children: "To create an India where civic issues are resolved swiftly and transparently, where every citizen feels empowered to participate in governance, and where technology serves as a catalyst for positive social change."



                }, void 0, false, {fileName: _jsxFileName, lineNumber: 98}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 93}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 92}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 77}, this)

          /* Tagline */
          , _jsxDEV('div', { className: "text-center mb-20" , children: [
            _jsxDEV('blockquote', { className: "text-2xl md:text-3xl font-display font-bold text-foreground max-w-3xl mx-auto"      , children: "\"शिकायत नहीं, बदलाव की शुरुआत\""

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 109}, this)
            , _jsxDEV('p', { className: "text-lg text-muted-foreground mt-3"  , children: "Not a complaint — A beginning of change."

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 112}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 108}, this)

          /* Values */
          , _jsxDEV('div', { className: "max-w-5xl mx-auto mb-20"  , children: [
            _jsxDEV('h2', { className: "font-display text-3xl font-bold text-center mb-12"    , children: "Our Values" }, void 0, false, {fileName: _jsxFileName, lineNumber: 119}, this)
            , _jsxDEV('div', { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-6"   , children: 
              values.map((value, index) => (
                _jsxDEV(Card, { className: "text-center animate-fade-in-up" , style: { animationDelay: `${index * 0.1}s` }, children: 
                  _jsxDEV(CardContent, { className: "pt-8", children: [
                    _jsxDEV('div', { className: "w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4"        , children: 
                      _jsxDEV(value.icon, { className: "h-7 w-7 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 125}, this )
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 124}, this)
                    , _jsxDEV('h3', { className: "font-display font-semibold text-lg mb-2"   , children: value.title}, void 0, false, {fileName: _jsxFileName, lineNumber: 127}, this)
                    , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: value.description}, void 0, false, {fileName: _jsxFileName, lineNumber: 128}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 123}, this)
                }, value.title, false, {fileName: _jsxFileName, lineNumber: 122}, this)
              ))
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 120}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 118}, this)

          /* Timeline */
          , _jsxDEV('div', { className: "max-w-3xl mx-auto mb-20"  , children: [
            _jsxDEV('h2', { className: "font-display text-3xl font-bold text-center mb-12"    , children: "Our Roadmap" }, void 0, false, {fileName: _jsxFileName, lineNumber: 137}, this)
            , _jsxDEV('div', { className: "relative", children: [
              _jsxDEV('div', { className: "absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2"       ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 139}, this )
              , milestones.map((milestone, index) => (
                _jsxDEV('div', {

                  className: `relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`,
 children: [
                  _jsxDEV('div', { className: `flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`, children: [
                    _jsxDEV('span', { className: "text-sm text-secondary font-medium"  , children: milestone.year}, void 0, false, {fileName: _jsxFileName, lineNumber: 146}, this)
                    , _jsxDEV('h3', { className: "font-display font-semibold text-lg"  , children: milestone.title}, void 0, false, {fileName: _jsxFileName, lineNumber: 147}, this)
                    , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: milestone.description}, void 0, false, {fileName: _jsxFileName, lineNumber: 148}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 145}, this)
                  , _jsxDEV('div', { className: "absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-background md:-translate-x-1/2"         ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 150}, this )
                ]}, index, true, {fileName: _jsxFileName, lineNumber: 141}, this)
              ))
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 138}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 136}, this)

          /* CTA */
          , _jsxDEV('div', { className: "text-center bg-muted/50 rounded-2xl p-12"   , children: [
            _jsxDEV('h2', { className: "font-display text-2xl md:text-3xl font-bold mb-4"    , children: "Ready to Make a Difference?"

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 158}, this)
            , _jsxDEV('p', { className: "text-muted-foreground mb-8 max-w-xl mx-auto"   , children: "Join thousands of citizens who are actively building a better India."

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 161}, this)
            , _jsxDEV('div', { className: "flex flex-col sm:flex-row gap-4 justify-center"    , children: [
              _jsxDEV(Button, { size: "lg", className: "bg-secondary hover:bg-secondary/90 gap-2"  , asChild: true, children: 
                _jsxDEV(Link, { to: "/report", children: ["Report an Issue"

                  , _jsxDEV(ArrowRight, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 168}, this )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 166}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 165}, this)
              , _jsxDEV(Button, { size: "lg", variant: "outline", asChild: true, children: 
                _jsxDEV(Link, { to: "/contact", children: "Contact Us" }, void 0, false, {fileName: _jsxFileName, lineNumber: 172}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 171}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 164}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 157}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 50}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 49}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 48}, this)
  );
}
