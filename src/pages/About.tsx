import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Shield, 
  Award,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Transparency',
    description: 'Every report is tracked openly, ensuring accountability at every step.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'Built by citizens, for citizens. Your voice drives positive change.',
  },
  {
    icon: Heart,
    title: 'Empathy',
    description: 'We understand civic issues affect daily lives and treat each report with urgency.',
  },
  {
    icon: Award,
    title: 'Excellence',
    description: 'Committed to delivering the best platform for civic engagement.',
  },
];

const milestones = [
  { year: '2026', title: 'Platform Launch', description: 'Launch in selected pilot cities.' },
  { year: '2026', title: 'First 1,000 Reports', description: 'Reach our first 1,000 reports.' },
  { year: '2026', title: 'Government Partnership', description: 'Partner with local authorities.' },
  { year: '2027', title: 'Pan India Expansion', description: 'Expand to 100+ cities.' },
];

export default function About() {
  return (
    <Layout>
      <div className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              About <span className="text-gradient">CivicIndia</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Empowering millions of citizens to build a cleaner, safer, and better India through 
              technology-driven civic engagement.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                100+ Cities
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                50,000+ Reports
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                85% Resolution Rate
              </span>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="pt-8 pb-8">
                <div className="w-14 h-14 rounded-xl bg-secondary/20 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-secondary" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-4">Our Mission</h2>
                <p className="text-primary-foreground/80 leading-relaxed">
                  To bridge the gap between citizens and local authorities by providing a seamless 
                  platform for reporting and resolving civic issues. We believe that every citizen 
                  has the power to transform their community, one report at a time.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 pb-8">
                <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-secondary" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To create an India where civic issues are resolved swiftly and transparently, 
                  where every citizen feels empowered to participate in governance, and where 
                  technology serves as a catalyst for positive social change.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tagline */}
          <div className="text-center mb-20">
            <blockquote className="text-2xl md:text-3xl font-display font-bold text-foreground max-w-3xl mx-auto">
              "शिकायत नहीं, बदलाव की शुरुआत"
            </blockquote>
            <p className="text-lg text-muted-foreground mt-3">
              Not a complaint — A beginning of change.
            </p>
          </div>

          {/* Values */}
          <div className="max-w-5xl mx-auto mb-20">
            <h2 className="font-display text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={value.title} className="text-center animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="pt-8">
                    <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-secondary" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-3xl mx-auto mb-20">
            <h2 className="font-display text-3xl font-bold text-center mb-12">Our Roadmap</h2>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}>
                    <span className="text-sm text-secondary font-medium">{milestone.year}</span>
                    <h3 className="font-display font-semibold text-lg">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-secondary border-4 border-background md:-translate-x-1/2" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-muted/50 rounded-2xl p-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of citizens who are actively building a better India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 gap-2" asChild>
                <Link to="/report">
                  Report an Issue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
