const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\pages\\TrackReport.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MapPin, 
  Calendar,
  User,
  MessageSquare,
  Loader2,
  FileText,
  ArrowRight,

} from 'lucide-react';




















const statusOrder = ['Pending', 'In Progress', 'Resolved'];

export default function TrackReport() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const statusConfig = {
    Pending: { label: 'Pending', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: FileText },
    'In Progress': { label: 'In Progress', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: Clock },
    Resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
    Rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle },
  };

  const getStatusConfig = (status) => {
    return statusConfig[status] || { label: status, color: 'bg-muted text-muted-foreground', icon: FileText };
  };

  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [searchId, setSearchId] = useState(searchParams.get('id') || '');
  const [report, setReport] = useState(null);
  const [userReports, setUserReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingUserReports, setLoadingUserReports] = useState(false);

  const fetchUserReports = useCallback(async () => {
    const token = localStorage.getItem('civic_auth_token');
    if (!token) return;
    setLoadingUserReports(true);
    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUserReports(data || []);
      } else {
        throw new Error('Failed to fetch user reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoadingUserReports(false);
    }
  }, []);

  const searchReport = useCallback(async (reportId) => {
    if (!reportId || !reportId.trim()) {
      toast({
        title: 'Enter Report ID',
        description: 'Please enter a valid report ID to search.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${reportId}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          toast({
            title: 'Report not found',
            description: 'No report found with this ID. Please check and try again.',
            variant: 'destructive',
          });
          setReport(null);
        } else {
          throw new Error('Failed to search report');
        }
      } else {
        const data = await response.json();
        setReport(data);
      }
    } catch (error) {
      toast({
        title: 'Search failed',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (user) {
      fetchUserReports();
    }
  }, [user, fetchUserReports]);

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      setSearchId(id);
      searchReport(id);
    }
  }, [searchParams, searchReport]);

  const getStatusIndex = (status) => {
    return statusOrder.indexOf(status);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    _jsxDEV(Layout, { children: 
      _jsxDEV('div', { className: "py-8 lg:py-12" , children: 
        _jsxDEV('div', { className: "container mx-auto px-4"  , children: [
          /* Header */
          _jsxDEV('div', { className: "max-w-3xl mx-auto text-center mb-8"   , children: [
            _jsxDEV('h1', { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-4"     , children: "Track Complaint"

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 168}, this)
            , _jsxDEV('p', { className: "text-muted-foreground text-lg" , children: "Enter your complaint tracking number below to check the real-time resolution progress."

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 171}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 167}, this)

          /* Search Box */
          , _jsxDEV(Card, { className: "max-w-2xl mx-auto mb-8 border shadow-md"    , children: 
            _jsxDEV(CardContent, { className: "pt-6", children: 
              _jsxDEV('div', { className: "flex gap-3" , children: [
                _jsxDEV('div', { className: "relative flex-1" , children: [
                  _jsxDEV(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"      ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 181}, this )
                  , _jsxDEV(Input, {
                    placeholder: "Enter Tracking ID (e.g. CIV-20260722-12345)"    ,
                    className: "pl-10",
                    value: searchId,
                    onChange: (e) => setSearchId(e.target.value),
                    onKeyDown: (e) => e.key === 'Enter' && searchReport(searchId),}, void 0, false, {fileName: _jsxFileName, lineNumber: 182}, this
                  )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 180}, this)
                , _jsxDEV(Button, { onClick: () => searchReport(searchId), disabled: loading, className: "bg-primary hover:bg-primary/90 text-white"  , children: 
                  loading ? _jsxDEV(Loader2, { className: "h-4 w-4 animate-spin"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 191}, this ) : 'Search'
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 190}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 179}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 178}, this)
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 177}, this)

          /* Report Details */
          , report && (
            _jsxDEV(Card, { className: "max-w-4xl mx-auto mb-8 animate-fade-in border shadow-lg"     , children: [
              _jsxDEV(CardHeader, { className: "bg-muted/30 border-b" , children: 
                _jsxDEV('div', { className: "flex flex-col md:flex-row md:items-center justify-between gap-4"     , children: [
                  _jsxDEV('div', { children: [
                    _jsxDEV(CardTitle, { className: "text-xl", children: report.title}, void 0, false, {fileName: _jsxFileName, lineNumber: 203}, this)
                    , _jsxDEV(CardDescription, { className: "font-mono text-primary font-bold mt-1"   , children: report.complaint_number}, void 0, false, {fileName: _jsxFileName, lineNumber: 204}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 202}, this)
                  , _jsxDEV(Badge, { className: `${getStatusConfig(report.status).color} px-3 py-1 text-sm border`, children: 
                    getStatusConfig(report.status).label
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 206}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 201}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 200}, this)
              , _jsxDEV(CardContent, { className: "space-y-6 pt-6" , children: [
                /* Status Timeline */
                report.status !== 'Rejected' && (
                  _jsxDEV('div', { className: "relative py-4 px-2"  , children: [
                    _jsxDEV('div', { className: "flex items-center justify-between"  , children: 
                      statusOrder.map((status, index) => {
                        const isCompleted = getStatusIndex(report.status) >= index;
                        const isCurrent = report.status === status;
                        const StatusIcon = getStatusConfig(status).icon;
                        
                        return (
                          _jsxDEV('div', { className: "flex flex-col items-center relative z-10"    , children: [
                            _jsxDEV('div', { className: `w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                              isCompleted 
                                ? 'bg-secondary border-secondary text-white' 
                                : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                            } ${isCurrent ? 'ring-4 ring-secondary/30 scale-110' : ''}`, children: 
                              _jsxDEV(StatusIcon, { className: "h-5 w-5" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 228}, this )
                            }, void 0, false, {fileName: _jsxFileName, lineNumber: 223}, this)
                            , _jsxDEV('p', { className: `text-xs mt-2 text-center font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`, children: 
                              _optionalChain([statusConfig, 'access', _ => _[status], 'optionalAccess', _2 => _2.label]) || status
                            }, void 0, false, {fileName: _jsxFileName, lineNumber: 230}, this)
                          ]}, status, true, {fileName: _jsxFileName, lineNumber: 222}, this)
                        );
                      })
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 215}, this)
                    /* Progress Line */
                    , _jsxDEV('div', { className: "absolute top-9 left-10 right-10 h-1 bg-muted -z-0"      , children: 
                      _jsxDEV('div', { 
                        className: "h-full bg-secondary transition-all duration-500"   ,
                        style: { 
                          width: report.status === 'Resolved' 
                            ? '100%' 
                            : report.status === 'In Progress' 
                            ? '50%' 
                            : '0%' 
                        },}, void 0, false, {fileName: _jsxFileName, lineNumber: 239}, this
                      )
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 238}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 214}, this)
                )

                /* Details Grid */
                , _jsxDEV('div', { className: "grid md:grid-cols-2 gap-6 pt-6 border-t"    , children: [
                  _jsxDEV('div', { className: "space-y-4", children: [
                    _jsxDEV('div', { children: [
                      _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: t('field_category')}, void 0, false, {fileName: _jsxFileName, lineNumber: 257}, this)
                      , _jsxDEV('p', { className: "font-semibold capitalize text-foreground"  , children: t(`cat_${report.category}`) || report.category}, void 0, false, {fileName: _jsxFileName, lineNumber: 258}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 256}, this)
                    , _jsxDEV('div', { children: [
                      _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: t('field_severity')}, void 0, false, {fileName: _jsxFileName, lineNumber: 261}, this)
                      , _jsxDEV('p', { className: "font-semibold capitalize text-foreground"  , children: t(`sev_${report.severity}`) || report.severity}, void 0, false, {fileName: _jsxFileName, lineNumber: 262}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 260}, this)
                    , _jsxDEV('div', { children: [
                      _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: t('field_description')}, void 0, false, {fileName: _jsxFileName, lineNumber: 265}, this)
                      , _jsxDEV('p', { className: "text-foreground leading-relaxed whitespace-pre-wrap"  , children: report.description}, void 0, false, {fileName: _jsxFileName, lineNumber: 266}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 264}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 255}, this)
                  , _jsxDEV('div', { className: "space-y-4", children: [
                    _jsxDEV('div', { className: "flex items-start gap-2"  , children: [
                      _jsxDEV(MapPin, { className: "h-5 w-5 text-muted-foreground mt-0.5"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 271}, this )
                      , _jsxDEV('div', { children: [
                        _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Location Pinpointed" }, void 0, false, {fileName: _jsxFileName, lineNumber: 273}, this)
                        , _jsxDEV('p', { className: "font-semibold text-foreground" , children: 
                          [report.address, report.city, report.state, report.pincode].filter(Boolean).join(', ') || 'Not specified'
                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 274}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 272}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 270}, this)
                    , _jsxDEV('div', { className: "flex items-start gap-2"  , children: [
                      _jsxDEV(Calendar, { className: "h-5 w-5 text-muted-foreground mt-0.5"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 280}, this )
                      , _jsxDEV('div', { children: [
                        _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Reported On" }, void 0, false, {fileName: _jsxFileName, lineNumber: 282}, this)
                        , _jsxDEV('p', { className: "font-semibold text-foreground" , children: formatDate(report.created_at)}, void 0, false, {fileName: _jsxFileName, lineNumber: 283}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 281}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 279}, this)
                    , report.assigned_to && (
                      _jsxDEV('div', { className: "flex items-start gap-2"  , children: [
                        _jsxDEV(User, { className: "h-5 w-5 text-muted-foreground mt-0.5"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 288}, this )
                        , _jsxDEV('div', { children: [
                          _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Assigned Officer" }, void 0, false, {fileName: _jsxFileName, lineNumber: 290}, this)
                          , _jsxDEV('p', { className: "font-semibold text-foreground" , children: report.assigned_to}, void 0, false, {fileName: _jsxFileName, lineNumber: 291}, this)
                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 289}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 287}, this)
                    )
                    , report.authority_remarks && (
                      _jsxDEV('div', { className: "flex items-start gap-2"  , children: [
                        _jsxDEV(MessageSquare, { className: "h-5 w-5 text-muted-foreground mt-0.5"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 297}, this )
                        , _jsxDEV('div', { children: [
                          _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Authority Remarks" }, void 0, false, {fileName: _jsxFileName, lineNumber: 299}, this)
                          , _jsxDEV('p', { className: "font-semibold text-foreground bg-yellow-50 p-2 border border-yellow-200 rounded"      , children: report.authority_remarks}, void 0, false, {fileName: _jsxFileName, lineNumber: 300}, this)
                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 298}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 296}, this)
                    )
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 269}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 254}, this)

                /* Image Preview */
                , report.image_url && (
                  _jsxDEV('div', { className: "pt-6 border-t" , children: [
                    _jsxDEV('p', { className: "text-sm text-muted-foreground mb-3"  , children: "Complaint Evidence Photograph"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 310}, this)
                    , _jsxDEV('div', { className: "max-w-md rounded-lg overflow-hidden border"   , children: 
                      _jsxDEV('a', { href: report.image_url, target: "_blank", rel: "noopener noreferrer" , children: 
                        _jsxDEV('img', { src: report.image_url, alt: "Evidence", className: "w-full h-auto object-cover max-h-80 hover:opacity-90 transition-opacity"     ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 313}, this )
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 312}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 311}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 309}, this)
                )
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 211}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 199}, this)
          )

          /* User's Reports Dashboard list */
          , user && (
            _jsxDEV('div', { className: "max-w-4xl mx-auto" , children: [
              _jsxDEV('h2', { className: "font-display text-xl font-bold text-foreground mb-4"    , children: "Your Previous Complaints"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 325}, this)
              , loadingUserReports ? (
                _jsxDEV('div', { className: "flex items-center justify-center py-12"   , children: 
                  _jsxDEV(Loader2, { className: "h-6 w-6 animate-spin text-primary"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 328}, this )
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 327}, this)
              ) : userReports.length === 0 ? (
                _jsxDEV(Card, { className: "border shadow-sm" , children: 
                  _jsxDEV(CardContent, { className: "py-12 text-center" , children: [
                    _jsxDEV(FileText, { className: "h-12 w-12 text-muted-foreground mx-auto mb-4"    ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 333}, this )
                    , _jsxDEV('p', { className: "text-muted-foreground mb-4" , children: "You have not submitted any complaints yet."      }, void 0, false, {fileName: _jsxFileName, lineNumber: 334}, this)
                    , _jsxDEV(Button, { asChild: true, className: "bg-primary hover:bg-primary/90 text-white"  , children: 
                      _jsxDEV(Link, { to: "/report", children: "File a Complaint Now"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 336}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 335}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 332}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 331}, this)
              ) : (
                _jsxDEV('div', { className: "space-y-3", children: 
                  userReports.map((r) => (
                    _jsxDEV(Card, {
 
                      className: "hover:shadow border cursor-pointer hover:border-primary/40 transition-all"    ,
                      onClick: () => {
                        setSearchId(r.complaint_number);
                        setReport(r);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      },
 children: 
                      _jsxDEV(CardContent, { className: "py-4", children: 
                        _jsxDEV('div', { className: "flex items-center justify-between gap-4"   , children: [
                          _jsxDEV('div', { className: "flex-1 min-w-0" , children: [
                            _jsxDEV('div', { className: "flex items-center gap-2 mb-1"   , children: [
                              _jsxDEV('p', { className: "font-semibold truncate text-foreground"  , children: r.title}, void 0, false, {fileName: _jsxFileName, lineNumber: 356}, this)
                              , _jsxDEV(Badge, { className: `${getStatusConfig(r.status).color} px-2 py-0.5 text-xs border`, variant: "secondary", children: 
                                getStatusConfig(r.status).label
                              }, void 0, false, {fileName: _jsxFileName, lineNumber: 357}, this)
                            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 355}, this)
                            , _jsxDEV('p', { className: "text-xs text-muted-foreground font-mono"  , children: ["ID: "
                               , r.complaint_number, " • Reported: "   , formatDate(r.created_at)
                            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 361}, this)
                          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 354}, this)
                          , _jsxDEV(ArrowRight, { className: "h-5 w-5 text-muted-foreground flex-shrink-0"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 365}, this )
                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 353}, this)
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 352}, this)
                    }, r.id, false, {fileName: _jsxFileName, lineNumber: 343}, this)
                  ))
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 341}, this)
              )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 324}, this)
          )

          /* Not logged in panel */
          , !user && (
            _jsxDEV('div', { className: "max-w-md mx-auto text-center mt-12"   , children: 
              _jsxDEV(Card, { className: "border shadow-sm" , children: 
                _jsxDEV(CardContent, { className: "py-8", children: [
                  _jsxDEV('p', { className: "text-muted-foreground mb-4" , children: "Are you a citizen? Sign in to view and track all your complaints in one place."

                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 380}, this)
                  , _jsxDEV(Button, { asChild: true, className: "bg-primary hover:bg-primary/90 text-white"  , children: 
                    _jsxDEV(Link, { to: "/auth", children: "Sign In / Register"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 384}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 383}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 379}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 378}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 377}, this)
          )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 165}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 164}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 163}, this)
  );
}
