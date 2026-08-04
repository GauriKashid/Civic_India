import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-secondary/10 via-background to-accent/10 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary mb-8">
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">{t('join_movement')}</span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('be_the_change')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('be_the_change_desc')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground gap-2 text-lg px-8" asChild>
              <Link to="/report">
                {t('btn_report_now')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-lg px-8" asChild>
              <Link to="/education">
                {t('btn_learn_civic')}
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <span className="text-foreground font-medium">{t('secure_anonymous')}</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                <Award className="h-5 w-5 text-secondary" />
              </div>
              <span className="text-foreground font-medium">{t('earn_badges')}</span>
            </div>
            <div className="flex items-center gap-3 justify-center md:justify-end">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <span className="text-foreground font-medium">{t('join_community')}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
