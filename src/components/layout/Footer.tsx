import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    d="M50 5 C30 5, 15 20, 15 35 C15 55, 35 75, 50 95 C65 75, 85 55, 85 35 C85 20, 70 5, 50 5"
                    fill="hsl(var(--secondary))"
                    stroke="hsl(var(--primary-foreground))"
                    strokeWidth="2"
                  />
                  <path
                    d="M50 25 L55 40 L70 40 L58 50 L63 65 L50 55 L37 65 L42 50 L30 40 L45 40 Z"
                    fill="hsl(var(--primary-foreground))"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-display font-bold text-xl">CivicIndia.in</h3>
                <p className="text-sm text-primary-foreground/70">शिकायत नहीं, बदलाव की शुरुआत</p>
              </div>
            </Link>
            <p className="text-primary-foreground/80 mb-6 max-w-md">
              {t('home_hero_subtitle')}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-secondary" />
                <span>support@civicindia.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-secondary" />
                <span>1800-XXX-XXXX (Toll Free)</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-secondary" />
                <span>Pune, India</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">{t('nav_home')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/report" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  {t('nav_report')}
                </Link>
              </li>
              <li>
                <Link to="/track" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  {t('nav_track')}
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  {t('nav_education')}
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  {t('nav_leaderboard')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">{t('nav_resources')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/resources#traffic" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Traffic Rules
                </Link>
              </li>
              <li>
                <Link to="/resources#civic" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Civic Guidelines
                </Link>
              </li>
              <li>
                <Link to="/resources#safety" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Safety Tips
                </Link>
              </li>
              <li>
                <Link to="/resources#faq" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">{t('nav_about')}</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  {t('nav_about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  {t('nav_contact')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-primary-foreground/70 hover:text-secondary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} CivicIndia.in. All rights reserved. Made with ❤️ for India.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 rounded-full bg-primary-foreground/10 hover:bg-secondary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
