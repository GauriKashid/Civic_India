const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\pages\\Admin.tsx";import {jsxDEV as _jsxDEV, Fragment as _Fragment} from "react/jsx-dev-runtime";import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  LayoutDashboard, 
  FileText, 
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Eye,
  Loader2,
  MapPin,
  TrendingUp
} from 'lucide-react';


























const statusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Resolved', label: 'Resolved' },
  { value: 'Rejected', label: 'Rejected' },
];

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'garbage', label: 'Garbage & Waste' },
  { value: 'pothole', label: 'Potholes & Roads' },
  { value: 'streetlight', label: 'Streetlights' },
  { value: 'traffic', label: 'Traffic Issues' },
  { value: 'water_supply', label: 'Water Supply' },
  { value: 'vandalism', label: 'Vandalism' },
  { value: 'drainage', label: 'Drainage' },
  { value: 'other', label: 'Other' },
];

export default function Admin() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, in_progress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState(null);
  const [updateData, setUpdateData] = useState({ status: '', assigned_to: '', remarks: '' });
  const [updating, setUpdating] = useState(false);

  const fetchReports = useCallback(async () => {
    const token = localStorage.getItem('civic_auth_token');
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setReports(data || []);
        
        // Calculate stats
        const allReports = data || [];
        setStats({
          total: allReports.length,
          pending: allReports.filter((r) => r.status === 'Pending').length,
          in_progress: allReports.filter((r) => r.status === 'In Progress').length,
          resolved: allReports.filter((r) => r.status === 'Resolved').length,
        });
      } else {
        throw new Error('Failed to fetch reports');
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      toast({
        title: 'Access denied',
        description: 'You do not have permission to access this page.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [user, isAdmin, authLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchReports();
    }
  }, [isAdmin, fetchReports]);

  const handleUpdateReport = async () => {
    if (!selectedReport) return;
    
    setUpdating(true);
    const token = localStorage.getItem('civic_auth_token');
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${selectedReport.complaint_number}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: updateData.status,
          assigned_to: updateData.assigned_to,
          authority_remarks: updateData.remarks,
        })
      });

      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.error || 'Failed to update complaint');
      }

      toast({
        title: 'Report updated',
        description: 'The report has been updated successfully.',
      });

      setSelectedReport(null);
      fetchReports();
    } catch (error) {
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const filteredReports = reports.filter(report => {
    // Apply search filter
    const matchesSearch = 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.complaint_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (report.city && report.city.toLowerCase().includes(searchQuery.toLowerCase()));
      
    // Apply category filter
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    
    // Apply status filter
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const colors = {
      Pending: 'bg-blue-100 text-blue-800 border-blue-200',
      'In Progress': 'bg-orange-100 text-orange-800 border-orange-200',
      Resolved: 'bg-green-100 text-green-800 border-green-200',
      Rejected: 'bg-red-100 text-red-800 border-red-200',
    };
    return _jsxDEV(Badge, { className: `${colors[status] || 'bg-muted text-muted-foreground'} px-2 py-0.5 border`, children: status}, void 0, false, {fileName: _jsxFileName, lineNumber: 209}, this);
  };

  if (authLoading) {
    return (
      _jsxDEV(Layout, { showFooter: false, children: 
        _jsxDEV('div', { className: "min-h-[60vh] flex items-center justify-center"   , children: 
          _jsxDEV(Loader2, { className: "h-8 w-8 animate-spin text-primary"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 216}, this )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 215}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 214}, this)
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    _jsxDEV(Layout, { showFooter: false, children: 
      _jsxDEV('div', { className: "py-8", children: 
        _jsxDEV('div', { className: "container mx-auto px-4"  , children: [
          /* Header */
          _jsxDEV('div', { className: "flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"      , children: [
            _jsxDEV('div', { children: [
              _jsxDEV('h1', { className: "font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3"       , children: [
                _jsxDEV(LayoutDashboard, { className: "h-8 w-8 text-primary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 234}, this ), "Admin Dashboard"

              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 233}, this)
              , _jsxDEV('p', { className: "text-muted-foreground mt-1" , children: "Manage local citizen complaints in MySQL database"      }, void 0, false, {fileName: _jsxFileName, lineNumber: 237}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 232}, this)
            , _jsxDEV(Button, { onClick: () => navigate('/analytics'), className: "bg-primary hover:bg-primary/90 text-white gap-2 flex items-center"     , children: [
              _jsxDEV(TrendingUp, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 240}, this ), "View Analytics Dashboard"

            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 239}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 231}, this)

          /* Stats Cards */
          , _jsxDEV('div', { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"    , children: [
            _jsxDEV(Card, { className: "border shadow-sm" , children: 
              _jsxDEV(CardContent, { className: "pt-6", children: 
                _jsxDEV('div', { className: "flex items-center gap-4"  , children: [
                  _jsxDEV('div', { className: "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center"      , children: 
                    _jsxDEV(FileText, { className: "h-6 w-6 text-primary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 251}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 250}, this)
                  , _jsxDEV('div', { children: [
                    _jsxDEV('p', { className: "text-2xl font-display font-bold"  , children: stats.total}, void 0, false, {fileName: _jsxFileName, lineNumber: 254}, this)
                    , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Total Reports" }, void 0, false, {fileName: _jsxFileName, lineNumber: 255}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 253}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 249}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 248}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 247}, this)
            , _jsxDEV(Card, { className: "border shadow-sm" , children: 
              _jsxDEV(CardContent, { className: "pt-6", children: 
                _jsxDEV('div', { className: "flex items-center gap-4"  , children: [
                  _jsxDEV('div', { className: "w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center"      , children: 
                    _jsxDEV(Clock, { className: "h-6 w-6 text-blue-600"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 264}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 263}, this)
                  , _jsxDEV('div', { children: [
                    _jsxDEV('p', { className: "text-2xl font-display font-bold"  , children: stats.pending}, void 0, false, {fileName: _jsxFileName, lineNumber: 267}, this)
                    , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Pending"}, void 0, false, {fileName: _jsxFileName, lineNumber: 268}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 266}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 262}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 261}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 260}, this)
            , _jsxDEV(Card, { className: "border shadow-sm" , children: 
              _jsxDEV(CardContent, { className: "pt-6", children: 
                _jsxDEV('div', { className: "flex items-center gap-4"  , children: [
                  _jsxDEV('div', { className: "w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center"      , children: 
                    _jsxDEV(AlertCircle, { className: "h-6 w-6 text-orange-600"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 277}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 276}, this)
                  , _jsxDEV('div', { children: [
                    _jsxDEV('p', { className: "text-2xl font-display font-bold"  , children: stats.in_progress}, void 0, false, {fileName: _jsxFileName, lineNumber: 280}, this)
                    , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "In Progress" }, void 0, false, {fileName: _jsxFileName, lineNumber: 281}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 279}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 275}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 274}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 273}, this)
            , _jsxDEV(Card, { className: "border shadow-sm" , children: 
              _jsxDEV(CardContent, { className: "pt-6", children: 
                _jsxDEV('div', { className: "flex items-center gap-4"  , children: [
                  _jsxDEV('div', { className: "w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center"      , children: 
                    _jsxDEV(CheckCircle, { className: "h-6 w-6 text-green-600"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 290}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 289}, this)
                  , _jsxDEV('div', { children: [
                    _jsxDEV('p', { className: "text-2xl font-display font-bold"  , children: stats.resolved}, void 0, false, {fileName: _jsxFileName, lineNumber: 293}, this)
                    , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Resolved"}, void 0, false, {fileName: _jsxFileName, lineNumber: 294}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 292}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 288}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 287}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 286}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 246}, this)

          /* Filters */
          , _jsxDEV(Card, { className: "mb-6 border shadow-sm"  , children: 
            _jsxDEV(CardContent, { className: "pt-6", children: 
              _jsxDEV('div', { className: "flex flex-col md:flex-row gap-4"   , children: [
                _jsxDEV('div', { className: "relative flex-1" , children: [
                  _jsxDEV(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"      ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 306}, this )
                  , _jsxDEV(Input, {
                    placeholder: "Search by title, ID, or city..."     ,
                    className: "pl-10",
                    value: searchQuery,
                    onChange: (e) => setSearchQuery(e.target.value),}, void 0, false, {fileName: _jsxFileName, lineNumber: 307}, this
                  )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 305}, this)
                , _jsxDEV(Select, { value: categoryFilter, onValueChange: setCategoryFilter, children: [
                  _jsxDEV(SelectTrigger, { className: "w-full md:w-48" , children: 
                    _jsxDEV(SelectValue, { placeholder: "Category",}, void 0, false, {fileName: _jsxFileName, lineNumber: 316}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 315}, this)
                  , _jsxDEV(SelectContent, { children: 
                    categoryOptions.map((cat) => (
                      _jsxDEV(SelectItem, { value: cat.value, children: cat.label}, cat.value, false, {fileName: _jsxFileName, lineNumber: 320}, this)
                    ))
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 318}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 314}, this)
                , _jsxDEV(Select, { value: statusFilter, onValueChange: setStatusFilter, children: [
                  _jsxDEV(SelectTrigger, { className: "w-full md:w-48" , children: 
                    _jsxDEV(SelectValue, { placeholder: "Status",}, void 0, false, {fileName: _jsxFileName, lineNumber: 326}, this )
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 325}, this)
                  , _jsxDEV(SelectContent, { children: [
                    _jsxDEV(SelectItem, { value: "all", children: "All Status" }, void 0, false, {fileName: _jsxFileName, lineNumber: 329}, this)
                    , statusOptions.map((status) => (
                      _jsxDEV(SelectItem, { value: status.value, children: status.label}, status.value, false, {fileName: _jsxFileName, lineNumber: 331}, this)
                    ))
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 328}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 324}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 304}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 303}, this)
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 302}, this)

          /* Reports Table */
          , _jsxDEV(Card, { className: "border shadow-sm" , children: [
            _jsxDEV(CardHeader, { children: [
              _jsxDEV(CardTitle, { children: ["Reports (" , filteredReports.length, ")"]}, void 0, true, {fileName: _jsxFileName, lineNumber: 342}, this)
              , _jsxDEV(CardDescription, { children: "Click on a report eye icon to review details and update status"           }, void 0, false, {fileName: _jsxFileName, lineNumber: 343}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 341}, this)
            , _jsxDEV(CardContent, { children: 
              loading ? (
                _jsxDEV('div', { className: "flex items-center justify-center py-12"   , children: 
                  _jsxDEV(Loader2, { className: "h-6 w-6 animate-spin text-primary"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 348}, this )
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 347}, this)
              ) : filteredReports.length === 0 ? (
                _jsxDEV('div', { className: "text-center py-12 text-muted-foreground"  , children: "No reports found matching your criteria."

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 351}, this)
              ) : (
                _jsxDEV('div', { className: "overflow-x-auto", children: 
                  _jsxDEV('table', { className: "w-full text-left" , children: [
                    _jsxDEV('thead', { children: 
                      _jsxDEV('tr', { className: "border-b bg-muted/40" , children: [
                        _jsxDEV('th', { className: "py-3 px-4 font-semibold text-sm"   , children: "Complaint ID" }, void 0, false, {fileName: _jsxFileName, lineNumber: 359}, this)
                        , _jsxDEV('th', { className: "py-3 px-4 font-semibold text-sm"   , children: "Title"}, void 0, false, {fileName: _jsxFileName, lineNumber: 360}, this)
                        , _jsxDEV('th', { className: "py-3 px-4 font-semibold text-sm"   , children: "Category"}, void 0, false, {fileName: _jsxFileName, lineNumber: 361}, this)
                        , _jsxDEV('th', { className: "py-3 px-4 font-semibold text-sm"   , children: "Location"}, void 0, false, {fileName: _jsxFileName, lineNumber: 362}, this)
                        , _jsxDEV('th', { className: "py-3 px-4 font-semibold text-sm"   , children: "Status"}, void 0, false, {fileName: _jsxFileName, lineNumber: 363}, this)
                        , _jsxDEV('th', { className: "py-3 px-4 font-semibold text-sm"   , children: "Date"}, void 0, false, {fileName: _jsxFileName, lineNumber: 364}, this)
                        , _jsxDEV('th', { className: "py-3 px-4 font-semibold text-sm"   , children: "Action"}, void 0, false, {fileName: _jsxFileName, lineNumber: 365}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 358}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 357}, this)
                    , _jsxDEV('tbody', { children: 
                      filteredReports.map((report) => (
                        _jsxDEV('tr', { className: "border-b hover:bg-muted/50 transition-colors"  , children: [
                          _jsxDEV('td', { className: "py-3 px-4 font-mono text-sm text-primary font-semibold"     , children: report.complaint_number}, void 0, false, {fileName: _jsxFileName, lineNumber: 371}, this)
                          , _jsxDEV('td', { className: "py-3 px-4" , children: 
                            _jsxDEV('p', { className: "font-semibold truncate max-w-xs"  , children: report.title}, void 0, false, {fileName: _jsxFileName, lineNumber: 373}, this)
                          }, void 0, false, {fileName: _jsxFileName, lineNumber: 372}, this)
                          , _jsxDEV('td', { className: "py-3 px-4 capitalize"  , children: report.category}, void 0, false, {fileName: _jsxFileName, lineNumber: 375}, this)
                          , _jsxDEV('td', { className: "py-3 px-4 text-sm text-muted-foreground"   , children: 
                            report.city || 'N/A'
                          }, void 0, false, {fileName: _jsxFileName, lineNumber: 376}, this)
                          , _jsxDEV('td', { className: "py-3 px-4" , children: getStatusBadge(report.status)}, void 0, false, {fileName: _jsxFileName, lineNumber: 379}, this)
                          , _jsxDEV('td', { className: "py-3 px-4 text-sm"  , children: formatDate(report.created_at)}, void 0, false, {fileName: _jsxFileName, lineNumber: 380}, this)
                          , _jsxDEV('td', { className: "py-3 px-4" , children: 
                            _jsxDEV(Button, {
                              variant: "ghost",
                              size: "sm",
                              onClick: () => {
                                setSelectedReport(report);
                                setUpdateData({
                                  status: report.status,
                                  assigned_to: report.assigned_to || '',
                                  remarks: report.authority_remarks || '',
                                });
                              },
                              className: "text-primary hover:bg-primary/10" ,
 children: 
                              _jsxDEV(Eye, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 395}, this )
                            }, void 0, false, {fileName: _jsxFileName, lineNumber: 382}, this)
                          }, void 0, false, {fileName: _jsxFileName, lineNumber: 381}, this)
                        ]}, report.id, true, {fileName: _jsxFileName, lineNumber: 370}, this)
                      ))
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 368}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 356}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 355}, this)
              )
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 345}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 340}, this)

          /* Report Detail Dialog */
          , _jsxDEV(Dialog, { open: !!selectedReport, onOpenChange: () => setSelectedReport(null), children: 
            _jsxDEV(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto"  , children: 
              selectedReport && (
                _jsxDEV(_Fragment, { children: [
                  _jsxDEV(DialogHeader, { children: [
                    _jsxDEV(DialogTitle, { className: "text-xl font-bold" , children: selectedReport.title}, void 0, false, {fileName: _jsxFileName, lineNumber: 413}, this)
                    , _jsxDEV(DialogDescription, { className: "font-mono text-sm font-semibold text-primary"   , children: selectedReport.complaint_number}, void 0, false, {fileName: _jsxFileName, lineNumber: 414}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 412}, this)

                  , _jsxDEV('div', { className: "space-y-6", children: [
                    /* Report Info */
                    _jsxDEV('div', { className: "grid grid-cols-2 gap-4 text-sm border bg-muted/20 p-4 rounded-lg"       , children: [
                      _jsxDEV('div', { children: [
                        _jsxDEV('p', { className: "text-muted-foreground text-xs uppercase"  , children: "Category"}, void 0, false, {fileName: _jsxFileName, lineNumber: 421}, this)
                        , _jsxDEV('p', { className: "font-semibold capitalize text-foreground"  , children: selectedReport.category}, void 0, false, {fileName: _jsxFileName, lineNumber: 422}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 420}, this)
                      , _jsxDEV('div', { children: [
                        _jsxDEV('p', { className: "text-muted-foreground text-xs uppercase"  , children: "Severity"}, void 0, false, {fileName: _jsxFileName, lineNumber: 425}, this)
                        , _jsxDEV('p', { className: "font-semibold capitalize text-foreground"  , children: selectedReport.severity}, void 0, false, {fileName: _jsxFileName, lineNumber: 426}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 424}, this)
                      , _jsxDEV('div', { children: [
                        _jsxDEV('p', { className: "text-muted-foreground text-xs uppercase"  , children: "Current Status" }, void 0, false, {fileName: _jsxFileName, lineNumber: 429}, this)
                        , _jsxDEV('p', { className: "mt-1", children: getStatusBadge(selectedReport.status)}, void 0, false, {fileName: _jsxFileName, lineNumber: 430}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 428}, this)
                      , _jsxDEV('div', { children: [
                        _jsxDEV('p', { className: "text-muted-foreground text-xs uppercase"  , children: "Submitted"}, void 0, false, {fileName: _jsxFileName, lineNumber: 433}, this)
                        , _jsxDEV('p', { className: "font-semibold text-foreground" , children: formatDate(selectedReport.created_at)}, void 0, false, {fileName: _jsxFileName, lineNumber: 434}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 432}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 419}, this)

                    , _jsxDEV('div', { children: [
                      _jsxDEV('p', { className: "text-muted-foreground text-xs uppercase mb-1"   , children: "Description"}, void 0, false, {fileName: _jsxFileName, lineNumber: 439}, this)
                      , _jsxDEV('p', { className: "text-foreground leading-relaxed whitespace-pre-wrap"  , children: selectedReport.description}, void 0, false, {fileName: _jsxFileName, lineNumber: 440}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 438}, this)

                    , _jsxDEV('div', { children: [
                      _jsxDEV('p', { className: "text-muted-foreground text-xs uppercase mb-1"   , children: "Location Details" }, void 0, false, {fileName: _jsxFileName, lineNumber: 444}, this)
                      , _jsxDEV('p', { className: "flex items-center gap-2 font-medium text-foreground"    , children: [
                        _jsxDEV(MapPin, { className: "h-4 w-4 text-primary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 446}, this )
                        , [selectedReport.address, selectedReport.city, selectedReport.state].filter(Boolean).join(', ') || 'Not specified'
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 445}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 443}, this)

                    , selectedReport.image_url && (
                      _jsxDEV('div', { children: [
                        _jsxDEV('p', { className: "text-muted-foreground text-xs uppercase mb-2"   , children: "Complaint Image" }, void 0, false, {fileName: _jsxFileName, lineNumber: 453}, this)
                        , _jsxDEV('div', { className: "max-w-md rounded-lg overflow-hidden border"   , children: 
                          _jsxDEV('a', { href: selectedReport.image_url, target: "_blank", rel: "noopener noreferrer" , children: 
                            _jsxDEV('img', { src: selectedReport.image_url, alt: "Evidence", className: "w-full aspect-video object-cover hover:opacity-90 transition-opacity"    ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 456}, this )
                          }, void 0, false, {fileName: _jsxFileName, lineNumber: 455}, this)
                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 454}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 452}, this)
                    )

                    /* Update Form */
                    , _jsxDEV('div', { className: "border-t pt-6 space-y-4"  , children: [
                      _jsxDEV('h4', { className: "font-bold text-base text-foreground"  , children: "Resolve / Assign Complaint"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 464}, this)

                      , _jsxDEV('div', { className: "space-y-2", children: [
                        _jsxDEV(Label, { children: "Update Status" }, void 0, false, {fileName: _jsxFileName, lineNumber: 467}, this)
                        , _jsxDEV(Select, { value: updateData.status, onValueChange: (v) => setUpdateData(d => ({ ...d, status: v })), children: [
                          _jsxDEV(SelectTrigger, { children: 
                            _jsxDEV(SelectValue, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 470}, this )
                          }, void 0, false, {fileName: _jsxFileName, lineNumber: 469}, this)
                          , _jsxDEV(SelectContent, { children: 
                            statusOptions.map((s) => (
                              _jsxDEV(SelectItem, { value: s.value, children: s.label}, s.value, false, {fileName: _jsxFileName, lineNumber: 474}, this)
                            ))
                          }, void 0, false, {fileName: _jsxFileName, lineNumber: 472}, this)
                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 468}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 466}, this)

                      , _jsxDEV('div', { className: "space-y-2", children: [
                        _jsxDEV(Label, { children: "Assign to Officer"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 481}, this)
                        , _jsxDEV(Input, {
                          placeholder: "Officer name or department (e.g. Inspector Ramesh)"      ,
                          value: updateData.assigned_to,
                          onChange: (e) => setUpdateData(d => ({ ...d, assigned_to: e.target.value })),}, void 0, false, {fileName: _jsxFileName, lineNumber: 482}, this
                        )
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 480}, this)

                      , _jsxDEV('div', { className: "space-y-2", children: [
                        _jsxDEV(Label, { children: "Authority Remarks" }, void 0, false, {fileName: _jsxFileName, lineNumber: 490}, this)
                        , _jsxDEV(Textarea, {
                          placeholder: "Action details, updates, or comments for the citizen to view..."         ,
                          value: updateData.remarks,
                          onChange: (e) => setUpdateData(d => ({ ...d, remarks: e.target.value })),}, void 0, false, {fileName: _jsxFileName, lineNumber: 491}, this
                        )
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 489}, this)

                      , _jsxDEV('div', { className: "flex justify-end gap-3 pt-2"   , children: [
                        _jsxDEV(Button, { variant: "outline", onClick: () => setSelectedReport(null), children: "Cancel"}, void 0, false, {fileName: _jsxFileName, lineNumber: 499}, this)
                        , _jsxDEV(Button, { 
                          onClick: handleUpdateReport, 
                          disabled: updating,
                          className: "bg-secondary hover:bg-secondary/90 text-white font-semibold"   ,
 children: [
                          updating ? _jsxDEV(Loader2, { className: "h-4 w-4 animate-spin mr-2"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 505}, this ) : null, "Save Changes"

                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 500}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 498}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 463}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 417}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 411}, this)
              )
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 409}, this)
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 408}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 229}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 228}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 227}, this)
  );
}
