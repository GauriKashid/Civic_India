const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\pages\\Contact.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address').max(255),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'support@civicindia.in',
    description: 'We respond within 24 hours',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '1800-XXX-XXXX',
    description: 'Toll-free helpline',
  },
  {
    icon: MapPin,
    title: 'Address',
    value: 'Pune, India',
    description: 'Headquarters',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    value: 'Mon - Sat, 9 AM - 6 PM',
    description: 'IST',
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] ] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: 'Message sent!',
        description: 'We will get back to you soon.',
      });
    } catch (e2) {
      toast({
        title: 'Failed to send',
        description: 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      _jsxDEV(Layout, { children: 
        _jsxDEV('div', { className: "py-20", children: 
          _jsxDEV('div', { className: "container mx-auto px-4"  , children: 
            _jsxDEV(Card, { className: "max-w-md mx-auto text-center"  , children: 
              _jsxDEV(CardContent, { className: "pt-12 pb-12" , children: [
                _jsxDEV('div', { className: "w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6"        , children: 
                  _jsxDEV(CheckCircle, { className: "h-10 w-10 text-accent"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 129}, this )
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 128}, this)
                , _jsxDEV('h2', { className: "font-display text-2xl font-bold mb-4"   , children: "Message Sent!" }, void 0, false, {fileName: _jsxFileName, lineNumber: 131}, this)
                , _jsxDEV('p', { className: "text-muted-foreground mb-6" , children: "Thank you for reaching out. Our team will get back to you within 24 hours."

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 132}, this)
                , _jsxDEV(Button, { onClick: () => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', subject: '', message: '' });
                }, children: "Send Another Message"

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 135}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 127}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 126}, this)
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 125}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 124}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 123}, this)
    );
  }

  return (
    _jsxDEV(Layout, { children: 
      _jsxDEV('div', { className: "py-12 lg:py-20" , children: 
        _jsxDEV('div', { className: "container mx-auto px-4"  , children: [
          /* Header */
          _jsxDEV('div', { className: "max-w-3xl mx-auto text-center mb-12"   , children: [
            _jsxDEV('div', { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary mb-4"          , children: [
              _jsxDEV(MessageSquare, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 156}, this )
              , _jsxDEV('span', { className: "text-sm font-medium" , children: "Get in Touch"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 157}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 155}, this)
            , _jsxDEV('h1', { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-4"     , children: "Contact Us"

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 159}, this)
            , _jsxDEV('p', { className: "text-muted-foreground text-lg" , children: "Have questions, feedback, or need assistance? We're here to help."

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 162}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 154}, this)

          , _jsxDEV('div', { className: "max-w-6xl mx-auto grid lg:grid-cols-3 gap-8"    , children: [
            /* Contact Info */
            _jsxDEV('div', { className: "space-y-4", children: 
              contactInfo.map((info) => (
                _jsxDEV(Card, { children: 
                  _jsxDEV(CardContent, { className: "py-6", children: 
                    _jsxDEV('div', { className: "flex items-start gap-4"  , children: [
                      _jsxDEV('div', { className: "w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0"       , children: 
                        _jsxDEV(info.icon, { className: "h-6 w-6 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 175}, this )
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 174}, this)
                      , _jsxDEV('div', { children: [
                        _jsxDEV('h3', { className: "font-semibold", children: info.title}, void 0, false, {fileName: _jsxFileName, lineNumber: 178}, this)
                        , _jsxDEV('p', { className: "text-foreground", children: info.value}, void 0, false, {fileName: _jsxFileName, lineNumber: 179}, this)
                        , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: info.description}, void 0, false, {fileName: _jsxFileName, lineNumber: 180}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 177}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 173}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 172}, this)
                }, info.title, false, {fileName: _jsxFileName, lineNumber: 171}, this)
              ))
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 169}, this)

            /* Contact Form */
            , _jsxDEV('div', { className: "lg:col-span-2", children: 
              _jsxDEV(Card, { children: [
                _jsxDEV(CardHeader, { children: [
                  _jsxDEV(CardTitle, { children: "Send us a Message"   }, void 0, false, {fileName: _jsxFileName, lineNumber: 192}, this)
                  , _jsxDEV(CardDescription, { children: "Fill out the form below and we'll get back to you as soon as possible."

                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 193}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 191}, this)
                , _jsxDEV(CardContent, { children: 
                  _jsxDEV('form', { onSubmit: handleSubmit, className: "space-y-6", children: [
                    _jsxDEV('div', { className: "grid md:grid-cols-2 gap-4"  , children: [
                      _jsxDEV('div', { className: "space-y-2", children: [
                        _jsxDEV(Label, { htmlFor: "name", children: "Name *" }, void 0, false, {fileName: _jsxFileName, lineNumber: 201}, this)
                        , _jsxDEV(Input, {
                          id: "name",
                          name: "name",
                          placeholder: "Your full name"  ,
                          value: formData.name,
                          onChange: handleChange,}, void 0, false, {fileName: _jsxFileName, lineNumber: 202}, this
                        )
                        , errors.name && _jsxDEV('p', { className: "text-sm text-destructive" , children: errors.name}, void 0, false, {fileName: _jsxFileName, lineNumber: 209}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 200}, this)
                      , _jsxDEV('div', { className: "space-y-2", children: [
                        _jsxDEV(Label, { htmlFor: "email", children: "Email *" }, void 0, false, {fileName: _jsxFileName, lineNumber: 212}, this)
                        , _jsxDEV(Input, {
                          id: "email",
                          name: "email",
                          type: "email",
                          placeholder: "your@email.com",
                          value: formData.email,
                          onChange: handleChange,}, void 0, false, {fileName: _jsxFileName, lineNumber: 213}, this
                        )
                        , errors.email && _jsxDEV('p', { className: "text-sm text-destructive" , children: errors.email}, void 0, false, {fileName: _jsxFileName, lineNumber: 221}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 211}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 199}, this)

                    , _jsxDEV('div', { className: "space-y-2", children: [
                      _jsxDEV(Label, { htmlFor: "subject", children: "Subject *" }, void 0, false, {fileName: _jsxFileName, lineNumber: 226}, this)
                      , _jsxDEV(Input, {
                        id: "subject",
                        name: "subject",
                        placeholder: "What is this regarding?"   ,
                        value: formData.subject,
                        onChange: handleChange,}, void 0, false, {fileName: _jsxFileName, lineNumber: 227}, this
                      )
                      , errors.subject && _jsxDEV('p', { className: "text-sm text-destructive" , children: errors.subject}, void 0, false, {fileName: _jsxFileName, lineNumber: 234}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 225}, this)

                    , _jsxDEV('div', { className: "space-y-2", children: [
                      _jsxDEV(Label, { htmlFor: "message", children: "Message *" }, void 0, false, {fileName: _jsxFileName, lineNumber: 238}, this)
                      , _jsxDEV(Textarea, {
                        id: "message",
                        name: "message",
                        placeholder: "Your message..." ,
                        rows: 6,
                        value: formData.message,
                        onChange: handleChange,}, void 0, false, {fileName: _jsxFileName, lineNumber: 239}, this
                      )
                      , errors.message && _jsxDEV('p', { className: "text-sm text-destructive" , children: errors.message}, void 0, false, {fileName: _jsxFileName, lineNumber: 247}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 237}, this)

                    , _jsxDEV(Button, {
                      type: "submit",
                      className: "w-full bg-secondary hover:bg-secondary/90 gap-2"   ,
                      disabled: loading,
 children: [
                      loading ? (
                        _jsxDEV(Loader2, { className: "h-4 w-4 animate-spin"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 256}, this )
                      ) : (
                        _jsxDEV(Send, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 258}, this )
                      )
                      , loading ? 'Sending...' : 'Send Message'
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 250}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 198}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 197}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 190}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 189}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 167}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 152}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 151}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 150}, this)
  );
}
