const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\pages\\Resources.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Car, 
  Users, 
  Shield, 
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Phone,
  ArrowRight
} from 'lucide-react';

const trafficRules = [
  {
    title: 'Speed Limits',
    content: 'Residential areas: 25-30 km/h | City roads: 50 km/h | Highways: 80-100 km/h. Always follow posted speed limit signs.',
  },
  {
    title: 'Traffic Signals',
    content: 'Red: Stop completely | Yellow: Prepare to stop | Green: Proceed if clear. Never jump traffic signals.',
  },
  {
    title: 'Lane Discipline',
    content: 'Keep left unless overtaking. Use indicators before changing lanes. Check mirrors before any lane change.',
  },
  {
    title: 'Helmet & Seatbelt',
    content: 'Helmets mandatory for two-wheelers. Seatbelts mandatory for all car occupants. Children under 4 years need child seats.',
  },
  {
    title: 'Drunk Driving',
    content: 'Blood alcohol limit: 0.03%. Penalties include heavy fines, license suspension, and imprisonment.',
  },
  {
    title: 'Mobile Phone Usage',
    content: 'Using mobile phones while driving is illegal. Use hands-free devices or pull over safely to attend calls.',
  },
];

const civicDuties = [
  {
    title: 'Waste Segregation',
    content: 'Separate wet waste (biodegradable) and dry waste (recyclable). Use designated bins. Never litter in public spaces.',
  },
  {
    title: 'Water Conservation',
    content: 'Report water leakages immediately. Use water responsibly. Rainwater harvesting is encouraged.',
  },
  {
    title: 'Public Property',
    content: 'Do not vandalize or damage public property. Report any damage you notice. Keep public spaces clean.',
  },
  {
    title: 'Noise Pollution',
    content: 'Avoid honking unnecessarily. Keep music/TV volume low. No loudspeakers after 10 PM in residential areas.',
  },
  {
    title: 'Queue System',
    content: 'Always stand in queues at public places. Be patient and courteous. Give priority to elderly and disabled.',
  },
  {
    title: 'Voting',
    content: 'Voting is both a right and duty. Register as a voter when eligible. Participate in all elections.',
  },
];

const emergencyNumbers = [
  { service: 'Police', number: '100', icon: Shield },
  { service: 'Fire', number: '101', icon: AlertTriangle },
  { service: 'Ambulance', number: '102', icon: Phone },
  { service: 'Women Helpline', number: '1091', icon: Users },
  { service: 'Child Helpline', number: '1098', icon: Users },
  { service: 'National Emergency', number: '112', icon: Phone },
];

const faqs = [
  {
    question: 'How do I report a civic issue?',
    answer: 'Click on "Report Now" in the navigation, select the category of issue, upload photos, add location details, and submit. You will receive a unique tracking ID.',
  },
  {
    question: 'How long does it take for an issue to be resolved?',
    answer: 'Resolution time varies based on the severity and type of issue. Simple issues may be resolved within 48-72 hours, while complex issues may take 2-4 weeks.',
  },
  {
    question: 'Can I report anonymously?',
    answer: 'Yes, while we encourage registration for tracking purposes, you can submit basic reports without creating an account.',
  },
  {
    question: 'How do I track my report?',
    answer: 'Use your unique Report ID on the "Track Report" page. You can also view all your reports in your dashboard after signing in.',
  },
  {
    question: 'What types of issues can I report?',
    answer: 'You can report garbage dumping, potholes, streetlight issues, traffic problems, water supply issues, vandalism, drainage problems, and other civic concerns.',
  },
  {
    question: 'Is this platform connected to government authorities?',
    answer: 'CivicIndia works in partnership with municipal corporations and Smart Cities Mission to ensure reports reach the concerned authorities.',
  },
];

