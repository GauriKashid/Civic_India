import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Car, 
  Users, 
  Leaf, 
  Shield, 
  CheckCircle,
  XCircle,
  ChevronRight,
  Award,
  Loader2,
  Brain,
  LucideIcon
} from 'lucide-react';

interface QuizCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Quiz {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  points: number;
  category_id: string;
}

interface UserProgress {
  quiz_id: string;
  is_correct: boolean;
}

const iconMap: Record<string, LucideIcon> = {
  car: Car,
  users: Users,
  leaf: Leaf,
  shield: Shield,
};

const translateCategoryName = (name: string, t: (key: string) => string) => {
  if (name === 'Traffic Rules') return t('cat_traffic_rules') || name;
  if (name === 'Civic Responsibilities') return t('cat_civic_resp') || name;
  if (name === 'Environmental Awareness') return t('cat_env_awareness') || name;
  if (name === 'Public Safety') return t('cat_public_safety') || name;
  return name;
};

const translateCategoryDesc = (desc: string, t: (key: string) => string) => {
  if (desc.toLowerCase().includes('traffic rules')) return t('cat_traffic_rules_desc') || desc;
  if (desc.toLowerCase().includes('duties as a responsible citizen')) return t('cat_civic_resp_desc') || desc;
  if (desc.toLowerCase().includes('waste management')) return t('cat_env_awareness_desc') || desc;
  if (desc.toLowerCase().includes('emergency services')) return t('cat_public_safety_desc') || desc;
  return desc;
};

const fallbackQuizzes: Omit<Quiz, 'id'>[] = [
  // Traffic Rules
  {
    category_id: 'Traffic Rules',
    question: 'What is the minimum age for obtaining a driving license for a motorcycle in India?',
    options: ['16 years', '18 years', '21 years', '14 years'],
    correct_answer: 1,
    points: 10
  },
  {
    category_id: 'Traffic Rules',
    question: 'What color is the stop signal on a traffic light?',
    options: ['Green', 'Yellow', 'Red', 'Blue'],
    correct_answer: 2,
    points: 10
  },
  {
    category_id: 'Traffic Rules',
    question: 'What does a flashing yellow traffic light signal mean?',
    options: ['Stop completely', 'Slow down and proceed with caution', 'Speed up to clear the intersection', 'Go at normal speed'],
    correct_answer: 1,
    points: 10
  },
  {
    category_id: 'Traffic Rules',
    question: 'On which side of the road must you drive in India?',
    options: ['Right side', 'Left side', 'Middle of the road', 'Any side'],
    correct_answer: 1,
    points: 10
  },
  {
    category_id: 'Traffic Rules',
    question: 'What does a round sign with a red border and a diagonal line across a horn indicate?',
    options: ['Honking allowed', 'Compulsory honking', 'Silence Zone / No Honking', 'Parking for vehicles'],
    correct_answer: 2,
    points: 10
  },
  // Civic Responsibilities
  {
    category_id: 'Civic Responsibilities',
    question: 'Which of the following is a civic duty of every Indian citizen?',
    options: ['Pay taxes', 'Vote in elections', 'Follow laws', 'All of the above'],
    correct_answer: 3,
    points: 10
  },
  {
    category_id: 'Civic Responsibilities',
    question: 'Which Article of the Indian Constitution outlines the Fundamental Duties of citizens?',
    options: ['Article 21', 'Article 51A', 'Article 19', 'Article 32'],
    correct_answer: 1,
    points: 10
  },
  {
    category_id: 'Civic Responsibilities',
    question: 'What is the legal minimum voting age for citizens in India?',
    options: ['21 years', '18 years', '25 years', '16 years'],
    correct_answer: 1,
    points: 10
  },
  {
    category_id: 'Civic Responsibilities',
    question: 'When was the Swachh Bharat Mission launched in India?',
    options: ['15 August 2015', '2 October 2014', '26 January 2015', '14 November 2014'],
    correct_answer: 1,
    points: 10
  },
  {
    category_id: 'Civic Responsibilities',
    question: 'What does RTI stand for in Indian governance?',
    options: ['Right to Independence', 'Right to Information', 'Right to Education', 'Right to Inspection'],
    correct_answer: 1,
    points: 10
  },
  // Environmental Awareness
  {
    category_id: 'Environmental Awareness',
    question: 'What should you do with wet and dry waste at home?',
    options: ['Mix them together', 'Burn them', 'Segregate them separately', 'Throw anywhere'],
    correct_answer: 2,
    points: 10
  },
  {
    category_id: 'Environmental Awareness',
    question: 'Which of the following is a biodegradable type of waste?',
    options: ['Plastic bottles', 'Fruit and vegetable peels', 'Glass jars', 'Aluminium cans'],
    correct_answer: 1,
    points: 10
  },
  {
    category_id: 'Environmental Awareness',
    question: 'What is the primary objective of rainwater harvesting?',
    options: ['Recharging the groundwater table', 'Generating hydroelectric power', 'Cleaning local roads', 'Increasing soil erosion'],
    correct_answer: 0,
    points: 10
  },
  {
    category_id: 'Environmental Awareness',
    question: 'What do the three "R"s of eco-friendly living stand for?',
    options: ['React, Resolve, Recycle', 'Reduce, Reuse, Recycle', 'Replace, Reclaim, Restore', 'Rebuild, Renew, Recover'],
    correct_answer: 1,
    points: 10
  },
  {
    category_id: 'Environmental Awareness',
    question: 'Which gas is majorly responsible for trapping heat and causing global warming?',
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    correct_answer: 1,
    points: 10
  },
  // Public Safety
  {
    category_id: 'Public Safety',
    question: 'What is the emergency number for police in India?',
    options: ['100', '101', '102', '108'],
    correct_answer: 0,
    points: 10
  },
  {
    category_id: 'Public Safety',
    question: 'What is the integrated single emergency helpline number in India (similar to 911)?',
    options: ['100', '112', '101', '102'],
    correct_answer: 1,
    points: 10
  },
  {
    category_id: 'Public Safety',
    question: 'What is the emergency helpline number for calling fire services in India?',
    options: ['101', '100', '108', '102'],
    correct_answer: 0,
    points: 10
  },
  {
    category_id: 'Public Safety',
    question: 'What should you do immediately if you experience an earthquake inside a building?',
    options: ['Run to the elevator', 'Drop, Cover, and Hold on', 'Go up to the terrace', 'Stand near the windows'],
    correct_answer: 1,
    points: 10
  },
  {
    category_id: 'Public Safety',
    question: 'Which authority is primarily responsible for disaster management at the national level in India?',
    options: ['NDMA (National Disaster Management Authority)', 'DRDO', 'ISRO', 'NITI Aayog'],
    correct_answer: 0,
    points: 10
  }
];

