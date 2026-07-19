import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { classifyCivicIssue, findDuplicateReport, CivicAiSuggestion, DuplicateReport } from '@/lib/civicAi';
import { 
  MapPin, 
  Upload, 
  Camera, 
  Trash2, 
  AlertTriangle, 
  Lightbulb, 
  Car, 
  Droplets, 
  Building2,
  TreePine,
  MoreHorizontal,
  Loader2,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function ReportNow() {
  const { t } = useLanguage();

  const categories = [
    { value: 'garbage', label: t('cat_garbage'), icon: Trash2 },
    { value: 'pothole', label: t('cat_pothole'), icon: AlertTriangle },
    { value: 'streetlight', label: t('cat_streetlight'), icon: Lightbulb },
    { value: 'traffic', label: t('cat_traffic'), icon: Car },
    { value: 'water_supply', label: t('cat_water_supply'), icon: Droplets },
    { value: 'vandalism', label: t('cat_vandalism'), icon: Building2 },
    { value: 'drainage', label: t('cat_drainage'), icon: TreePine },
    { value: 'other', label: t('cat_other'), icon: MoreHorizontal },
  ];

  const severities = [
    { value: 'low', label: t('sev_low') },
    { value: 'medium', label: t('sev_medium') },
    { value: 'high', label: t('sev_high') },
    { value: 'critical', label: t('sev_critical') },
  ];

  const [searchParams] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    category: searchParams.get('category') || '',
    severity: 'medium',
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    latitude: null as number | null,
    longitude: null as number | null,
  });
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportNumber, setReportNumber] = useState('');

  // CivicAI state
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<CivicAiSuggestion | null>(null);
  const [allReports, setAllReports] = useState<Array<{ id: string; report_number: string; title: string; status: string; category: string; city?: string; created_at: string }>>([]);
  const [duplicateReport, setDuplicateReport] = useState<DuplicateReport | null>(null);

  const fetchAllReports = async () => {
    try {
      const { data } = await supabase.from('reports').select('*');
      setAllReports(data || []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAllReports();
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to submit a report.',
        variant: 'destructive',
      });
      navigate('/auth?redirect=/report');
    }
  }, [user, authLoading, navigate, toast]);

  // AI duplicate check when city or category changes
  useEffect(() => {
    if (formData.city && formData.category) {
      const dup = findDuplicateReport(formData.city, formData.category, allReports);
      setDuplicateReport(dup);
    } else {
      setDuplicateReport(null);
    }
  }, [formData.city, formData.category, allReports]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const triggerAiAnalysis = (desc: string) => {
    if (desc.trim().length < 15) return;
    setIsAiAnalyzing(true);
    setAiSuggestion(null);
    setTimeout(() => {
      const suggestions = classifyCivicIssue(desc);
      setAiSuggestion(suggestions);
      setIsAiAnalyzing(false);
    }, 850);
  };

  const applyAiSuggestions = () => {
    if (!aiSuggestion) return;
    setFormData(prev => ({
      ...prev,
      category: aiSuggestion.category,
      severity: aiSuggestion.severity,
      title: aiSuggestion.title,
    }));
    setAiSuggestion(null);
    toast({
      title: t('ai_applied'),
      description: 'Category, Severity, and Title recommendations updated.',
    });
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: 'Geolocation not supported',
        description: 'Your browser does not support location services.',
        variant: 'destructive',
      });
      return;
    }

    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({ ...prev, latitude, longitude }));
        
        // Try reverse geocoding
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          if (data.address) {
            setFormData(prev => ({
              ...prev,
              address: data.display_name || '',
              city: data.address.city || data.address.town || data.address.village || '',
              state: data.address.state || '',
              pincode: data.address.postcode || '',
            }));
          }
        } catch (error) {
          console.error('Reverse geocoding failed:', error);
        }
        
        setGettingLocation(false);
        toast({
          title: 'Location detected',
          description: 'Your location has been added to the report.',
        });
      },
      (error) => {
        setGettingLocation(false);
        toast({
          title: 'Location error',
          description: 'Unable to get your location. Please enter manually.',
          variant: 'destructive',
        });
      },
      { enableHighAccuracy: true }
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles = Array.from(files).slice(0, 5 - images.length);
    setImages(prev => [...prev, ...newFiles]);

    newFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreviewUrls(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    if (newFiles.length > 0) {
      setIsAiAnalyzing(true);
      setTimeout(() => {
        const suggestions = classifyCivicIssue(formData.description || newFiles[0].name, newFiles[0].name);
        setAiSuggestion(suggestions);
        setIsAiAnalyzing(false);
      }, 1000);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.title || !formData.description) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Upload images first
      const imageUrls: string[] = [];
      for (const image of images) {
        const fileName = `${user!.id}/${Date.now()}-${image.name}`;
        const { error: uploadError } = await supabase.storage
          .from('report-images')
          .upload(fileName, image);

        if (!uploadError) {
          const { data: { publicUrl } } = supabase.storage
            .from('report-images')
            .getPublicUrl(fileName);
          imageUrls.push(publicUrl);
        }
      }

      // Create report (report_number is auto-generated by database trigger)
      const { data, error } = await supabase
        .from('reports')
        .insert([{
          user_id: user!.id,
          report_number: 'TEMP', // Will be overwritten by database trigger
          category: formData.category as Database['public']['Enums']['report_category'],
          severity: formData.severity as Database['public']['Enums']['report_severity'],
          title: formData.title,
          description: formData.description,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          latitude: formData.latitude,
          longitude: formData.longitude,
          image_urls: imageUrls,
        }])
        .select('report_number')
        .single();

      if (error) throw error;

      setReportNumber(data.report_number);
      setSubmitted(true);
      toast({
        title: 'Report submitted!',
        description: `Your report ID is ${data.report_number}`,
      });
      // Refresh local copy of reports
      fetchAllReports();
    } catch (error) {
      toast({
        title: 'Submission failed',
        description: error instanceof Error ? error.message : 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full text-center">
            <CardContent className="pt-8">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-accent" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                {t('report_success')}
              </h2>
              <p className="text-muted-foreground mb-6">
                Your civic issue has been reported. Track its progress using the ID below.
              </p>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">Report ID</p>
                <p className="font-display text-2xl font-bold text-primary">{reportNumber}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={() => navigate(`/track?id=${reportNumber}`)} className="bg-secondary hover:bg-secondary/90">
                  {t('nav_track')}
                </Button>
                <Button variant="outline" onClick={() => {
                  setSubmitted(false);
                  setReportNumber('');
                  setFormData({
                    category: '',
                    severity: 'medium',
                    title: '',
                    description: '',
                    address: '',
                    city: '',
                    state: '',
                    pincode: '',
                    latitude: null,
                    longitude: null,
                  });
                  setImages([]);
                  setImagePreviewUrls([]);
                }}>
                  Submit Another Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('report_title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('report_desc')}
            </p>
          </div>

          {/* Form */}
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>{t('track_details')}</CardTitle>
              <CardDescription>
                Provide as much detail as possible to help authorities address the issue quickly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Category & Severity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">{t('field_category')} *</Label>
                    <Select value={formData.category} onValueChange={(v) => handleSelectChange('category', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            <div className="flex items-center gap-2">
                              <cat.icon className="h-4 w-4" />
                              {cat.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="severity">{t('field_severity')}</Label>
                    <Select value={formData.severity} onValueChange={(v) => handleSelectChange('severity', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        {severities.map((sev) => (
                          <SelectItem key={sev.value} value={sev.value}>
                            {sev.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">{t('field_title')} *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder={t('field_title_placeholder')}
                    value={formData.title}
                    onChange={handleChange}
                    maxLength={100}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">{t('field_description')} *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder={t('field_description_placeholder')}
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    onBlur={(e) => triggerAiAnalysis(e.target.value)}
                    maxLength={1000}
                  />
                </div>

                {/* CivicAI Assistant Suggestions Panel */}
                {isAiAnalyzing && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 animate-pulse flex items-center gap-3">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <p className="text-sm font-medium text-primary">{t('ai_thinking')}</p>
                  </div>
                )}

                {aiSuggestion && (
                  <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-5 space-y-4 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-accent animate-bounce" />
                        <h4 className="font-display font-semibold text-foreground">{t('ai_title')}</h4>
                      </div>
                      <Badge variant="secondary" className="bg-accent/10 text-accent-foreground border-accent/20">
                        Smart Recommendation
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="p-3 bg-card rounded-lg border">
                        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{t('ai_suggested_cat')}</p>
                        <p className="font-semibold text-foreground capitalize">{t(`cat_${aiSuggestion.category}`)}</p>
                      </div>
                      <div className="p-3 bg-card rounded-lg border">
                        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">{t('ai_suggested_sev')}</p>
                        <p className="font-semibold text-foreground capitalize">{t(`sev_${aiSuggestion.severity}`)}</p>
                      </div>
                      <div className="p-3 bg-card rounded-lg border md:col-span-2">
                        <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1">Suggested Title</p>
                        <p className="font-semibold text-foreground">{aiSuggestion.title}</p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-2">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setAiSuggestion(null)}
                      >
                        Ignore
                      </Button>
                      <Button 
                        type="button" 
                        size="sm" 
                        onClick={applyAiSuggestions}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-1.5"
                      >
                        <Sparkles className="h-4 w-4" />
                        {t('ai_apply')}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Location</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={getLocation}
                      disabled={gettingLocation}
                      className="gap-2"
                    >
                      {gettingLocation ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                      {gettingLocation ? 'Getting location...' : 'Use My Location'}
                    </Button>
                  </div>

                  {formData.latitude && formData.longitude && (
                    <div className="bg-accent/10 rounded-lg p-3 text-sm">
                      <p className="text-accent font-medium">📍 Location captured</p>
                      <p className="text-muted-foreground">
                        Lat: {formData.latitude.toFixed(6)}, Lng: {formData.longitude.toFixed(6)}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">{t('field_address')}</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder={t('field_address_placeholder')}
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">{t('field_city')}</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder={t('field_city_placeholder')}
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">{t('field_state')}</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder={t('field_state_placeholder')}
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">{t('field_pincode')}</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        placeholder={t('field_pincode_placeholder')}
                        value={formData.pincode}
                        onChange={handleChange}
                        maxLength={6}
                      />
                    </div>
                  </div>
                </div>

                {/* Duplicate Report Alert */}
                {duplicateReport && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex gap-3 items-start animate-fade-in">
                    <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div className="space-y-3 flex-1">
                      <div>
                        <h4 className="font-semibold text-destructive">{t('ai_dup_detected')}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {t('ai_dup_desc')}
                        </p>
                      </div>
                      <div className="bg-card rounded-lg border p-3 text-sm">
                        <p className="font-medium truncate">{duplicateReport.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          ID: {duplicateReport.report_number} • Status: {t(`status_${duplicateReport.status}`) || duplicateReport.status}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/track?id=${duplicateReport.report_number}`)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                      >
                        {t('ai_dup_link')}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Image Upload */}
                <div className="space-y-4">
                  <Label>{t('field_photos')}</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      disabled={images.length >= 5}
                    />
                    <label
                      htmlFor="image-upload"
                      className={`cursor-pointer flex flex-col items-center gap-2 ${images.length >= 5 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Camera className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {t('field_photos_desc')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {images.length}/5 photos added
                      </p>
                    </label>
                  </div>

                  {imagePreviewUrls.length > 0 && (
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                          <img src={url} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-5 w-5 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t('btn_submitting')}
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      {t('btn_submit_report')}
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
