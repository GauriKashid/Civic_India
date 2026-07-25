const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\pages\\Auth.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('citizen');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

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
    setLoading(true);

    try {
      if (isSignUp) {
        const result = signupSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] ] = err.message;
            }
          });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.fullName, role);
        if (error) {
          if (error.message.includes('already registered')) {
            toast({
              title: 'Account already exists',
              description: 'Please sign in instead or use a different email.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Sign up failed',
              description: error.message,
              variant: 'destructive',
            });
          }
        } else {
          toast({
            title: 'Account created!',
            description: `Welcome to CivicIndia. You are registered as a ${role === 'admin' ? 'Municipal Authority' : 'Citizen'}.`,
          });
          navigate(role === 'admin' ? '/admin' : '/');
        }
      } else {
        const result = loginSchema.safeParse(formData);
        if (!result.success) {
          const fieldErrors = {};
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              fieldErrors[err.path[0] ] = err.message;
            }
          });
          setErrors(fieldErrors);
          setLoading(false);
          return;
        }

        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: 'Sign in failed',
            description: 'Invalid email or password. Please try again.',
            variant: 'destructive',
          });
        } else {
          toast({
            title: 'Welcome back!',
            description: 'You have successfully signed in.',
          });
        }
      }
    } catch (e2) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    _jsxDEV(Layout, { showFooter: false, children: 
      _jsxDEV('div', { className: "min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 bg-hero-pattern"      , children: 
        _jsxDEV('div', { className: "w-full max-w-md animate-fade-in-up"  , children: 
          _jsxDEV(Card, { className: "border-border/50 shadow-xl" , children: [
            _jsxDEV(CardHeader, { className: "text-center pb-2" , children: [
              _jsxDEV('div', { className: "mx-auto w-16 h-16 mb-4"   , children: 
                _jsxDEV('svg', { viewBox: "0 0 100 100"   , className: "w-full h-full india-map-pulse"  , children: [
                  _jsxDEV('path', {
                    d: "M50 5 C30 5, 15 20, 15 35 C15 55, 35 75, 50 95 C65 75, 85 55, 85 35 C85 20, 70 5, 50 5"                         ,
                    fill: "hsl(var(--primary))",
                    stroke: "hsl(var(--secondary))",
                    strokeWidth: "3",}, void 0, false, {fileName: _jsxFileName, lineNumber: 153}, this
                  )
                  , _jsxDEV('path', {
                    d: "M50 25 L55 40 L70 40 L58 50 L63 65 L50 55 L37 65 L42 50 L30 40 L45 40 Z"                    ,
                    fill: "hsl(var(--secondary))",}, void 0, false, {fileName: _jsxFileName, lineNumber: 159}, this
                  )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 152}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 151}, this)
              , _jsxDEV(CardTitle, { className: "font-display text-2xl" , children: 
                isSignUp ? 'Create Account' : 'Welcome Back'
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 165}, this)
              , _jsxDEV(CardDescription, { children: 
                isSignUp
                  ? 'Join CivicIndia and start making a difference'
                  : 'Sign in to continue to CivicIndia'
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 168}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 150}, this)

            , _jsxDEV(CardContent, { children: [
              /* Role selector tab-group */
              _jsxDEV('div', { className: "flex gap-2 p-1 bg-muted rounded-lg mb-6 border"      , children: [
                _jsxDEV('button', {
                  type: "button",
                  onClick: () => setRole('citizen'),
                  className: `flex-1 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
                    role === 'citizen'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`,
 children: [
                  _jsxDEV(User, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 187}, this ), "Citizen"

                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 178}, this)
                , _jsxDEV('button', {
                  type: "button",
                  onClick: () => setRole('admin'),
                  className: `flex-1 py-2 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
                    role === 'admin'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`,
 children: [
                  _jsxDEV(Shield, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 199}, this ), "Authority"

                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 190}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 177}, this)

              , _jsxDEV('form', { onSubmit: handleSubmit, className: "space-y-4", children: [
                isSignUp && (
                  _jsxDEV('div', { className: "space-y-2", children: [
                    _jsxDEV(Label, { htmlFor: "fullName", children: "Full Name" }, void 0, false, {fileName: _jsxFileName, lineNumber: 207}, this)
                    , _jsxDEV('div', { className: "relative", children: [
                      _jsxDEV(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"      ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 209}, this )
                      , _jsxDEV(Input, {
                        id: "fullName",
                        name: "fullName",
                        placeholder: "Enter your full name"   ,
                        className: "pl-10",
                        value: formData.fullName,
                        onChange: handleChange,}, void 0, false, {fileName: _jsxFileName, lineNumber: 210}, this
                      )
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 208}, this)
                    , errors.fullName && (
                      _jsxDEV('p', { className: "text-sm text-destructive" , children: errors.fullName}, void 0, false, {fileName: _jsxFileName, lineNumber: 220}, this)
                    )
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 206}, this)
                )

                , _jsxDEV('div', { className: "space-y-2", children: [
                  _jsxDEV(Label, { htmlFor: "email", children: "Email"}, void 0, false, {fileName: _jsxFileName, lineNumber: 226}, this)
                  , _jsxDEV('div', { className: "relative", children: [
                    _jsxDEV(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"      ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 228}, this )
                    , _jsxDEV(Input, {
                      id: "email",
                      name: "email",
                      type: "email",
                      placeholder: "Enter your email"  ,
                      className: "pl-10",
                      value: formData.email,
                      onChange: handleChange,}, void 0, false, {fileName: _jsxFileName, lineNumber: 229}, this
                    )
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 227}, this)
                  , errors.email && (
                    _jsxDEV('p', { className: "text-sm text-destructive" , children: errors.email}, void 0, false, {fileName: _jsxFileName, lineNumber: 240}, this)
                  )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 225}, this)

                , _jsxDEV('div', { className: "space-y-2", children: [
                  _jsxDEV(Label, { htmlFor: "password", children: "Password"}, void 0, false, {fileName: _jsxFileName, lineNumber: 245}, this)
                  , _jsxDEV('div', { className: "relative", children: [
                    _jsxDEV(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"      ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 247}, this )
                    , _jsxDEV(Input, {
                      id: "password",
                      name: "password",
                      type: showPassword ? 'text' : 'password',
                      placeholder: "Enter your password"  ,
                      className: "pl-10 pr-10" ,
                      value: formData.password,
                      onChange: handleChange,}, void 0, false, {fileName: _jsxFileName, lineNumber: 248}, this
                    )
                    , _jsxDEV('button', {
                      type: "button",
                      onClick: () => setShowPassword(!showPassword),
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"     ,
 children: 
                      showPassword ? _jsxDEV(EyeOff, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 262}, this ) : _jsxDEV(Eye, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 262}, this )
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 257}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 246}, this)
                  , errors.password && (
                    _jsxDEV('p', { className: "text-sm text-destructive" , children: errors.password}, void 0, false, {fileName: _jsxFileName, lineNumber: 266}, this)
                  )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 244}, this)

                , isSignUp && (
                  _jsxDEV('div', { className: "space-y-2", children: [
                    _jsxDEV(Label, { htmlFor: "confirmPassword", children: "Confirm Password" }, void 0, false, {fileName: _jsxFileName, lineNumber: 272}, this)
                    , _jsxDEV('div', { className: "relative", children: [
                      _jsxDEV(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"      ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 274}, this )
                      , _jsxDEV(Input, {
                        id: "confirmPassword",
                        name: "confirmPassword",
                        type: showPassword ? 'text' : 'password',
                        placeholder: "Confirm your password"  ,
                        className: "pl-10",
                        value: formData.confirmPassword,
                        onChange: handleChange,}, void 0, false, {fileName: _jsxFileName, lineNumber: 275}, this
                      )
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 273}, this)
                    , errors.confirmPassword && (
                      _jsxDEV('p', { className: "text-sm text-destructive" , children: errors.confirmPassword}, void 0, false, {fileName: _jsxFileName, lineNumber: 286}, this)
                    )
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 271}, this)
                )

                , _jsxDEV(Button, {
                  type: "submit",
                  className: "w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2"    ,
                  disabled: loading,
 children: [
                  loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'
                  , _jsxDEV(ArrowRight, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 297}, this )
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 291}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 204}, this)

              , _jsxDEV('div', { className: "mt-6 text-center" , children: 
                _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: [
                  isSignUp ? 'Already have an account?' : "Don't have an account?", ' '
                  , _jsxDEV('button', {
                    type: "button",
                    onClick: () => {
                      setIsSignUp(!isSignUp);
                      setErrors({});
                    },
                    className: "text-secondary hover:underline font-medium"  ,
 children: 
                    isSignUp ? 'Sign In' : 'Sign Up'
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 304}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 302}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 301}, this)

              , _jsxDEV('div', { className: "mt-4 text-center" , children: 
                _jsxDEV(Link, { to: "/", className: "text-sm text-muted-foreground hover:text-foreground"  , children: "← Back to Home"

                }, void 0, false, {fileName: _jsxFileName, lineNumber: 318}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 317}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 175}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 149}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 148}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 147}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 146}, this)
  );
}
