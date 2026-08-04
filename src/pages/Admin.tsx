import { useState, useEffect, useCallback } from 'react';
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

interface Report {
  id: number;
  complaint_number: string;
  title: string;
  description: string;
  category: string;
  severity: string;
  status: 'Pending' | 'In Progress' | 'Resolved' | 'Rejected';
  address: string;
  city: string;
  state: string;
  assigned_to: string | null;
  authority_remarks: string | null;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

interface Stats {
  total: number;
  pending: number;
  in_progress: number;
  resolved: number;
}

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

  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, in_progress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
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
          pending: allReports.filter((r: Report) => r.status === 'Pending').length,
          in_progress: allReports.filter((r: Report) => r.status === 'In Progress').length,
          resolved: allReports.filter((r: Report) => r.status === 'Resolved').length,
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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Pending: 'bg-blue-100 text-blue-800 border-blue-200',
      'In Progress': 'bg-orange-100 text-orange-800 border-orange-200',
      Resolved: 'bg-green-100 text-green-800 border-green-200',
      Rejected: 'bg-red-100 text-red-800 border-red-200',
    };
    return <Badge className={`${colors[status] || 'bg-muted text-muted-foreground'} px-2 py-0.5 border`}>{status}</Badge>;
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
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-3">
                <LayoutDashboard className="h-8 w-8 text-primary" />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Manage local citizen complaints in MySQL database</p>
            </div>
            <Button onClick={() => navigate('/analytics')} className="bg-primary hover:bg-primary/90 text-white gap-2 flex items-center">
              <TrendingUp className="h-4 w-4" />
              View Analytics Dashboard
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border shadow-sm">
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
            <Card className="border shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold">{stats.pending}</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border shadow-sm">
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
            <Card className="border shadow-sm">
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
          <Card className="mb-6 border shadow-sm">
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
          <Card className="border shadow-sm">
            <CardHeader>
              <CardTitle>Reports ({filteredReports.length})</CardTitle>
              <CardDescription>Click on a report eye icon to review details and update status</CardDescription>
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
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b bg-muted/40">
                        <th className="py-3 px-4 font-semibold text-sm">Complaint ID</th>
                        <th className="py-3 px-4 font-semibold text-sm">Title</th>
                        <th className="py-3 px-4 font-semibold text-sm">Category</th>
                        <th className="py-3 px-4 font-semibold text-sm">Location</th>
                        <th className="py-3 px-4 font-semibold text-sm">Status</th>
                        <th className="py-3 px-4 font-semibold text-sm">Date</th>
                        <th className="py-3 px-4 font-semibold text-sm">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.map((report) => (
                        <tr key={report.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 font-mono text-sm text-primary font-semibold">{report.complaint_number}</td>
                          <td className="py-3 px-4">
                            <p className="font-semibold truncate max-w-xs">{report.title}</p>
                          </td>
                          <td className="py-3 px-4 capitalize">{report.category}</td>
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
                              className="text-primary hover:bg-primary/10"
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
                    <DialogTitle className="text-xl font-bold">{selectedReport.title}</DialogTitle>
                    <DialogDescription className="font-mono text-sm font-semibold text-primary">{selectedReport.complaint_number}</DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Report Info */}
                    <div className="grid grid-cols-2 gap-4 text-sm border bg-muted/20 p-4 rounded-lg">
                      <div>
                        <p className="text-muted-foreground text-xs uppercase">Category</p>
                        <p className="font-semibold capitalize text-foreground">{selectedReport.category}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase">Severity</p>
                        <p className="font-semibold capitalize text-foreground">{selectedReport.severity}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase">Current Status</p>
                        <p className="mt-1">{getStatusBadge(selectedReport.status)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs uppercase">Submitted</p>
                        <p className="font-semibold text-foreground">{formatDate(selectedReport.created_at)}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-muted-foreground text-xs uppercase mb-1">Description</p>
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">{selectedReport.description}</p>
                    </div>

                    <div>
                      <p className="text-muted-foreground text-xs uppercase mb-1">Location Details</p>
                      <p className="flex items-center gap-2 font-medium text-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        {[selectedReport.address, selectedReport.city, selectedReport.state].filter(Boolean).join(', ') || 'Not specified'}
                      </p>
                    </div>

                    {selectedReport.image_url && (
                      <div>
                        <p className="text-muted-foreground text-xs uppercase mb-2">Complaint Image</p>
                        <div className="max-w-md rounded-lg overflow-hidden border">
                          <a href={selectedReport.image_url} target="_blank" rel="noopener noreferrer">
                            <img src={selectedReport.image_url} alt="Evidence" className="w-full aspect-video object-cover hover:opacity-90 transition-opacity" />
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Update Form */}
                    <div className="border-t pt-6 space-y-4">
                      <h4 className="font-bold text-base text-foreground">Resolve / Assign Complaint</h4>
                      
                      <div className="space-y-2">
                        <Label>Update Status</Label>
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
                        <Label>Assign to Officer</Label>
                        <Input
                          placeholder="Officer name or department (e.g. Inspector Ramesh)"
                          value={updateData.assigned_to}
                          onChange={(e) => setUpdateData(d => ({ ...d, assigned_to: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Authority Remarks</Label>
                        <Textarea
                          placeholder="Action details, updates, or comments for the citizen to view..."
                          value={updateData.remarks}
                          onChange={(e) => setUpdateData(d => ({ ...d, remarks: e.target.value }))}
                        />
                      </div>

                      <div className="flex justify-end gap-3 pt-2">
                        <Button variant="outline" onClick={() => setSelectedReport(null)}>Cancel</Button>
                        <Button 
                          onClick={handleUpdateReport} 
                          disabled={updating}
                          className="bg-secondary hover:bg-secondary/90 text-white font-semibold"
                        >
                          {updating ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                          Save Changes
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
