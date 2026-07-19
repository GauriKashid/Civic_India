import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
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
  resolved_at: string | null;
}

const statusOrder: ReportStatus[] = ['submitted', 'in_review', 'assigned', 'in_progress', 'resolved'];

export default function TrackReport() {
  const { t } = useLanguage();

  const statusConfig: Record<ReportStatus, { label: string; color: string; icon: LucideIcon }> = {
    submitted: { label: t('status_submitted'), color: 'bg-blue-100 text-blue-800', icon: FileText },
    in_review: { label: t('status_in_review'), color: 'bg-yellow-100 text-yellow-800', icon: Clock },
    assigned: { label: t('status_assigned'), color: 'bg-purple-100 text-purple-800', icon: User },
    in_progress: { label: t('status_in_progress'), color: 'bg-orange-100 text-orange-800', icon: AlertCircle },
    resolved: { label: t('status_resolved'), color: 'bg-green-100 text-green-800', icon: CheckCircle },
    rejected: { label: t('status_rejected'), color: 'bg-red-100 text-red-800', icon: AlertCircle },
  };

  const getStatusConfig = (status: ReportStatus | null | undefined) => {
    const s = status || 'submitted';
    return statusConfig[s] || statusConfig['submitted'];
  };

  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [searchId, setSearchId] = useState(searchParams.get('id') || '');
  const [report, setReport] = useState<Report | null>(null);
  const [userReports, setUserReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingUserReports, setLoadingUserReports] = useState(false);

  const fetchUserReports = useCallback(async () => {
    if (!user) return;
    setLoadingUserReports(true);
    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUserReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoadingUserReports(false);
    }
  }, [user]);

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
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('report_number', reportId)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        toast({
          title: 'Report not found',
          description: 'No report found with this ID. Please check and try again.',
          variant: 'destructive',
        });
        setReport(null);
      } else {
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

  const getStatusIndex = (status: ReportStatus) => {
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
              {t('track_title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('track_desc')}
            </p>
          </div>

          {/* Search Box */}
          <Card className="max-w-2xl mx-auto mb-8">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t('track_placeholder')}
                    className="pl-10"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchReport(searchId)}
                  />
                </div>
                <Button onClick={() => searchReport(searchId)} disabled={loading} className="bg-secondary hover:bg-secondary/90">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : t('btn_search')}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Report Details */}
          {report && (
            <Card className="max-w-4xl mx-auto mb-8 animate-fade-in">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl">{report.title}</CardTitle>
                    <CardDescription className="font-mono">{report.report_number}</CardDescription>
                  </div>
                  <Badge className={getStatusConfig(report.status).color}>
                    {getStatusConfig(report.status).label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status Timeline */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {statusOrder.map((status, index) => {
                      const isCompleted = getStatusIndex(report.status) >= index;
                      const isCurrent = report.status === status;
                      const StatusIcon = statusConfig[status].icon;
                      
                      return (
                        <div key={status} className="flex flex-col items-center relative z-10">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted 
                              ? 'bg-accent text-accent-foreground' 
                              : 'bg-muted text-muted-foreground'
                          } ${isCurrent ? 'ring-4 ring-accent/30' : ''}`}>
                            <StatusIcon className="h-5 w-5" />
                          </div>
                          <p className={`text-xs mt-2 text-center ${isCompleted ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                            {statusConfig[status].label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {/* Progress Line */}
                  <div className="absolute top-5 left-5 right-5 h-0.5 bg-muted -z-0">
                    <div 
                      className="h-full bg-accent transition-all duration-500"
                      style={{ width: `${(getStatusIndex(report.status) / (statusOrder.length - 1)) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-6 pt-6 border-t">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('field_category')}</p>
                      <p className="font-medium capitalize">{t(`cat_${report.category}`) || report.category.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('field_severity')}</p>
                      <p className="font-medium capitalize">{t(`sev_${report.severity}`) || report.severity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('field_description')}</p>
                      <p className="text-foreground">{report.description}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">
                          {[report.address, report.city, report.state].filter(Boolean).join(', ') || 'Not specified'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground mt-1" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('track_created')}</p>
                        <p className="font-medium">{formatDate(report.created_at)}</p>
                      </div>
                    </div>
                    {report.assigned_to && (
                      <div className="flex items-start gap-2">
                        <User className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">{t('track_assigned')}</p>
                          <p className="font-medium">{report.assigned_to}</p>
                        </div>
                      </div>
                    )}
                    {report.authority_remarks && (
                      <div className="flex items-start gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="text-sm text-muted-foreground">{t('track_remarks')}</p>
                          <p className="font-medium">{report.authority_remarks}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Images */}
                {report.image_urls && report.image_urls.length > 0 && (
                  <div className="pt-6 border-t">
                    <p className="text-sm text-muted-foreground mb-3">{t('field_photos')}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {report.image_urls.map((url, index) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aspect-square rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                        >
                          <img src={url} alt={`Report image ${index + 1}`} className="w-full h-full object-cover" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* User's Reports */}
          {user && (
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-xl font-semibold text-foreground mb-4">{t('track_your_reports')}</h2>
              {loadingUserReports ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : userReports.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">{t('track_no_reports')}</p>
                    <Button asChild className="bg-secondary hover:bg-secondary/90">
                      <Link to="/report">{t('btn_report_now')}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {userReports.map((r) => (
                    <Card 
                      key={r.id} 
                      className="hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => {
                        setSearchId(r.report_number);
                        setReport(r);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <CardContent className="py-4">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium truncate">{r.title}</p>
                              <Badge className={getStatusConfig(r.status).color} variant="secondary">
                                {getStatusConfig(r.status).label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {r.report_number} • {formatDate(r.created_at)}
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

          {/* Not logged in */}
          {!user && (
            <div className="max-w-md mx-auto text-center">
              <Card>
                <CardContent className="py-8">
                  <p className="text-muted-foreground mb-4">
                    Sign in to view all your submitted reports and track them easily.
                  </p>
                  <Button asChild>
                    <Link to="/auth">{t('btn_signin')}</Link>
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
