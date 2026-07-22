import { useState, useEffect, useCallback } from 'react';
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
  LucideIcon
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
  resolved_at: string | null;
}

const statusOrder = ['Pending', 'In Progress', 'Resolved'];

export default function TrackReport() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const statusConfig: Record<string, { label: string; color: string; icon: LucideIcon }> = {
    Pending: { label: 'Pending', color: 'bg-blue-100 text-blue-800 border-blue-200', icon: FileText },
    'In Progress': { label: 'In Progress', color: 'bg-orange-100 text-orange-800 border-orange-200', icon: Clock },
    Resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
    Rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800 border-red-200', icon: AlertCircle },
  };

  const getStatusConfig = (status: string) => {
    return statusConfig[status] || { label: status, color: 'bg-muted text-muted-foreground', icon: FileText };
  };

  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [searchId, setSearchId] = useState(searchParams.get('id') || '');
  const [report, setReport] = useState<Report | null>(null);
  const [userReports, setUserReports] = useState<Report[]>([]);
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

  const searchReport = useCallback(async (reportId: string) => {
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

  const getStatusIndex = (status: string) => {
    return statusOrder.indexOf(status);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Layout>
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Track Complaint
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter your complaint tracking number below to check the real-time resolution progress.
            </p>
          </div>

          {/* Search Box */}
          <Card className="max-w-2xl mx-auto mb-8 border shadow-md">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter Tracking ID (e.g. CIV-20260722-12345)"
                    className="pl-10"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchReport(searchId)}
                  />
                </div>
                <Button onClick={() => searchReport(searchId)} disabled={loading} className="bg-primary hover:bg-primary/90 text-white">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Report Details */}
          {report && (
            <Card className="max-w-4xl mx-auto mb-8 animate-fade-in border shadow-lg">
              <CardHeader className="bg-muted/30 border-b">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">{report.title}</CardTitle>
                    <CardDescription className="font-mono text-primary font-bold mt-1">{report.complaint_number}</CardDescription>
                  </div>
                  <Badge className={`${getStatusConfig(report.status).color} px-3 py-1 text-sm border`}>
                    {getStatusConfig(report.status).label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Status Timeline */}
                {report.status !== 'Rejected' && (
                  <div className="relative py-4 px-2">
                    <div className="flex items-center justify-between">
                      {statusOrder.map((status, index) => {
                        const isCompleted = getStatusIndex(report.status) >= index;
                        const isCurrent = report.status === status;
                        const StatusIcon = getStatusConfig(status).icon;
                        
                        return (
                          <div key={status} className="flex flex-col items-center relative z-10">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                              isCompleted 
                                ? 'bg-secondary border-secondary text-white' 
                                : 'bg-muted border-muted-foreground/20 text-muted-foreground'
                            } ${isCurrent ? 'ring-4 ring-secondary/30 scale-110' : ''}`}>
                              <StatusIcon className="h-5 w-5" />
                            </div>
                            <p className={`text-xs mt-2 text-center font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {statusConfig[status]?.label || status}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    {/* Progress Line */}
                    <div className="absolute top-9 left-10 right-10 h-1 bg-muted -z-0">
                      <div 
                        className="h-full bg-secondary transition-all duration-500"
                        style={{ 
                          width: report.status === 'Resolved' 
                            ? '100%' 
                            : report.status === 'In Progress' 
                            ? '50%' 
                            : '0%' 
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('field_category')}</p>
                      <p className="font-semibold capitalize text-foreground">{t(`cat_${report.category}`) || report.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('field_severity')}</p>
                      <p className="font-semibold capitalize text-foreground">{t(`sev_${report.severity}`) || report.severity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('field_description')}</p>
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">{report.description}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location Pinpointed</p>
                        <p className="font-semibold text-foreground">
                          {[report.address, report.city, report.state, report.pincode].filter(Boolean).join(', ') || 'Not specified'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Reported On</p>
                        <p className="font-semibold text-foreground">{formatDate(report.created_at)}</p>
                      </div>
                    </div>
                    {report.assigned_to && (
                      <div className="flex items-start gap-2">
                        <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Assigned Officer</p>
                          <p className="font-semibold text-foreground">{report.assigned_to}</p>
                        </div>
                      </div>
                    )}
                    {report.authority_remarks && (
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground">Authority Remarks</p>
                          <p className="font-semibold text-foreground bg-yellow-50 p-2 border border-yellow-200 rounded">{report.authority_remarks}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Image Preview */}
                {report.image_url && (
                  <div className="pt-6 border-t">
                    <p className="text-sm text-muted-foreground mb-3">Complaint Evidence Photograph</p>
                    <div className="max-w-md rounded-lg overflow-hidden border">
                      <a href={report.image_url} target="_blank" rel="noopener noreferrer">
                        <img src={report.image_url} alt="Evidence" className="w-full h-auto object-cover max-h-80 hover:opacity-90 transition-opacity" />
                      </a>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* User's Reports Dashboard list */}
          {user && (
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">Your Previous Complaints</h2>
              {loadingUserReports ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : userReports.length === 0 ? (
                <Card className="border shadow-sm">
                  <CardContent className="py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">You have not submitted any complaints yet.</p>
                    <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                      <Link to="/report">File a Complaint Now</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {userReports.map((r) => (
                    <Card 
                      key={r.id} 
                      className="hover:shadow border cursor-pointer hover:border-primary/40 transition-all"
                      onClick={() => {
                        setSearchId(r.complaint_number);
                        setReport(r);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <CardContent className="py-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-semibold truncate text-foreground">{r.title}</p>
                              <Badge className={`${getStatusConfig(r.status).color} px-2 py-0.5 text-xs border`} variant="secondary">
                                {getStatusConfig(r.status).label}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">
                              ID: {r.complaint_number} • Reported: {formatDate(r.created_at)}
                            </p>
                          </div>
                          <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Not logged in panel */}
          {!user && (
            <div className="max-w-md mx-auto text-center mt-12">
              <Card className="border shadow-sm">
                <CardContent className="py-8">
                  <p className="text-muted-foreground mb-4">
                    Are you a citizen? Sign in to view and track all your complaints in one place.
                  </p>
                  <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                    <Link to="/auth">Sign In / Register</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
