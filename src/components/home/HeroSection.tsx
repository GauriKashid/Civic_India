import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-hero-pattern">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span className="text-sm font-medium">Smart Citizen Engagement Platform</span>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                <span className="text-primary">{t('home_hero_title')}</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-medium">
                शिकायत नहीं, बदलाव की शुरुआत
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg">
              {t('home_hero_subtitle')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 text-lg px-8" asChild>
                <Link to="/report">
                  {t('btn_report_now')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-lg px-8" asChild>
                <Link to="/track">
                  {t('btn_track_status')}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <p className="text-3xl font-display font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">{t('stats_reports_filed')}</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-accent">85%</p>
                <p className="text-sm text-muted-foreground">{t('stats_reports_resolved')}</p>
              </div>
              <div>
                <p className="text-3xl font-display font-bold text-secondary">100+</p>
                <p className="text-sm text-muted-foreground">{t('stats_communities')}</p>
              </div>
            </div>
          </div>

          {/* Hero Image/Illustration */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* India Map SVG */}
              <svg 
                viewBox="0 0 400 400" 
                className="w-full h-full india-map-pulse drop-shadow-2xl"
              >
                {/* Stylized India outline */}
                <defs>
                  <linearGradient id="indiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="50%" stopColor="hsl(var(--navy-light))" />
                    <stop offset="100%" stopColor="hsl(var(--secondary))" />
                  </linearGradient>
                </defs>
                
                {/* Simplified India shape */}
                <path
                  d="M200 20 
                     C280 30, 350 80, 370 150
                     C380 200, 360 260, 340 300
                     C320 340, 280 370, 240 380
                     C220 385, 200 390, 180 380
                     C140 370, 100 340, 80 300
                     C60 260, 50 200, 60 150
                     C80 80, 140 30, 200 20Z"
                  fill="url(#indiaGradient)"
                  stroke="hsl(var(--secondary))"
                  strokeWidth="3"
                  opacity="0.9"
                />

                {/* Floating icons representing features */}
                <g className="animate-float">
                  <circle cx="120" cy="150" r="25" fill="hsl(var(--card))" stroke="hsl(var(--secondary))" strokeWidth="2" />
                  <g transform="translate(108, 138)">
                    <MapPin className="text-secondary" width="24" height="24" />
                  </g>
                </g>

                <g className="animate-float" style={{ animationDelay: '1s' }}>
                  <circle cx="280" cy="180" r="25" fill="hsl(var(--card))" stroke="hsl(var(--accent))" strokeWidth="2" />
                  <g transform="translate(268, 168)">
                    <FileText className="text-accent" width="24" height="24" />
                  </g>
                </g>

                <g className="animate-float" style={{ animationDelay: '2s' }}>
                  <circle cx="200" cy="280" r="25" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
                  <g transform="translate(188, 268)">
                    <CheckCircle className="text-primary" width="24" height="24" />
                  </g>
                </g>

                {/* Decorative dots */}
                <circle cx="150" cy="100" r="4" fill="hsl(var(--secondary))" opacity="0.6" />
                <circle cx="250" cy="120" r="3" fill="hsl(var(--accent))" opacity="0.6" />
                <circle cx="180" cy="200" r="5" fill="hsl(var(--secondary))" opacity="0.4" />
                <circle cx="220" cy="320" r="3" fill="hsl(var(--primary-foreground))" opacity="0.6" />
                <circle cx="300" cy="250" r="4" fill="hsl(var(--accent))" opacity="0.5" />
              </svg>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-radial from-secondary/20 to-transparent rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
}
