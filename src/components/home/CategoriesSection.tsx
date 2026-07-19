import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { 
  Trash2, 
  AlertTriangle, 
  Lightbulb, 
  Car, 
  Droplets, 
  Building2,
  TreePine,
  MoreHorizontal 
} from 'lucide-react';

const categories = [
  {
    icon: Trash2,
    slug: 'garbage',
    color: 'bg-orange-100 text-orange-600',
  },
  {
    icon: AlertTriangle,
    slug: 'pothole',
    color: 'bg-red-100 text-red-600',
  },
  {
    icon: Lightbulb,
    slug: 'streetlight',
    color: 'bg-yellow-100 text-yellow-600',
  },
  {
    icon: Car,
    slug: 'traffic',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Droplets,
    slug: 'water_supply',
    color: 'bg-cyan-100 text-cyan-600',
  },
  {
    icon: Building2,
    slug: 'vandalism',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: TreePine,
    slug: 'drainage',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: MoreHorizontal,
    slug: 'other',
    color: 'bg-gray-100 text-gray-600',
  },
];

export default function CategoriesSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-secondary font-medium text-sm uppercase tracking-wider">
            {t('categories_badge')}
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4">
            {t('categories_title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('categories_desc')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/report?category=${category.slug}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-secondary/30 h-full flex flex-col items-center text-center group-hover:-translate-y-1">
                <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  <category.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {t(`cat_${category.slug}`)}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {t(`cat_${category.slug}_desc`)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
