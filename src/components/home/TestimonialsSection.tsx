import { Star, Quote } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const testimonials = [
  {
    key: 'test1',
    avatar: 'RK',
    rating: 5,
  },
  {
    key: 'test2',
    avatar: 'PS',
    rating: 5,
  },
  {
    key: 'test3',
    avatar: 'AP',
    rating: 5,
  },
  {
    key: 'test4',
    avatar: 'SR',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            {t('testimonials_badge')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {t('testimonials_title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('testimonials_desc')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.key}
              className="bg-card rounded-2xl p-6 shadow-card border border-border relative animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-secondary/20" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-muted-foreground mb-6 line-clamp-4">
                "{t(`${testimonial.key}_text`)}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground font-semibold flex items-center justify-center text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-medium text-foreground">{t(`${testimonial.key}_name`)}</p>
                  <p className="text-sm text-muted-foreground">{t(`${testimonial.key}_loc`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-60">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t('trusted_by')}</p>
            <p className="font-display font-bold text-lg text-foreground">{t('gov_bodies')}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t('partnered_with')}</p>
            <p className="font-display font-bold text-lg text-foreground">{t('mun_corps')}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t('recognized_by')}</p>
            <p className="font-display font-bold text-lg text-foreground">{t('smart_cities')}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{t('featured_in')}</p>
            <p className="font-display font-bold text-lg text-foreground">{t('digital_india')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
