import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
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
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportNumber, setReportNumber] = useState('');

  // CivicAI prediction states
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{ category: string; confidence: number } | null>(null);
  const [allReports, setAllReports] = useState<Array<{ id: number; complaint_number: string; title: string; status: string; category: string; city?: string; created_at: string }>>([]);
  const [duplicateReport, setDuplicateReport] = useState<any | null>(null);

  const fetchAllReports = async () => {
    const token = localStorage.getItem('civic_auth_token');
    if (!token) return;
    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setAllReports(data || []);
      }
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

  // Simple duplicate check when city and category match
  useEffect(() => {
    if (formData.city && formData.category && allReports.length > 0) {
      const cleanCity = formData.city.trim().toLowerCase();
      const dup = allReports.find(r => 
        r.status !== 'Resolved' && 
        r.status !== 'Rejected' && 
        r.category === formData.category && 
        r.city?.trim().toLowerCase() === cleanCity
      );
      setDuplicateReport(dup || null);
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

  const applyAiSuggestions = () => {
    if (!aiSuggestion) return;
    setFormData(prev => ({
      ...prev,
      category: aiSuggestion.category,
      title: `AI predicted ${aiSuggestion.category} at ${formData.city || 'location'}`.substring(0, 80),
    }));
    setAiSuggestion(null);
    toast({
      title: t('ai_applied'),
      description: 'Category recommendation applied.',
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

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    const successCallback = async (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      setFormData(prev => ({ ...prev, latitude, longitude }));
      
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
        description: `Your live location has been added (accuracy: ${Math.round(accuracy)} meters).`,
      });
    };

    const errorCallback = (error: GeolocationPositionError) => {
      setGettingLocation(false);
      toast({
        title: 'Location error',
        description: error.message || 'Unable to get location. Please enter manually.',
        variant: 'destructive',
      });
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, geoOptions);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setImages([file]); // Single image upload for CNN simplicity

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreviewUrls([reader.result as string]);
    };
    reader.readAsDataURL(file);

    // Call Python CNN endpoint immediately
    const token = localStorage.getItem('civic_auth_token');
    if (!token) return;

    setIsAiAnalyzing(true);
    setAiSuggestion(null);

    try {
      const uploadData = new FormData();
      uploadData.append('image', file);

      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: uploadData
      });

      if (response.ok) {
        const data = await response.json();
        setUploadedImageUrl(data.image_url);
        setAiSuggestion({
          category: data.category,
          confidence: data.confidence
        });
        toast({
          title: 'CNN Prediction Complete',
          description: `Identified issue category: ${data.category} (${Math.round(data.confidence * 100)}%)`,
        });
      } else {
        throw new Error('Prediction API failed');
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Prediction Error',
        description: 'Failed to run CNN prediction. Please choose the category manually.',
        variant: 'destructive'
      });
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const removeImage = () => {
    setImages([]);
    setImagePreviewUrls([]);
    setUploadedImageUrl('');
    setAiSuggestion(null);
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
      const token = localStorage.getItem('civic_auth_token');
      if (!token) throw new Error('Auth token not found. Please log in.');

      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          category: formData.category,
          severity: formData.severity,
          title: formData.title,
          description: formData.description,
          latitude: formData.latitude,
          longitude: formData.longitude,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          image_url: uploadedImageUrl,
          ai_predicted_category: aiSuggestion?.category || null,
          ai_confidence: aiSuggestion?.confidence || 0.0
        })
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit complaint');
      }

      setReportNumber(result.complaint_number);
      setSubmitted(true);
      toast({
        title: 'Report submitted!',
        description: `Your report ID is ${result.complaint_number}`,
      });
      
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
          <Card className="max-w-md w-full text-center border shadow-lg">
            <CardContent className="pt-8">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Report Submitted!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your civic complaint has been registered with the municipal authorities.
              </p>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground">Complaint Tracking ID</p>
                <p className="font-display text-2xl font-bold text-primary">{reportNumber}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button onClick={() => navigate(`/track?id=${reportNumber}`)} className="bg-secondary hover:bg-secondary/90 text-white">
                  Track Complaint
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
                  setUploadedImageUrl('');
                  setAiSuggestion(null);
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
              Report Civic Issue
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload a photo, enter details, and our CNN AI model will analyze the category immediately.
            </p>
          </div>

          {/* Form */}
          <Card className="max-w-3xl mx-auto border shadow-md">
            <CardHeader>
              <CardTitle>Complaint Form</CardTitle>
              <CardDescription>
                Provide as much detail as possible to help authorities address the issue quickly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo Upload First to trigger CNN */}
                <div className="space-y-4 bg-muted/40 p-5 rounded-xl border border-dashed border-muted-foreground/20">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold flex items-center gap-2">
                      <Camera className="h-5 w-5 text-primary" />
                      1. Upload Issue Image (Required for AI Prediction)
                    </Label>
                    {images.length > 0 && (
                      <Button type="button" variant="ghost" size="sm" onClick={removeImage} className="text-destructive gap-1">
                        <Trash2 className="h-4 w-4" /> Remove
                      </Button>
                    )}
                  </div>
                  
                  {images.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-8 bg-card rounded-lg border-2 border-dashed">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2 text-center">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          <Upload className="h-7 w-7 text-primary" />
                        </div>
                        <p className="text-sm font-semibold">Click to select photo</p>
                        <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG. Image will be processed by CNN.</p>
                      </label>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-full md:w-1/3 aspect-video md:aspect-square rounded-lg overflow-hidden border">
                        <img src={imagePreviewUrls[0]} alt="Uploaded preview" className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="w-full md:w-2/3 space-y-4">
                        {isAiAnalyzing && (
                          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 animate-pulse flex items-center gap-3">
                            <Loader2 className="h-5 w-5 animate-spin text-primary" />
                            <p className="text-sm font-medium text-primary">CNN analyzing image textures & colors...</p>
                          </div>
                        )}

                        {aiSuggestion && (
                          <div className="bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-4 space-y-3 animate-fade-in">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-accent animate-bounce" />
                                <h4 className="font-display font-semibold text-foreground">AI Prediction Result</h4>
                              </div>
                              <Badge variant="secondary" className="bg-accent/15 text-accent-foreground border-accent/20">
                                {Math.round(aiSuggestion.confidence * 100)}% Confidence
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              The CNN model predicted the category as <strong className="capitalize text-foreground">{aiSuggestion.category}</strong>.
                            </p>
                            <div className="flex gap-2">
                              <Button 
                                type="button" 
                                size="sm" 
                                onClick={applyAiSuggestions}
                                className="bg-secondary hover:bg-secondary/90 text-white gap-1.5"
                              >
                                <Sparkles className="h-4 w-4" />
                                Confirm Recommendation
                              </Button>
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm" 
                                onClick={() => setAiSuggestion(null)}
                              >
                                Change Category
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Category & Severity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">2. Category *</Label>
                    <Select value={formData.category} onValueChange={(v) => handleSelectChange('category', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category manually" />
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
                    <Label htmlFor="severity">Severity Level</Label>
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
                  <Label htmlFor="title">3. Complaint Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Short description of the issue"
                    value={formData.title}
                    onChange={handleChange}
                    maxLength={100}
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">4. Detailed Description *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe the complaint details (e.g. size of pothole, duration of issue)"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    maxLength={1000}
                  />
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-t pt-4">
                    <Label className="text-base font-semibold">5. Location Pinpointing</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={getLocation}
                      disabled={gettingLocation}
                      className="gap-2 border-primary/30 text-primary hover:bg-primary/5"
                    >
                      {gettingLocation ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                      Detect My GPS Coordinates
                    </Button>
                  </div>

                  {formData.latitude && formData.longitude && (
                    <div className="bg-accent/5 rounded-lg p-3 text-sm border flex items-center justify-between">
                      <div>
                        <p className="text-accent-foreground font-semibold">📍 Coordinates Captured</p>
                        <p className="text-muted-foreground text-xs">
                          Latitude: {formData.latitude.toFixed(6)}, Longitude: {formData.longitude.toFixed(6)}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        GPS Active
                      </Badge>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor="address">Full Address / Landmark</Label>
                      <Input
                        id="address"
                        name="address"
                        placeholder="House/street details and closest landmark"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Enter City"
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="Enter State"
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input
                        id="pincode"
                        name="pincode"
                        placeholder="6-digit pincode"
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
                    <div className="space-y-2 flex-1">
                      <div>
                        <h4 className="font-semibold text-destructive">Similar active issue detected in this city</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Another citizen has reported an issue in the same category recently. You can track their report instead.
                        </p>
                      </div>
                      <div className="bg-card rounded-lg border p-3 text-sm">
                        <p className="font-medium truncate">{duplicateReport.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Tracking ID: {duplicateReport.complaint_number} • Status: {duplicateReport.status}
                        </p>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/track?id=${duplicateReport.complaint_number}`)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
                      >
                        Track Existing Report
                      </Button>
                    </div>
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white gap-2 py-6 text-base font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Submitting Complaint...
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      Submit Civic Complaint
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
