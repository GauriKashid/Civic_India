import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Car, 
  Users, 
  Shield, 
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Phone,
  ArrowRight
} from 'lucide-react';

const trafficRules = [
  {
    title: 'Speed Limits',
    content: 'Residential areas: 25-30 km/h | City roads: 50 km/h | Highways: 80-100 km/h. Always follow posted speed limit signs.',
  },
  {
    title: 'Traffic Signals',
    content: 'Red: Stop completely | Yellow: Prepare to stop | Green: Proceed if clear. Never jump traffic signals.',
  },
  {
    title: 'Lane Discipline',
    content: 'Keep left unless overtaking. Use indicators before changing lanes. Check mirrors before any lane change.',
  },
  {
    title: 'Helmet & Seatbelt',
    content: 'Helmets mandatory for two-wheelers. Seatbelts mandatory for all car occupants. Children under 4 years need child seats.',
  },
  {
    title: 'Drunk Driving',
    content: 'Blood alcohol limit: 0.03%. Penalties include heavy fines, license suspension, and imprisonment.',
  },
  {
    title: 'Mobile Phone Usage',
    content: 'Using mobile phones while driving is illegal. Use hands-free devices or pull over safely to attend calls.',
  },
];

const civicDuties = [
  {
    title: 'Waste Segregation',
    content: 'Separate wet waste (biodegradable) and dry waste (recyclable). Use designated bins. Never litter in public spaces.',
  },
  {
    title: 'Water Conservation',
    content: 'Report water leakages immediately. Use water responsibly. Rainwater harvesting is encouraged.',
  },
  {
    title: 'Public Property',
    content: 'Do not vandalize or damage public property. Report any damage you notice. Keep public spaces clean.',
  },
  {
    title: 'Noise Pollution',
    content: 'Avoid honking unnecessarily. Keep music/TV volume low. No loudspeakers after 10 PM in residential areas.',
  },
  {
    title: 'Queue System',
    content: 'Always stand in queues at public places. Be patient and courteous. Give priority to elderly and disabled.',
  },
  {
    title: 'Voting',
    content: 'Voting is both a right and duty. Register as a voter when eligible. Participate in all elections.',
  },
];

const emergencyNumbers = [
  { service: 'Police', number: '100', icon: Shield },
  { service: 'Fire', number: '101', icon: AlertTriangle },
  { service: 'Ambulance', number: '102', icon: Phone },
  { service: 'Women Helpline', number: '1091', icon: Users },
  { service: 'Child Helpline', number: '1098', icon: Users },
  { service: 'National Emergency', number: '112', icon: Phone },
];

const faqs = [
  {
    question: 'How do I report a civic issue?',
    answer: 'Click on "Report Now" in the navigation, select the category of issue, upload photos, add location details, and submit. You will receive a unique tracking ID.',
  },
  {
    question: 'How long does it take for an issue to be resolved?',
    answer: 'Resolution time varies based on the severity and type of issue. Simple issues may be resolved within 48-72 hours, while complex issues may take 2-4 weeks.',
  },
  {
    question: 'Can I report anonymously?',
    answer: 'Yes, while we encourage registration for tracking purposes, you can submit basic reports without creating an account.',
  },
  {
    question: 'How do I track my report?',
    answer: 'Use your unique Report ID on the "Track Report" page. You can also view all your reports in your dashboard after signing in.',
  },
  {
    question: 'What types of issues can I report?',
    answer: 'You can report garbage dumping, potholes, streetlight issues, traffic problems, water supply issues, vandalism, drainage problems, and other civic concerns.',
  },
  {
    question: 'Is this platform connected to government authorities?',
    answer: 'CivicIndia works in partnership with municipal corporations and Smart Cities Mission to ensure reports reach the concerned authorities.',
  },
];

export default function Resources() {
  return (
    <Layout>
      <div className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Resources & Guidelines
            </h1>
            <p className="text-muted-foreground text-lg">
              Everything you need to know about civic responsibilities, traffic rules, and emergency services.
            </p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="traffic" className="max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 w-full mb-8">
              <TabsTrigger value="traffic" className="gap-2">
                <Car className="h-4 w-4 hidden sm:block" />
                Traffic
              </TabsTrigger>
              <TabsTrigger value="civic" className="gap-2">
                <Users className="h-4 w-4 hidden sm:block" />
                Civic Duties
              </TabsTrigger>
              <TabsTrigger value="safety" className="gap-2">
                <Shield className="h-4 w-4 hidden sm:block" />
                Safety
              </TabsTrigger>
              <TabsTrigger value="faq" className="gap-2">
                <HelpCircle className="h-4 w-4 hidden sm:block" />
                FAQ
              </TabsTrigger>
            </TabsList>

            {/* Traffic Rules */}
            <TabsContent value="traffic">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-secondary" />
                    Traffic Rules & Road Safety
                  </CardTitle>
                  <CardDescription>
                    Know the rules of the road to ensure safe travel for everyone.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {trafficRules.map((rule) => (
                      <div key={rule.title} className="p-4 rounded-lg bg-muted/50">
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          {rule.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{rule.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Civic Duties */}
            <TabsContent value="civic">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-secondary" />
                    Civic Responsibilities
                  </CardTitle>
                  <CardDescription>
                    Your duties as a responsible citizen of India.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {civicDuties.map((duty) => (
                      <div key={duty.title} className="p-4 rounded-lg bg-muted/50">
                        <h3 className="font-semibold flex items-center gap-2 mb-2">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          {duty.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{duty.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Safety */}
            <TabsContent value="safety">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-secondary" />
                    Emergency Numbers & Safety Tips
                  </CardTitle>
                  <CardDescription>
                    Important emergency contacts and safety guidelines.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  {/* Emergency Numbers */}
                  <div>
                    <h3 className="font-semibold mb-4">Emergency Helplines</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {emergencyNumbers.map((emergency) => (
                        <div key={emergency.service} className="p-4 rounded-lg bg-destructive/10 text-center">
                          <emergency.icon className="h-6 w-6 mx-auto mb-2 text-destructive" />
                          <p className="font-bold text-2xl text-destructive">{emergency.number}</p>
                          <p className="text-sm text-muted-foreground">{emergency.service}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Safety Tips */}
                  <div>
                    <h3 className="font-semibold mb-4">General Safety Tips</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-muted/50">
                        <h4 className="font-medium mb-2">Personal Safety</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Keep emergency contacts saved on speed dial</li>
                          <li>• Share live location with family when traveling late</li>
                          <li>• Be aware of your surroundings</li>
                          <li>• Avoid isolated areas at night</li>
                        </ul>
                      </div>
                      <div className="p-4 rounded-lg bg-muted/50">
                        <h4 className="font-medium mb-2">Online Safety</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Never share OTP or passwords</li>
                          <li>• Verify before clicking unknown links</li>
                          <li>• Report online harassment to Cyber Crime</li>
                          <li>• Use strong, unique passwords</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* FAQ */}
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-secondary" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Common questions about using CivicIndia.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA */}
          <div className="max-w-4xl mx-auto mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Want to test your knowledge? Take our civic education quizzes!
            </p>
            <Button asChild className="bg-secondary hover:bg-secondary/90 gap-2">
              <Link to="/education">
                Start Learning
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
