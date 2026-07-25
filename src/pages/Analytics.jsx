const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\pages\\Analytics.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  TrendingUp, FileText, CheckCircle, Clock, AlertTriangle, ShieldCheck, ArrowLeft, Loader2
} from 'lucide-react';










const COLORS = ['#3b82f6', '#f97316', '#22c55e', '#ef4444', '#a855f7', '#06b6d4', '#eab308'];

export default function Analytics() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    setLoading(true);
    const token = localStorage.getItem('civic_auth_token');
    try {
      const response = await fetch('http://localhost:5000/api/analytics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (e) {
      console.error("Error fetching analytics:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
      } else {
        fetchAnalytics();
      }
    }
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      _jsxDEV(Layout, { children: 
        _jsxDEV('div', { className: "min-h-[70vh] flex items-center justify-center"   , children: 
          _jsxDEV(Loader2, { className: "h-8 w-8 animate-spin text-primary"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 67}, this )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 66}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 65}, this)
    );
  }

  if (!data) {
    return (
      _jsxDEV(Layout, { children: 
        _jsxDEV('div', { className: "container mx-auto px-4 py-12 text-center"    , children: [
          _jsxDEV(AlertTriangle, { className: "h-12 w-12 text-destructive mx-auto mb-4"    ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 77}, this )
          , _jsxDEV('h2', { className: "text-xl font-bold mb-2"  , children: "Failed to load analytics"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 78}, this)
          , _jsxDEV('p', { className: "text-muted-foreground mb-4" , children: "Please make sure the backend Python server is running and database is active."            }, void 0, false, {fileName: _jsxFileName, lineNumber: 79}, this)
          , _jsxDEV(Button, { onClick: fetchAnalytics, children: "Retry"}, void 0, false, {fileName: _jsxFileName, lineNumber: 80}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 76}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 75}, this)
    );
  }

  // Format Status Split for PieChart
  const statusData = data.status_split.map(item => ({
    name: item.status,
    value: item.count
  }));

  // Format Category Split for BarChart
  const categoryData = data.category_split.map(item => ({
    name: item.category.charAt(0).toUpperCase() + item.category.slice(1),
    Count: item.count
  }));

  // Format Area Split for BarChart
  const areaData = data.area_split.map(item => ({
    name: item.city || 'Other',
    Complaints: item.count
  }));

  // AI Gauge calculations
  const aiCorrectCount = Math.round(data.ai_accuracy);

  return (
    _jsxDEV(Layout, { children: 
      _jsxDEV('div', { className: "py-8", children: 
        _jsxDEV('div', { className: "container mx-auto px-4"  , children: [
          /* Header */
          _jsxDEV('div', { className: "flex items-center gap-4 mb-8"   , children: [
            _jsxDEV(Button, { variant: "outline", size: "sm", onClick: () => navigate(-1), className: "gap-2", children: [
              _jsxDEV(ArrowLeft, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 114}, this ), " Back"
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 113}, this)
            , _jsxDEV('div', { children: [
              _jsxDEV('h1', { className: "font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2"       , children: [
                _jsxDEV(TrendingUp, { className: "h-8 w-8 text-primary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 118}, this ), "Civic Analytics Dashboard"

              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 117}, this)
              , _jsxDEV('p', { className: "text-muted-foreground text-sm" , children: "Real-time statistics, category distribution, and AI accuracy metrics"       }, void 0, false, {fileName: _jsxFileName, lineNumber: 121}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 116}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 112}, this)

          /* Core Metrics Row */
          , _jsxDEV('div', { className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"    , children: [
            _jsxDEV(Card, { className: "border shadow-sm" , children: 
              _jsxDEV(CardContent, { className: "pt-6", children: 
                _jsxDEV('div', { className: "flex items-center gap-4"  , children: [
                  _jsxDEV('div', { className: "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"      , children: 
                    _jsxDEV(FileText, { className: "h-6 w-6 text-primary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 131}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 130}, this)
                  , _jsxDEV('div', { children: [
                    _jsxDEV('p', { className: "text-3xl font-display font-bold"  , children: data.total_complaints}, void 0, false, {fileName: _jsxFileName, lineNumber: 134}, this)
                    , _jsxDEV('p', { className: "text-sm text-muted-foreground font-medium"  , children: "Total Complaints Filed"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 135}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 133}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 129}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 128}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 127}, this)

            , _jsxDEV(Card, { className: "border shadow-sm" , children: 
              _jsxDEV(CardContent, { className: "pt-6", children: 
                _jsxDEV('div', { className: "flex items-center gap-4"  , children: [
                  _jsxDEV('div', { className: "w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center"      , children: 
                    _jsxDEV(CheckCircle, { className: "h-6 w-6 text-green-600"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 145}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 144}, this)
                  , _jsxDEV('div', { children: [
                    _jsxDEV('p', { className: "text-3xl font-display font-bold"  , children: 
                      _optionalChain([data, 'access', _ => _.status_split, 'access', _2 => _2.find, 'call', _3 => _3(s => s.status === 'Resolved'), 'optionalAccess', _4 => _4.count]) || 0
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 148}, this)
                    , _jsxDEV('p', { className: "text-sm text-muted-foreground font-medium"  , children: "Resolved Complaints" }, void 0, false, {fileName: _jsxFileName, lineNumber: 151}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 147}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 143}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 142}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 141}, this)

            , _jsxDEV(Card, { className: "border shadow-sm" , children: 
              _jsxDEV(CardContent, { className: "pt-6", children: 
                _jsxDEV('div', { className: "flex items-center gap-4"  , children: [
                  _jsxDEV('div', { className: "w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"      , children: 
                    _jsxDEV(Clock, { className: "h-6 w-6 text-blue-600"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 161}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 160}, this)
                  , _jsxDEV('div', { children: [
                    _jsxDEV('p', { className: "text-3xl font-display font-bold"  , children: 
                      _optionalChain([data, 'access', _5 => _5.status_split, 'access', _6 => _6.find, 'call', _7 => _7(s => s.status === 'Pending'), 'optionalAccess', _8 => _8.count]) || 0
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 164}, this)
                    , _jsxDEV('p', { className: "text-sm text-muted-foreground font-medium"  , children: "Pending Review" }, void 0, false, {fileName: _jsxFileName, lineNumber: 167}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 163}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 159}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 158}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 157}, this)

            , _jsxDEV(Card, { className: "border shadow-sm bg-gradient-to-r from-accent/10 to-primary/5"    , children: 
              _jsxDEV(CardContent, { className: "pt-6", children: 
                _jsxDEV('div', { className: "flex items-center gap-4"  , children: [
                  _jsxDEV('div', { className: "w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center"      , children: 
                    _jsxDEV(ShieldCheck, { className: "h-6 w-6 text-accent-foreground"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 177}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 176}, this)
                  , _jsxDEV('div', { children: [
                    _jsxDEV('p', { className: "text-3xl font-display font-bold"  , children: [data.ai_accuracy, "%"]}, void 0, true, {fileName: _jsxFileName, lineNumber: 180}, this)
                    , _jsxDEV('p', { className: "text-sm text-muted-foreground font-medium"  , children: "AI CNN Accuracy"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 181}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 179}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 175}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 174}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 173}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 126}, this)

          /* Charts Grid */
          , _jsxDEV('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-6"   , children: [

            /* Chart 1: Resolved vs Pending Pie Chart */
            _jsxDEV(Card, { className: "border shadow-md" , children: [
              _jsxDEV(CardHeader, { children: [
                _jsxDEV(CardTitle, { children: "Resolution Status" }, void 0, false, {fileName: _jsxFileName, lineNumber: 194}, this)
                , _jsxDEV(CardDescription, { children: "Share of pending, in-progress, resolved, and rejected complaints"       }, void 0, false, {fileName: _jsxFileName, lineNumber: 195}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 193}, this)
              , _jsxDEV(CardContent, { className: "h-80", children: 
                statusData.length === 0 ? (
                  _jsxDEV('div', { className: "h-full flex items-center justify-center text-muted-foreground"    , children: "No data available"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 199}, this)
                ) : (
                  _jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: 
                    _jsxDEV(PieChart, { children: [
                      _jsxDEV(Pie, {
                        data: statusData,
                        cx: "50%",
                        cy: "50%",
                        innerRadius: 60,
                        outerRadius: 85,
                        paddingAngle: 5,
                        dataKey: "value",
 children: 
                        statusData.map((entry, index) => (
                          _jsxDEV(Cell, { fill: COLORS[index % COLORS.length],}, `cell-${index}`, false, {fileName: _jsxFileName, lineNumber: 213}, this )
                        ))
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 203}, this)
                      , _jsxDEV(Tooltip, { formatter: (value) => [`${value} complaints`, 'Count'],}, void 0, false, {fileName: _jsxFileName, lineNumber: 216}, this )
                      , _jsxDEV(Legend, { verticalAlign: "bottom", height: 36,}, void 0, false, {fileName: _jsxFileName, lineNumber: 217}, this )
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 202}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 201}, this)
                )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 197}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 192}, this)

            /* Chart 2: Complaints by Category Bar Chart */
            , _jsxDEV(Card, { className: "border shadow-md" , children: [
              _jsxDEV(CardHeader, { children: [
                _jsxDEV(CardTitle, { children: "Complaints by Category"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 227}, this)
                , _jsxDEV(CardDescription, { children: "Frequency of issue categories identified by CNN AI model"        }, void 0, false, {fileName: _jsxFileName, lineNumber: 228}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 226}, this)
              , _jsxDEV(CardContent, { className: "h-80", children: 
                categoryData.length === 0 ? (
                  _jsxDEV('div', { className: "h-full flex items-center justify-center text-muted-foreground"    , children: "No data available"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 232}, this)
                ) : (
                  _jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: 
                    _jsxDEV(BarChart, { data: categoryData, margin: { top: 10, right: 10, left: -20, bottom: 0 }, children: [
                      _jsxDEV(XAxis, { dataKey: "name", tick: { fontSize: 11 },}, void 0, false, {fileName: _jsxFileName, lineNumber: 236}, this )
                      , _jsxDEV(YAxis, { tick: { fontSize: 11 },}, void 0, false, {fileName: _jsxFileName, lineNumber: 237}, this )
                      , _jsxDEV(Tooltip, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 238}, this )
                      , _jsxDEV(Bar, { dataKey: "Count", fill: "#f97316", radius: [4, 4, 0, 0], children: 
                        categoryData.map((entry, index) => (
                          _jsxDEV(Cell, { fill: COLORS[index % COLORS.length],}, `cell-${index}`, false, {fileName: _jsxFileName, lineNumber: 241}, this )
                        ))
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 239}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 235}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 234}, this)
                )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 230}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 225}, this)

            /* Chart 3: Complaints by Area Bar Chart */
            , _jsxDEV(Card, { className: "border shadow-md" , children: [
              _jsxDEV(CardHeader, { children: [
                _jsxDEV(CardTitle, { children: "Complaints by Area / City"    }, void 0, false, {fileName: _jsxFileName, lineNumber: 253}, this)
                , _jsxDEV(CardDescription, { children: "Geographic distribution of reported civic issues"     }, void 0, false, {fileName: _jsxFileName, lineNumber: 254}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 252}, this)
              , _jsxDEV(CardContent, { className: "h-80", children: 
                areaData.length === 0 ? (
                  _jsxDEV('div', { className: "h-full flex items-center justify-center text-muted-foreground"    , children: "No data available"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 258}, this)
                ) : (
                  _jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: 
                    _jsxDEV(BarChart, { data: areaData, layout: "vertical", margin: { top: 10, right: 10, left: 10, bottom: 10 }, children: [
                      _jsxDEV(XAxis, { type: "number", tick: { fontSize: 11 },}, void 0, false, {fileName: _jsxFileName, lineNumber: 262}, this )
                      , _jsxDEV(YAxis, { dataKey: "name", type: "category", tick: { fontSize: 11 }, width: 80,}, void 0, false, {fileName: _jsxFileName, lineNumber: 263}, this )
                      , _jsxDEV(Tooltip, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 264}, this )
                      , _jsxDEV(Bar, { dataKey: "Complaints", fill: "#3b82f6", radius: [0, 4, 4, 0],}, void 0, false, {fileName: _jsxFileName, lineNumber: 265}, this )
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 261}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 260}, this)
                )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 256}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 251}, this)

            /* Chart 4: AI Accuracy Gauge Widget */
            , _jsxDEV(Card, { className: "border shadow-md" , children: [
              _jsxDEV(CardHeader, { children: [
                _jsxDEV(CardTitle, { children: "AI Prediction Accuracy Analysis"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 275}, this)
                , _jsxDEV(CardDescription, { children: "Percentage of correct categories predicted by the CNN model versus citizen confirmation"           }, void 0, false, {fileName: _jsxFileName, lineNumber: 276}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 274}, this)
              , _jsxDEV(CardContent, { className: "flex flex-col items-center justify-center h-80 pt-0"     , children: [
                _jsxDEV('div', { className: "relative flex items-center justify-center w-40 h-40"     , children: [
                  /* Circular progress display */
                  _jsxDEV('svg', { className: "w-full h-full transform -rotate-90"   , children: [
                    _jsxDEV('circle', {
                      cx: "80",
                      cy: "80",
                      r: "70",
                      className: "text-muted-foreground/10",
                      strokeWidth: "12",
                      stroke: "currentColor",
                      fill: "transparent",}, void 0, false, {fileName: _jsxFileName, lineNumber: 282}, this
                    )
                    , _jsxDEV('circle', {
                      cx: "80",
                      cy: "80",
                      r: "70",
                      className: "text-accent",
                      strokeWidth: "12",
                      strokeDasharray: 440,
                      strokeDashoffset: 440 - (440 * data.ai_accuracy) / 100,
                      strokeLinecap: "round",
                      stroke: "currentColor",
                      fill: "transparent",}, void 0, false, {fileName: _jsxFileName, lineNumber: 291}, this
                    )
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 281}, this)
                  , _jsxDEV('div', { className: "absolute flex flex-col items-center justify-center"    , children: [
                    _jsxDEV('span', { className: "text-3xl font-bold font-display"  , children: [data.ai_accuracy, "%"]}, void 0, true, {fileName: _jsxFileName, lineNumber: 305}, this)
                    , _jsxDEV('span', { className: "text-xs text-muted-foreground mt-1"  , children: "Accuracy Score" }, void 0, false, {fileName: _jsxFileName, lineNumber: 306}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 304}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 279}, this)
                , _jsxDEV('div', { className: "text-center mt-4" , children: [
                  _jsxDEV('p', { className: "text-sm font-semibold text-foreground"  , children: "CNN Classification Performance"

                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 310}, this)
                  , _jsxDEV('p', { className: "text-xs text-muted-foreground mt-1 px-4 leading-relaxed"    , children: "Accuracy is computed dynamically in real time from confirmation triggers in the MySQL database logs."

                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 313}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 309}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 278}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 273}, this)

            /* Chart 5: Monthly Reporting Trends Line Chart */
            , _jsxDEV(Card, { className: "border shadow-md lg:col-span-2"  , children: [
              _jsxDEV(CardHeader, { children: [
                _jsxDEV(CardTitle, { children: "Complaint Volume Trends"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 323}, this)
                , _jsxDEV(CardDescription, { children: "Monthly growth profile of reported concerns"     }, void 0, false, {fileName: _jsxFileName, lineNumber: 324}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 322}, this)
              , _jsxDEV(CardContent, { className: "h-80", children: 
                data.monthly_trend.length === 0 ? (
                  _jsxDEV('div', { className: "h-full flex items-center justify-center text-muted-foreground"    , children: "No data available"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 328}, this)
                ) : (
                  _jsxDEV(ResponsiveContainer, { width: "100%", height: "100%", children: 
                    _jsxDEV(LineChart, { data: data.monthly_trend, margin: { top: 10, right: 30, left: -20, bottom: 0 }, children: [
                      _jsxDEV(XAxis, { dataKey: "month", tick: { fontSize: 11 },}, void 0, false, {fileName: _jsxFileName, lineNumber: 332}, this )
                      , _jsxDEV(YAxis, { tick: { fontSize: 11 },}, void 0, false, {fileName: _jsxFileName, lineNumber: 333}, this )
                      , _jsxDEV(Tooltip, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 334}, this )
                      , _jsxDEV(Line, { type: "monotone", dataKey: "count", stroke: "#a855f7", strokeWidth: 3, activeDot: { r: 8 },}, void 0, false, {fileName: _jsxFileName, lineNumber: 335}, this )
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 331}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 330}, this)
                )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 326}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 321}, this)

          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 189}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 110}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 109}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 108}, this)
  );
}
