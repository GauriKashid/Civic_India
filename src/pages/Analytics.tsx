import { useState, useEffect } from 'react';
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

interface AnalyticsData {
  total_complaints: number;
  status_split: Array<{ status: string; count: number }>;
  category_split: Array<{ category: string; count: number }>;
  area_split: Array<{ city: string; count: number }>;
  ai_accuracy: number;
  monthly_trend: Array<{ month: string; count: number }>;
}

const COLORS = ['#3b82f6', '#f97316', '#22c55e', '#ef4444', '#a855f7', '#06b6d4', '#eab308'];

export default function Analytics() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  
  const [data, setData] = useState<AnalyticsData | null>(null);
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
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Failed to load analytics</h2>
          <p className="text-muted-foreground mb-4">Please make sure the backend Python server is running and database is active.</p>
          <Button onClick={fetchAnalytics}>Retry</Button>
        </div>
      </Layout>
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
    <Layout>
      <div className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="h-8 w-8 text-primary" />
                Civic Analytics Dashboard
              </h1>
              <p className="text-muted-foreground text-sm">Real-time statistics, category distribution, and AI accuracy metrics</p>
            </div>
          </div>

          {/* Core Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="border shadow-sm">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold">{data.total_complaints}</p>
                    <p className="text-sm text-muted-foreground font-medium">Total Complaints Filed</p>
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
                    <p className="text-3xl font-display font-bold">
                      {data.status_split.find(s => s.status === 'Resolved')?.count || 0}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">Resolved Complaints</p>
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
                    <p className="text-3xl font-display font-bold">
                      {data.status_split.find(s => s.status === 'Pending')?.count || 0}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">Pending Review</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border shadow-sm bg-gradient-to-r from-accent/10 to-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                    <ShieldCheck className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-3xl font-display font-bold">{data.ai_accuracy}%</p>
                    <p className="text-sm text-muted-foreground font-medium">AI CNN Accuracy</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1: Resolved vs Pending Pie Chart */}
            <Card className="border shadow-md">
              <CardHeader>
                <CardTitle>Resolution Status</CardTitle>
                <CardDescription>Share of pending, in-progress, resolved, and rejected complaints</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {statusData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground">No data available</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} complaints`, 'Count']} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Chart 2: Complaints by Category Bar Chart */}
            <Card className="border shadow-md">
              <CardHeader>
                <CardTitle>Complaints by Category</CardTitle>
                <CardDescription>Frequency of issue categories identified by CNN AI model</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {categoryData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground">No data available</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Bar dataKey="Count" fill="#f97316" radius={[4, 4, 0, 0]}>
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Chart 3: Complaints by Area Bar Chart */}
            <Card className="border shadow-md">
              <CardHeader>
                <CardTitle>Complaints by Area / City</CardTitle>
                <CardDescription>Geographic distribution of reported civic issues</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {areaData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground">No data available</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={areaData} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
                      <XAxis type="number" tick={{ fontSize: 11 }} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                      <Tooltip />
                      <Bar dataKey="Complaints" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Chart 4: AI Accuracy Gauge Widget */}
            <Card className="border shadow-md">
              <CardHeader>
                <CardTitle>AI Prediction Accuracy Analysis</CardTitle>
                <CardDescription>Percentage of correct categories predicted by the CNN model versus citizen confirmation</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-80 pt-0">
                <div className="relative flex items-center justify-center w-40 h-40">
                  {/* Circular progress display */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      className="text-muted-foreground/10"
                      strokeWidth="12"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      className="text-accent"
                      strokeWidth="12"
                      strokeDasharray={440}
                      strokeDashoffset={440 - (440 * data.ai_accuracy) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold font-display">{data.ai_accuracy}%</span>
                    <span className="text-xs text-muted-foreground mt-1">Accuracy Score</span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <p className="text-sm font-semibold text-foreground">
                    CNN Classification Performance
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 px-4 leading-relaxed">
                    Accuracy is computed dynamically in real time from confirmation triggers in the MySQL database logs.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Chart 5: Monthly Reporting Trends Line Chart */}
            <Card className="border shadow-md lg:col-span-2">
              <CardHeader>
                <CardTitle>Complaint Volume Trends</CardTitle>
                <CardDescription>Monthly growth profile of reported concerns</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                {data.monthly_trend.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground">No data available</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data.monthly_trend} margin={{ top: 10, right: 30, left: -20, bottom: 0 }}>
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Line type="monotone" dataKey="count" stroke="#a855f7" strokeWidth={3} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </Layout>
  );
}
