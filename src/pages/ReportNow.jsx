const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\pages\\ReportNow.tsx";import {jsxDEV as _jsxDEV, Fragment as _Fragment} from "react/jsx-dev-runtime"; function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }import { useState, useEffect } from 'react';
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
    latitude: null ,
    longitude: null ,
  });
  
  const [images, setImages] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportNumber, setReportNumber] = useState('');

  // CivicAI prediction states
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [allReports, setAllReports] = useState([]);
  const [duplicateReport, setDuplicateReport] = useState(null);

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
        _optionalChain([r, 'access', _ => _.city, 'optionalAccess', _2 => _2.trim, 'call', _3 => _3(), 'access', _4 => _4.toLowerCase, 'call', _5 => _5()]) === cleanCity
      );
      setDuplicateReport(dup || null);
    } else {
      setDuplicateReport(null);
    }
  }, [formData.city, formData.category, allReports]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
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

    const successCallback = async (position) => {
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

    const errorCallback = (error) => {
      setGettingLocation(false);
      toast({
        title: 'Location error',
        description: error.message || 'Unable to get location. Please enter manually.',
        variant: 'destructive',
      });
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, geoOptions);
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setImages([file]); // Single image upload for CNN simplicity

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreviewUrls([reader.result ]);
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

  const handleSubmit = async (e) => {
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
          ai_predicted_category: _optionalChain([aiSuggestion, 'optionalAccess', _6 => _6.category]) || null,
          ai_confidence: _optionalChain([aiSuggestion, 'optionalAccess', _7 => _7.confidence]) || 0.0
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
      _jsxDEV(Layout, { children: 
        _jsxDEV('div', { className: "min-h-[60vh] flex items-center justify-center"   , children: 
          _jsxDEV(Loader2, { className: "h-8 w-8 animate-spin text-primary"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 349}, this )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 348}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 347}, this)
    );
  }

  if (submitted) {
    return (
      _jsxDEV(Layout, { children: 
        _jsxDEV('div', { className: "min-h-[60vh] flex items-center justify-center py-12 px-4"     , children: 
          _jsxDEV(Card, { className: "max-w-md w-full text-center border shadow-lg"    , children: 
            _jsxDEV(CardContent, { className: "pt-8", children: [
              _jsxDEV('div', { className: "w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"        , children: 
                _jsxDEV(CheckCircle, { className: "h-10 w-10 text-green-600"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 362}, this )
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 361}, this)
              , _jsxDEV('h2', { className: "font-display text-2xl font-bold text-foreground mb-2"    , children: "Report Submitted!"

              }, void 0, false, {fileName: _jsxFileName, lineNumber: 364}, this)
              , _jsxDEV('p', { className: "text-muted-foreground mb-6" , children: "Your civic complaint has been registered with the municipal authorities."

              }, void 0, false, {fileName: _jsxFileName, lineNumber: 367}, this)
              , _jsxDEV('div', { className: "bg-muted rounded-lg p-4 mb-6"   , children: [
                _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: "Complaint Tracking ID"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 371}, this)
                , _jsxDEV('p', { className: "font-display text-2xl font-bold text-primary"   , children: reportNumber}, void 0, false, {fileName: _jsxFileName, lineNumber: 372}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 370}, this)
              , _jsxDEV('div', { className: "flex flex-col gap-3"  , children: [
                _jsxDEV(Button, { onClick: () => navigate(`/track?id=${reportNumber}`), className: "bg-secondary hover:bg-secondary/90 text-white"  , children: "Track Complaint"

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 375}, this)
                , _jsxDEV(Button, { variant: "outline", onClick: () => {
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
                }, children: "Submit Another Report"

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 378}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 374}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 360}, this)
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 359}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 358}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 357}, this)
    );
  }

  return (
    _jsxDEV(Layout, { children: 
      _jsxDEV('div', { className: "py-8 lg:py-12" , children: 
        _jsxDEV('div', { className: "container mx-auto px-4"  , children: [
          /* Header */
          _jsxDEV('div', { className: "max-w-3xl mx-auto text-center mb-8"   , children: [
            _jsxDEV('h1', { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-4"     , children: "Report Civic Issue"

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 414}, this)
            , _jsxDEV('p', { className: "text-muted-foreground text-lg" , children: "Upload a photo, enter details, and our CNN AI model will analyze the category immediately."

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 417}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 413}, this)

          /* Form */
          , _jsxDEV(Card, { className: "max-w-3xl mx-auto border shadow-md"   , children: [
            _jsxDEV(CardHeader, { children: [
              _jsxDEV(CardTitle, { children: "Complaint Form" }, void 0, false, {fileName: _jsxFileName, lineNumber: 425}, this)
              , _jsxDEV(CardDescription, { children: "Provide as much detail as possible to help authorities address the issue quickly."

              }, void 0, false, {fileName: _jsxFileName, lineNumber: 426}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 424}, this)
            , _jsxDEV(CardContent, { children: 
              _jsxDEV('form', { onSubmit: handleSubmit, className: "space-y-6", children: [
                /* Photo Upload First to trigger CNN */
                _jsxDEV('div', { className: "space-y-4 bg-muted/40 p-5 rounded-xl border border-dashed border-muted-foreground/20"      , children: [
                  _jsxDEV('div', { className: "flex justify-between items-center"  , children: [
                    _jsxDEV(Label, { className: "text-base font-semibold flex items-center gap-2"    , children: [
                      _jsxDEV(Camera, { className: "h-5 w-5 text-primary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 436}, this ), "1. Upload Issue Image (Required for AI Prediction)"

                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 435}, this)
                    , images.length > 0 && (
                      _jsxDEV(Button, { type: "button", variant: "ghost", size: "sm", onClick: removeImage, className: "text-destructive gap-1" , children: [
                        _jsxDEV(Trash2, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 441}, this ), " Remove"
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 440}, this)
                    )
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 434}, this)

                  , images.length === 0 ? (
                    _jsxDEV('div', { className: "flex flex-col items-center justify-center p-8 bg-card rounded-lg border-2 border-dashed"        , children: [
                      _jsxDEV('input', {
                        type: "file",
                        accept: "image/*",
                        onChange: handleImageUpload,
                        className: "hidden",
                        id: "image-upload",}, void 0, false, {fileName: _jsxFileName, lineNumber: 448}, this
                      )
                      , _jsxDEV('label', { htmlFor: "image-upload", className: "cursor-pointer flex flex-col items-center gap-2 text-center"     , children: [
                        _jsxDEV('div', { className: "w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-2"       , children: 
                          _jsxDEV(Upload, { className: "h-7 w-7 text-primary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 457}, this )
                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 456}, this)
                        , _jsxDEV('p', { className: "text-sm font-semibold" , children: "Click to select photo"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 459}, this)
                        , _jsxDEV('p', { className: "text-xs text-muted-foreground" , children: "Supported formats: JPG, PNG. Image will be processed by CNN."         }, void 0, false, {fileName: _jsxFileName, lineNumber: 460}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 455}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 447}, this)
                  ) : (
                    _jsxDEV('div', { className: "flex flex-col md:flex-row gap-6 items-center"    , children: [
                      _jsxDEV('div', { className: "w-full md:w-1/3 aspect-video md:aspect-square rounded-lg overflow-hidden border"      , children: 
                        _jsxDEV('img', { src: imagePreviewUrls[0], alt: "Uploaded preview" , className: "w-full h-full object-cover"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 466}, this )
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 465}, this)

                      , _jsxDEV('div', { className: "w-full md:w-2/3 space-y-4"  , children: [
                        isAiAnalyzing && (
                          _jsxDEV('div', { className: "bg-primary/5 border border-primary/20 rounded-xl p-4 animate-pulse flex items-center gap-3"        , children: [
                            _jsxDEV(Loader2, { className: "h-5 w-5 animate-spin text-primary"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 472}, this )
                            , _jsxDEV('p', { className: "text-sm font-medium text-primary"  , children: "CNN analyzing image textures & colors..."     }, void 0, false, {fileName: _jsxFileName, lineNumber: 473}, this)
                          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 471}, this)
                        )

                        , aiSuggestion && (
                          _jsxDEV('div', { className: "bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-xl p-4 space-y-3 animate-fade-in"        , children: [
                            _jsxDEV('div', { className: "flex items-center justify-between"  , children: [
                              _jsxDEV('div', { className: "flex items-center gap-2"  , children: [
                                _jsxDEV(Sparkles, { className: "h-5 w-5 text-accent animate-bounce"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 481}, this )
                                , _jsxDEV('h4', { className: "font-display font-semibold text-foreground"  , children: "AI Prediction Result"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 482}, this)
                              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 480}, this)
                              , _jsxDEV(Badge, { variant: "secondary", className: "bg-accent/15 text-accent-foreground border-accent/20"  , children: [
                                Math.round(aiSuggestion.confidence * 100), "% Confidence"
                              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 484}, this)
                            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 479}, this)
                            , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: ["The CNN model predicted the category as "
                                     , _jsxDEV('strong', { className: "capitalize text-foreground" , children: aiSuggestion.category}, void 0, false, {fileName: _jsxFileName, lineNumber: 489}, this), "."
                            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 488}, this)
                            , _jsxDEV('div', { className: "flex gap-2" , children: [
                              _jsxDEV(Button, { 
                                type: "button", 
                                size: "sm", 
                                onClick: applyAiSuggestions,
                                className: "bg-secondary hover:bg-secondary/90 text-white gap-1.5"   ,
 children: [
                                _jsxDEV(Sparkles, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 498}, this ), "Confirm Recommendation"

                              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 492}, this)
                              , _jsxDEV(Button, { 
                                type: "button", 
                                variant: "outline", 
                                size: "sm", 
                                onClick: () => setAiSuggestion(null),
 children: "Change Category"

                              }, void 0, false, {fileName: _jsxFileName, lineNumber: 501}, this)
                            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 491}, this)
                          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 478}, this)
                        )
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 469}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 464}, this)
                  )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 433}, this)

                /* Category & Severity */
                , _jsxDEV('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   , children: [
                  _jsxDEV('div', { className: "space-y-2", children: [
                    _jsxDEV(Label, { htmlFor: "category", children: "2. Category *"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 520}, this)
                    , _jsxDEV(Select, { value: formData.category, onValueChange: (v) => handleSelectChange('category', v), children: [
                      _jsxDEV(SelectTrigger, { children: 
                        _jsxDEV(SelectValue, { placeholder: "Select category manually"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 523}, this )
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 522}, this)
                      , _jsxDEV(SelectContent, { children: 
                        categories.map((cat) => (
                          _jsxDEV(SelectItem, { value: cat.value, children: 
                            _jsxDEV('div', { className: "flex items-center gap-2"  , children: [
                              _jsxDEV(cat.icon, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 529}, this )
                              , cat.label
                            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 528}, this)
                          }, cat.value, false, {fileName: _jsxFileName, lineNumber: 527}, this)
                        ))
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 525}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 521}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 519}, this)

                  , _jsxDEV('div', { className: "space-y-2", children: [
                    _jsxDEV(Label, { htmlFor: "severity", children: "Severity Level" }, void 0, false, {fileName: _jsxFileName, lineNumber: 539}, this)
                    , _jsxDEV(Select, { value: formData.severity, onValueChange: (v) => handleSelectChange('severity', v), children: [
                      _jsxDEV(SelectTrigger, { children: 
                        _jsxDEV(SelectValue, { placeholder: "Select severity" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 542}, this )
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 541}, this)
                      , _jsxDEV(SelectContent, { children: 
                        severities.map((sev) => (
                          _jsxDEV(SelectItem, { value: sev.value, children: 
                            sev.label
                          }, sev.value, false, {fileName: _jsxFileName, lineNumber: 546}, this)
                        ))
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 544}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 540}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 538}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 518}, this)

                /* Title */
                , _jsxDEV('div', { className: "space-y-2", children: [
                  _jsxDEV(Label, { htmlFor: "title", children: "3. Complaint Title *"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 557}, this)
                  , _jsxDEV(Input, {
                    id: "title",
                    name: "title",
                    placeholder: "Short description of the issue"    ,
                    value: formData.title,
                    onChange: handleChange,
                    maxLength: 100,}, void 0, false, {fileName: _jsxFileName, lineNumber: 558}, this
                  )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 556}, this)

                /* Description */
                , _jsxDEV('div', { className: "space-y-2", children: [
                  _jsxDEV(Label, { htmlFor: "description", children: "4. Detailed Description *"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 570}, this)
                  , _jsxDEV(Textarea, {
                    id: "description",
                    name: "description",
                    placeholder: "Describe the complaint details (e.g. size of pothole, duration of issue)"          ,
                    rows: 4,
                    value: formData.description,
                    onChange: handleChange,
                    maxLength: 1000,}, void 0, false, {fileName: _jsxFileName, lineNumber: 571}, this
                  )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 569}, this)

                /* Location */
                , _jsxDEV('div', { className: "space-y-4", children: [
                  _jsxDEV('div', { className: "flex items-center justify-between border-t pt-4"    , children: [
                    _jsxDEV(Label, { className: "text-base font-semibold" , children: "5. Location Pinpointing"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 585}, this)
                    , _jsxDEV(Button, {
                      type: "button",
                      variant: "outline",
                      size: "sm",
                      onClick: getLocation,
                      disabled: gettingLocation,
                      className: "gap-2 border-primary/30 text-primary hover:bg-primary/5"   ,
 children: [
                      gettingLocation ? (
                        _jsxDEV(Loader2, { className: "h-4 w-4 animate-spin"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 595}, this )
                      ) : (
                        _jsxDEV(MapPin, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 597}, this )
                      ), "Detect My GPS Coordinates"

                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 586}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 584}, this)

                  , formData.latitude && formData.longitude && (
                    _jsxDEV('div', { className: "bg-accent/5 rounded-lg p-3 text-sm border flex items-center justify-between"       , children: [
                      _jsxDEV('div', { children: [
                        _jsxDEV('p', { className: "text-accent-foreground font-semibold" , children: "📍 Coordinates Captured"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 606}, this)
                        , _jsxDEV('p', { className: "text-muted-foreground text-xs" , children: ["Latitude: "
                           , formData.latitude.toFixed(6), ", Longitude: "  , formData.longitude.toFixed(6)
                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 607}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 605}, this)
                      , _jsxDEV(Badge, { variant: "secondary", className: "bg-green-100 text-green-800" , children: "GPS Active"

                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 611}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 604}, this)
                  )

                  , _jsxDEV('div', { className: "grid grid-cols-1 md:grid-cols-2 gap-4"   , children: [
                    _jsxDEV('div', { className: "md:col-span-2 space-y-2" , children: [
                      _jsxDEV(Label, { htmlFor: "address", children: "Full Address / Landmark"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 619}, this)
                      , _jsxDEV(Input, {
                        id: "address",
                        name: "address",
                        placeholder: "House/street details and closest landmark"    ,
                        value: formData.address,
                        onChange: handleChange,}, void 0, false, {fileName: _jsxFileName, lineNumber: 620}, this
                      )
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 618}, this)
                    , _jsxDEV('div', { className: "space-y-2", children: [
                      _jsxDEV(Label, { htmlFor: "city", children: "City *" }, void 0, false, {fileName: _jsxFileName, lineNumber: 629}, this)
                      , _jsxDEV(Input, {
                        id: "city",
                        name: "city",
                        placeholder: "Enter City" ,
                        value: formData.city,
                        onChange: handleChange,}, void 0, false, {fileName: _jsxFileName, lineNumber: 630}, this
                      )
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 628}, this)
                    , _jsxDEV('div', { className: "space-y-2", children: [
                      _jsxDEV(Label, { htmlFor: "state", children: "State"}, void 0, false, {fileName: _jsxFileName, lineNumber: 639}, this)
                      , _jsxDEV(Input, {
                        id: "state",
                        name: "state",
                        placeholder: "Enter State" ,
                        value: formData.state,
                        onChange: handleChange,}, void 0, false, {fileName: _jsxFileName, lineNumber: 640}, this
                      )
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 638}, this)
                    , _jsxDEV('div', { className: "space-y-2", children: [
                      _jsxDEV(Label, { htmlFor: "pincode", children: "Pincode"}, void 0, false, {fileName: _jsxFileName, lineNumber: 649}, this)
                      , _jsxDEV(Input, {
                        id: "pincode",
                        name: "pincode",
                        placeholder: "6-digit pincode" ,
                        value: formData.pincode,
                        onChange: handleChange,
                        maxLength: 6,}, void 0, false, {fileName: _jsxFileName, lineNumber: 650}, this
                      )
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 648}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 617}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 583}, this)

                /* Duplicate Report Alert */
                , duplicateReport && (
                  _jsxDEV('div', { className: "bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex gap-3 items-start animate-fade-in"        , children: [
                    _jsxDEV(AlertTriangle, { className: "h-5 w-5 text-destructive flex-shrink-0 mt-0.5"    ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 665}, this )
                    , _jsxDEV('div', { className: "space-y-2 flex-1" , children: [
                      _jsxDEV('div', { children: [
                        _jsxDEV('h4', { className: "font-semibold text-destructive" , children: "Similar active issue detected in this city"      }, void 0, false, {fileName: _jsxFileName, lineNumber: 668}, this)
                        , _jsxDEV('p', { className: "text-sm text-muted-foreground mt-1"  , children: "Another citizen has reported an issue in the same category recently. You can track their report instead."

                        }, void 0, false, {fileName: _jsxFileName, lineNumber: 669}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 667}, this)
                      , _jsxDEV('div', { className: "bg-card rounded-lg border p-3 text-sm"    , children: [
                        _jsxDEV('p', { className: "font-medium truncate" , children: duplicateReport.title}, void 0, false, {fileName: _jsxFileName, lineNumber: 674}, this)
                        , _jsxDEV('p', { className: "text-xs text-muted-foreground mt-1"  , children: ["Tracking ID: "
                            , duplicateReport.complaint_number, " • Status: "   , duplicateReport.status
                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 675}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 673}, this)
                      , _jsxDEV(Button, {
                        type: "button",
                        variant: "outline",
                        size: "sm",
                        onClick: () => navigate(`/track?id=${duplicateReport.complaint_number}`),
                        className: "text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"   ,
 children: "Track Existing Report"

                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 679}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 666}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 664}, this)
                )

                /* Submit */
                , _jsxDEV(Button, {
                  type: "submit",
                  className: "w-full bg-primary hover:bg-primary/90 text-white gap-2 py-6 text-base font-semibold"       ,
                  disabled: loading,
 children: 
                  loading ? (
                    _jsxDEV(_Fragment, { children: [
                      _jsxDEV(Loader2, { className: "h-5 w-5 animate-spin"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 700}, this ), "Submitting Complaint..."

                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 699}, this)
                  ) : (
                    _jsxDEV(_Fragment, { children: [
                      _jsxDEV(Upload, { className: "h-5 w-5" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 705}, this ), "Submit Civic Complaint"

                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 704}, this)
                  )
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 693}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 431}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 430}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 423}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 411}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 410}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 409}, this)
  );
}
