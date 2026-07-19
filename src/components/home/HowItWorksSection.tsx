import { Camera, Send, CheckCircle, Bell } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

export default function HowItWorksSection() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: Camera,
      title: t('step1_title'),
      description: t('step1_desc'),
      color: 'secondary',
    },
    {
      icon: Send,
      title: t('step2_title'),
      description: t('step2_desc'),
      color: 'accent',
    },
    {
      icon: CheckCircle,
      title: t('step3_title'),
      description: t('step3_desc'),
      color: 'primary',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">{t('simple_process')}</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {t('how_it_works')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('how_desc')}
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] h-1 bg-gradient-to-r from-secondary via-accent to-primary rounded-full -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow border border-border text-center relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold flex items-center justify-center text-sm">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
                    step.color === 'secondary' ? 'bg-secondary/10' :
                    step.color === 'accent' ? 'bg-accent/10' : 'bg-primary/10'
                  }`}>
                    <step.icon className={`h-10 w-10 ${
                      step.color === 'secondary' ? 'text-secondary' :
                      step.color === 'accent' ? 'text-accent' : 'text-primary'
                    }`} />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Feature */}
        <div className="mt-16 bg-primary/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
            <Bell className="h-8 w-8 text-secondary" />
          </div>
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              {t('stay_updated_title')}
            </h3>
            <p className="text-muted-foreground">
              {t('stay_updated_desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