export default function Education() {
  const { user } = useAuth();
  const { toast } = useToast();
  const { t } = useLanguage();
  
  const [categories, setCategories] = useState<QuizCategory[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch categories
      const { data: catData } = await supabase
        .from('quiz_categories')
        .select('*')
        .order('name');
      const categoriesList = catData || [];
      setCategories(categoriesList);

      // Fetch all quizzes
      const { data: quizData } = await supabase
        .from('quizzes')
        .select('*');
      
      const dbQuizzes = (quizData || []).map(q => ({ ...q, options: q.options as string[] }));
      const augmentedQuizzes = [...dbQuizzes];

      // Augment with fallback quizzes if they are missing
      fallbackQuizzes.forEach((fallback, index) => {
        const cat = categoriesList.find(c => c.name === fallback.category_id);
        if (cat) {
          const alreadyExists = dbQuizzes.some(dbQ => dbQ.question.toLowerCase().trim() === fallback.question.toLowerCase().trim());
          if (!alreadyExists) {
            augmentedQuizzes.push({
              id: `fallback-${index}`,
              question: fallback.question,
              options: fallback.options,
              correct_answer: fallback.correct_answer,
              points: fallback.points,
              category_id: cat.id
            });
          }
        }
      });

      setQuizzes(augmentedQuizzes);

      // Fetch user progress if logged in
      if (user) {
        const { data: progressData } = await supabase
          .from('user_quiz_progress')
          .select('quiz_id, is_correct')
          .eq('user_id', user.id);
        setUserProgress(progressData || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [user, fetchData]);

  const getCategoryQuizzes = (categoryId: string) => {
    return quizzes.filter(q => q.category_id === categoryId);
  };

  const getCategoryProgress = (categoryId: string) => {
    const categoryQuizzes = getCategoryQuizzes(categoryId);
    const completedQuizzes = userProgress.filter(p => 
      categoryQuizzes.some(q => q.id === p.quiz_id)
    );
    return {
      completed: completedQuizzes.length,
      total: categoryQuizzes.length,
      correct: completedQuizzes.filter(p => p.is_correct).length,
    };
  };

  const handleStartQuiz = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = async (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const currentQuiz = getCategoryQuizzes(selectedCategory!)[currentQuizIndex];
    const isCorrect = answerIndex === currentQuiz.correct_answer;

    if (user) {
      // Check if already answered
      const alreadyAnswered = userProgress.some(p => p.quiz_id === currentQuiz.id);
      
      if (!alreadyAnswered) {
        try {
          if (!currentQuiz.id.startsWith('fallback-')) {
            await supabase
              .from('user_quiz_progress')
              .insert({
                user_id: user.id,
                quiz_id: currentQuiz.id,
                is_correct: isCorrect,
              });
          }
        } catch (dbErr) {
          console.warn('Bypassed DB write for fallback quiz:', dbErr);
        }

        setUserProgress(prev => [...prev, { quiz_id: currentQuiz.id, is_correct: isCorrect }]);
      }
    }

    if (isCorrect) {
      toast({
        title: `🎉 ${t('ed_correct')}`,
        description: `You earned ${currentQuiz.points} points!`,
      });
    } else {
      toast({
        title: `❌ ${t('ed_incorrect')}`,
        description: 'Better luck next time!',
        variant: 'destructive',
      });
    }
  };

  const handleNext = () => {
    const categoryQuizzes = getCategoryQuizzes(selectedCategory!);
    if (currentQuizIndex < categoryQuizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setSelectedCategory(null);
      fetchData(); // Refresh progress
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  // Quiz Mode
  if (selectedCategory) {
    const categoryQuizzes = getCategoryQuizzes(selectedCategory);
    const currentQuiz = categoryQuizzes[currentQuizIndex];
    const category = categories.find(c => c.id === selectedCategory);

    if (!currentQuiz) {
      return (
        <Layout>
          <div className="py-12 text-center">
            <p>No quizzes available in this category.</p>
            <Button onClick={() => setSelectedCategory(null)} className="mt-4">
              Go Back
            </Button>
          </div>
        </Layout>
      );
    }

    return (
      <Layout>
        <div className="py-8 lg:py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            {/* Progress */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{category ? translateCategoryName(category.name, t) : ''}</p>
                <p className="text-sm font-medium">
                  {t('ed_question')} {currentQuizIndex + 1} of {categoryQuizzes.length}
                </p>
              </div>
              <Progress value={((currentQuizIndex + 1) / categoryQuizzes.length) * 100} />
            </div>

            {/* Question Card */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-xl leading-relaxed">
                  {currentQuiz.question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentQuiz.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = currentQuiz.correct_answer === index;
                  
                  let buttonClass = 'w-full justify-start text-left h-auto py-4 px-4';
                  
                  if (showResult) {
                    if (isCorrect) {
                      buttonClass += ' bg-accent/10 border-accent text-accent hover:bg-accent/10';
                    } else if (isSelected && !isCorrect) {
                      buttonClass += ' bg-destructive/10 border-destructive text-destructive hover:bg-destructive/10';
                    }
                  }

                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className={buttonClass}
                      onClick={() => handleAnswer(index)}
                      disabled={showResult}
                    >
                      <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 text-sm font-medium">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {showResult && isCorrect && (
                        <CheckCircle className="h-5 w-5 text-accent ml-2" />
                      )}
                      {showResult && isSelected && !isCorrect && (
                        <XCircle className="h-5 w-5 text-destructive ml-2" />
                      )}
                    </Button>
                  );
                })}

                {showResult && (
                  <div className="pt-4 flex justify-between items-center">
                    <Badge variant="secondary" className="gap-1">
                      <Award className="h-3 w-3" />
                      {currentQuiz.points} {t('ed_quiz_points')}
                    </Badge>
                    <Button onClick={handleNext} className="bg-secondary hover:bg-secondary/90 gap-2">
                      {currentQuizIndex < categoryQuizzes.length - 1 ? t('ed_next') : t('ed_finish')}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button 
              variant="ghost" 
              onClick={() => setSelectedCategory(null)}
              className="mt-4"
            >
              ← Exit Quiz
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Category Selection
  return (
    <Layout>
      <div className="py-8 lg:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary mb-4">
              <BookOpen className="h-4 w-4" />
              <span className="text-sm font-medium">Learn & Earn</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('ed_title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('ed_desc')}
            </p>
          </div>

          {/* Stats for logged in users */}
          {user && userProgress.length > 0 && (
            <div className="max-w-3xl mx-auto mb-8">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="py-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                        <Brain className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-lg">{t('welcome')}</p>
                        <p className="text-sm text-muted-foreground">
                          {userProgress.length} completed • {userProgress.filter(p => p.is_correct).length} correct
                        </p>
                      </div>
                    </div>
                    <Link to="/leaderboard">
                      <Button variant="outline" className="gap-2">
                        <Award className="h-4 w-4" />
                        {t('nav_leaderboard')}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Categories */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon] || BookOpen;
              const progress = getCategoryProgress(category.id);
              const categoryQuizzes = getCategoryQuizzes(category.id);
              
              return (
                <Card 
                  key={category.id}
                  className="hover:shadow-lg transition-shadow animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-7 w-7 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{translateCategoryName(category.name, t)}</CardTitle>
                        <CardDescription>{translateCategoryDesc(category.description, t)}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {user && progress.total > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{progress.completed}/{progress.total} completed</span>
                        </div>
                        <Progress value={(progress.completed / progress.total) * 100} />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {categoryQuizzes.length} Questions
                      </Badge>
                      <Button 
                        onClick={() => handleStartQuiz(category.id)}
                        className="bg-secondary hover:bg-secondary/90 gap-2"
                        disabled={categoryQuizzes.length === 0}
                      >
                        {progress.completed === progress.total && progress.total > 0 ? 'Retake Quiz' : t('ed_start')}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {!user && (
            <div className="max-w-md mx-auto text-center mt-12">
              <Card>
                <CardContent className="py-8">
                  <Award className="h-12 w-12 text-secondary mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Sign in to track your progress, earn points, and compete on the leaderboard!
                  </p>
                  <Button asChild className="bg-secondary hover:bg-secondary/90">
                    <Link to="/auth">{t('btn_signin')}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