export default function Resources() {
  return (
    _jsxDEV(Layout, { children: 
      _jsxDEV('div', { className: "py-12 lg:py-20" , children: 
        _jsxDEV('div', { className: "container mx-auto px-4"  , children: [
          /* Header */
          _jsxDEV('div', { className: "max-w-3xl mx-auto text-center mb-12"   , children: [
            _jsxDEV('h1', { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-4"     , children: "Resources & Guidelines"

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 115}, this)
            , _jsxDEV('p', { className: "text-muted-foreground text-lg" , children: "Everything you need to know about civic responsibilities, traffic rules, and emergency services."

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 118}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 114}, this)

          /* Tabs */
          , _jsxDEV(Tabs, { defaultValue: "traffic", className: "max-w-4xl mx-auto" , children: [
            _jsxDEV(TabsList, { className: "grid grid-cols-4 w-full mb-8"   , children: [
              _jsxDEV(TabsTrigger, { value: "traffic", className: "gap-2", children: [
                _jsxDEV(Car, { className: "h-4 w-4 hidden sm:block"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 127}, this ), "Traffic"

              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 126}, this)
              , _jsxDEV(TabsTrigger, { value: "civic", className: "gap-2", children: [
                _jsxDEV(Users, { className: "h-4 w-4 hidden sm:block"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 131}, this ), "Civic Duties"

              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 130}, this)
              , _jsxDEV(TabsTrigger, { value: "safety", className: "gap-2", children: [
                _jsxDEV(Shield, { className: "h-4 w-4 hidden sm:block"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 135}, this ), "Safety"

              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 134}, this)
              , _jsxDEV(TabsTrigger, { value: "faq", className: "gap-2", children: [
                _jsxDEV(HelpCircle, { className: "h-4 w-4 hidden sm:block"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 139}, this ), "FAQ"

              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 138}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 125}, this)

            /* Traffic Rules */
            , _jsxDEV(TabsContent, { value: "traffic", children: 
              _jsxDEV(Card, { children: [
                _jsxDEV(CardHeader, { children: [
                  _jsxDEV(CardTitle, { className: "flex items-center gap-2"  , children: [
                    _jsxDEV(Car, { className: "h-5 w-5 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 149}, this ), "Traffic Rules & Road Safety"

                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 148}, this)
                  , _jsxDEV(CardDescription, { children: "Know the rules of the road to ensure safe travel for everyone."

                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 152}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 147}, this)
                , _jsxDEV(CardContent, { children: 
                  _jsxDEV('div', { className: "grid md:grid-cols-2 gap-4"  , children: 
                    trafficRules.map((rule) => (
                      _jsxDEV('div', { className: "p-4 rounded-lg bg-muted/50"  , children: [
                        _jsxDEV('h3', { className: "font-semibold flex items-center gap-2 mb-2"    , children: [
                          _jsxDEV(CheckCircle, { className: "h-4 w-4 text-accent"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 161}, this )
                          , rule.title
                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 160}, this)
                        , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: rule.content}, void 0, false, {fileName: _jsxFileName, lineNumber: 164}, this)
                      ]}, rule.title, true, {fileName: _jsxFileName, lineNumber: 159}, this)
                    ))
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 157}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 156}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 146}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 145}, this)

            /* Civic Duties */
            , _jsxDEV(TabsContent, { value: "civic", children: 
              _jsxDEV(Card, { children: [
                _jsxDEV(CardHeader, { children: [
                  _jsxDEV(CardTitle, { className: "flex items-center gap-2"  , children: [
                    _jsxDEV(Users, { className: "h-5 w-5 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 177}, this ), "Civic Responsibilities"

                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 176}, this)
                  , _jsxDEV(CardDescription, { children: "Your duties as a responsible citizen of India."

                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 180}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 175}, this)
                , _jsxDEV(CardContent, { children: 
                  _jsxDEV('div', { className: "grid md:grid-cols-2 gap-4"  , children: 
                    civicDuties.map((duty) => (
                      _jsxDEV('div', { className: "p-4 rounded-lg bg-muted/50"  , children: [
                        _jsxDEV('h3', { className: "font-semibold flex items-center gap-2 mb-2"    , children: [
                          _jsxDEV(CheckCircle, { className: "h-4 w-4 text-accent"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 189}, this )
                          , duty.title
                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 188}, this)
                        , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: duty.content}, void 0, false, {fileName: _jsxFileName, lineNumber: 192}, this)
                      ]}, duty.title, true, {fileName: _jsxFileName, lineNumber: 187}, this)
                    ))
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 185}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 184}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 174}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 173}, this)

            /* Safety */
            , _jsxDEV(TabsContent, { value: "safety", children: 
              _jsxDEV(Card, { children: [
                _jsxDEV(CardHeader, { children: [
                  _jsxDEV(CardTitle, { className: "flex items-center gap-2"  , children: [
                    _jsxDEV(Shield, { className: "h-5 w-5 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 205}, this ), "Emergency Numbers & Safety Tips"

                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 204}, this)
                  , _jsxDEV(CardDescription, { children: "Important emergency contacts and safety guidelines."

                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 208}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 203}, this)
                , _jsxDEV(CardContent, { className: "space-y-8", children: [
                  /* Emergency Numbers */
                  _jsxDEV('div', { children: [
                    _jsxDEV('h3', { className: "font-semibold mb-4" , children: "Emergency Helplines" }, void 0, false, {fileName: _jsxFileName, lineNumber: 215}, this)
                    , _jsxDEV('div', { className: "grid grid-cols-2 md:grid-cols-3 gap-4"   , children: 
                      emergencyNumbers.map((emergency) => (
                        _jsxDEV('div', { className: "p-4 rounded-lg bg-destructive/10 text-center"   , children: [
                          _jsxDEV(emergency.icon, { className: "h-6 w-6 mx-auto mb-2 text-destructive"    ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 219}, this )
                          , _jsxDEV('p', { className: "font-bold text-2xl text-destructive"  , children: emergency.number}, void 0, false, {fileName: _jsxFileName, lineNumber: 220}, this)
                          , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: emergency.service}, void 0, false, {fileName: _jsxFileName, lineNumber: 221}, this)
                        ]}, emergency.service, true, {fileName: _jsxFileName, lineNumber: 218}, this)
                      ))
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 216}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 214}, this)

                  /* Safety Tips */
                  , _jsxDEV('div', { children: [
                    _jsxDEV('h3', { className: "font-semibold mb-4" , children: "General Safety Tips"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 229}, this)
                    , _jsxDEV('div', { className: "grid md:grid-cols-2 gap-4"  , children: [
                      _jsxDEV('div', { className: "p-4 rounded-lg bg-muted/50"  , children: [
                        _jsxDEV('h4', { className: "font-medium mb-2" , children: "Personal Safety" }, void 0, false, {fileName: _jsxFileName, lineNumber: 232}, this)
                        , _jsxDEV('ul', { className: "text-sm text-muted-foreground space-y-1"  , children: [
                          _jsxDEV('li', { children: "• Keep emergency contacts saved on speed dial"       }, void 0, false, {fileName: _jsxFileName, lineNumber: 234}, this)
                          , _jsxDEV('li', { children: "• Share live location with family when traveling late"        }, void 0, false, {fileName: _jsxFileName, lineNumber: 235}, this)
                          , _jsxDEV('li', { children: "• Be aware of your surroundings"     }, void 0, false, {fileName: _jsxFileName, lineNumber: 236}, this)
                          , _jsxDEV('li', { children: "• Avoid isolated areas at night"     }, void 0, false, {fileName: _jsxFileName, lineNumber: 237}, this)
                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 233}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 231}, this)
                      , _jsxDEV('div', { className: "p-4 rounded-lg bg-muted/50"  , children: [
                        _jsxDEV('h4', { className: "font-medium mb-2" , children: "Online Safety" }, void 0, false, {fileName: _jsxFileName, lineNumber: 241}, this)
                        , _jsxDEV('ul', { className: "text-sm text-muted-foreground space-y-1"  , children: [
                          _jsxDEV('li', { children: "• Never share OTP or passwords"     }, void 0, false, {fileName: _jsxFileName, lineNumber: 243}, this)
                          , _jsxDEV('li', { children: "• Verify before clicking unknown links"     }, void 0, false, {fileName: _jsxFileName, lineNumber: 244}, this)
                          , _jsxDEV('li', { children: "• Report online harassment to Cyber Crime"      }, void 0, false, {fileName: _jsxFileName, lineNumber: 245}, this)
                          , _jsxDEV('li', { children: "• Use strong, unique passwords"    }, void 0, false, {fileName: _jsxFileName, lineNumber: 246}, this)
                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 242}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 240}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 230}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 228}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 212}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 202}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 201}, this)

            /* FAQ */
            , _jsxDEV(TabsContent, { value: "faq", children: 
              _jsxDEV(Card, { children: [
                _jsxDEV(CardHeader, { children: [
                  _jsxDEV(CardTitle, { className: "flex items-center gap-2"  , children: [
                    _jsxDEV(HelpCircle, { className: "h-5 w-5 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 260}, this ), "Frequently Asked Questions"

                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 259}, this)
                  , _jsxDEV(CardDescription, { children: "Common questions about using CivicIndia."

                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 263}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 258}, this)
                , _jsxDEV(CardContent, { children: 
                  _jsxDEV(Accordion, { type: "single", collapsible: true, className: "w-full", children: 
                    faqs.map((faq, index) => (
                      _jsxDEV(AccordionItem, { value: `item-${index}`, children: [
                        _jsxDEV(AccordionTrigger, { className: "text-left", children: 
                          faq.question
                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 271}, this)
                        , _jsxDEV(AccordionContent, { className: "text-muted-foreground", children: 
                          faq.answer
                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 274}, this)
                      ]}, index, true, {fileName: _jsxFileName, lineNumber: 270}, this)
                    ))
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 268}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 267}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 257}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 256}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 124}, this)

          /* CTA */
          , _jsxDEV('div', { className: "max-w-4xl mx-auto mt-12 text-center"   , children: [
            _jsxDEV('p', { className: "text-muted-foreground mb-4" , children: "Want to test your knowledge? Take our civic education quizzes!"

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 287}, this)
            , _jsxDEV(Button, { asChild: true, className: "bg-secondary hover:bg-secondary/90 gap-2"  , children: 
              _jsxDEV(Link, { to: "/education", children: ["Start Learning"

                , _jsxDEV(ArrowRight, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 293}, this )
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 291}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 290}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 286}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 112}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 111}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 110}, this)
  );
}
