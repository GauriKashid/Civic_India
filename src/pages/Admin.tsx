import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
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
  Users, 
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Eye,
  Loader2,
  TrendingUp,
  MapPin
} from 'lucide-react';

type ReportStatus = 'submitted' | 'in_review' | 'assigned' | 'in_progress' | 'resolved' | 'rejected';

interface Report {
  id: string;
  report_number: string;
  title: string;
  description: string;
  category: string;
  severity: string;
  status: ReportStatus;
  address: string;
  city: string;
  state: string;
  assigned_to: string | null;
  authority_remarks: string | null;
  image_urls: string[] | null;
  created_at: string;
  updated_at: string;
}

interface Stats {
  total: number;
  submitted: number;
  in_progress: number;
  resolved: number;
}

const statusOptions: { value: ReportStatus; label: string }[] = [
  { value: 'submitted', label: 'Submitted' },
  { value: 'in_review', label: 'In Review' },
  { value: 'assigned', label: 'Assigned' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'rejected', label: 'Rejected' },
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

  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, submitted: 0, in_progress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [updateData, setUpdateData] = useState({ status: '', assigned_to: '', remarks: '' });
  const [updating, setUpdating] = useState(false);

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

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase.from('reports').select('*').order('created_at', { ascending: false });

      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter as Database["public"]["Enums"]["report_category"]);
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter as Database["public"]["Enums"]["report_status"]);
      }

      const { data, error } = await query;
      if (error) throw error;
      setReports(data || []);

      // Calculate stats
      const allReports = data || [];
      setStats({
        total: allReports.length,
        submitted: allReports.filter(r => r.status === 'submitted').length,
        in_progress: allReports.filter(r => ['in_review', 'assigned', 'in_progress'].includes(r.status)).length,
        resolved: allReports.filter(r => r.status === 'resolved').length,
      });
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, statusFilter]);

  const handleUpdateReport = async () => {
    if (!selectedReport) return;
    
    setUpdating(true);
    try {
      const updates: Database["public"]["Tables"]["reports"]["Update"] = {};
      if (updateData.status) updates.status = updateData.status as Database["public"]["Enums"]["report_status"];
      if (updateData.assigned_to) updates.assigned_to = updateData.assigned_to;
      if (updateData.remarks) updates.authority_remarks = updateData.remarks;
      if (updateData.status === 'resolved') updates.resolved_at = new Date().toISOString();

      const { error } = await supabase
        .from('reports')
        .update(updates)
        .eq('id', selectedReport.id);

      if (error) throw error;

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

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.report_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.city?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: ReportStatus) => {
    const colors: Record<ReportStatus, string> = {
      submitted: 'bg-blue-100 text-blue-800',
      in_review: 'bg-yellow-100 text-yellow-800',
      assigned: 'bg-purple-100 text-purple-800',
      in_progress: 'bg-orange-100 text-orange-800',
      resolved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
    };
    return <Badge className={colors[status]}>{status.replace('_', ' ')}</Badge>;
  };

  if (authLoading) {
    return (
      <Layout showFooter={false}>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <Layout showFooter={false}>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <LayoutDashboard className="h-8 w-8 text-primary" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Manage civic issue reports</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{stats.total}</p>
                    <p className="text-sm text-muted-foreground">Total Reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{stats.submitted}</p>
                    <p className="text-sm text-muted-foreground">New</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{stats.in_progress}</p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{stats.resolved}</p>
                    <p className="text-sm text-muted-foreground">Resolved</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, ID, or city..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryOptions.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card>
            <CardHeader>
              <CardTitle>Reports ({filteredReports.length})</CardTitle>
              <CardDescription>Click on a report to view details and update status</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : filteredReports.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No reports found matching your criteria.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Report ID</th>
                        <th className="text-left py-3 px-4 font-medium">Title</th>
                        <th className="text-left py-3 px-4 font-medium">Category</th>
                        <th className="text-left py-3 px-4 font-medium">Location</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-left py-3 px-4 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map((report) => (
                        <tr key={report.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 font-mono text-sm">{report.report_number}</td>
                          <td className="py-3 px-4">
                            <p className="font-medium truncate max-w-xs">{report.title}</p>
                          </td>
                          <td className="py-3 px-4 capitalize">{report.category.replace('_', ' ')}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {report.city || 'N/A'}
                          </td>
                          <td className="py-3 px-4">{getStatusBadge(report.status)}</td>
                          <td className="py-3 px-4 text-sm">{formatDate(report.created_at)}</td>
                          <td className="py-3 px-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedReport(report);
                                setUpdateData({
                                  status: report.status,
                                  assigned_to: report.assigned_to || '',
                                  remarks: report.authority_remarks || '',
                                });
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Report Detail Dialog */}
          <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              {selectedReport && (
                <>
                  <DialogHeader>
                    <DialogTitle>{selectedReport.title}</DialogTitle>
                    <DialogDescription>{selectedReport.report_number}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Report Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Category</p>
                        <p className="font-medium capitalize">{selectedReport.category.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Severity</p>
                        <p className="font-medium capitalize">{selectedReport.severity}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Current Status</p>
                        {getStatusBadge(selectedReport.status)}
                      </div>
                      <div>
                        <p className="text-muted-foreground">Submitted</p>
                        <p className="font-medium">{formatDate(selectedReport.created_at)}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Description</p>
                      <p>{selectedReport.description}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground text-sm mb-1">Location</p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {[selectedReport.address, selectedReport.city, selectedReport.state].filter(Boolean).join(', ') || 'Not specified'}
                      </p>
                    </div>

                    {selectedReport.image_urls && selectedReport.image_urls.length > 0 && (
                      <div>
                        <p className="text-muted-foreground text-sm mb-2">Photos</p>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedReport.image_urls.map((url, i) => (
                            <a key={i} href={url} target="_blank" rel="noopener noreferrer">
                              <img src={url} alt="" className="rounded-lg w-full aspect-square object-cover" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Update Form */}
                    <div className="border-t pt-6 space-y-4">
                      <h4 className="font-semibold">Update Report</h4>
                      
                      <div className="space-y-2">
                        <label className="text-sm">Status</label>
                        <Select value={updateData.status} onValueChange={(v) => setUpdateData(d => ({ ...d, status: v }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((s) => (
                              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm">Assigned To</label>
                        <Input
                          placeholder="Department or officer name"
                          value={updateData.assigned_to}
                          onChange={(e) => setUpdateData(d => ({ ...d, assigned_to: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm">Remarks</label>
                        <Textarea
                          placeholder="Add remarks or notes about this report"
                          value={updateData.remarks}
                          onChange={(e) => setUpdateData(d => ({ ...d, remarks: e.target.value }))}
                        />
                      </div>

                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setSelectedReport(null)}>Cancel</Button>
                        <Button 
                          onClick={handleUpdateReport} 
                          disabled={updating}
                          className="bg-secondary hover:bg-secondary/90"
                        >
                          {updating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Update Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Layout>
  );
}
