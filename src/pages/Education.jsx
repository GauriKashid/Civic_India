const _jsxFileName = "c:\\Users\\gauri\\Downloads\\CIVICINDIA\\src\\pages\\Education.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { useState, useEffect, useCallback } from 'react';
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

} from 'lucide-react';






















const iconMap = {
  car: Car,
  users: Users,
  leaf: Leaf,
  shield: Shield,
};

const translateCategoryName = (name, t) => {
  if (name === 'Traffic Rules') return t('cat_traffic_rules') || name;
  if (name === 'Civic Responsibilities') return t('cat_civic_resp') || name;
  if (name === 'Environmental Awareness') return t('cat_env_awareness') || name;
  if (name === 'Public Safety') return t('cat_public_safety') || name;
  return name;
};

const translateCategoryDesc = (desc, t) => {
  if (desc.toLowerCase().includes('traffic rules')) return t('cat_traffic_rules_desc') || desc;
  if (desc.toLowerCase().includes('duties as a responsible citizen')) return t('cat_civic_resp_desc') || desc;
  if (desc.toLowerCase().includes('waste management')) return t('cat_env_awareness_desc') || desc;
  if (desc.toLowerCase().includes('emergency services')) return t('cat_public_safety_desc') || desc;
  return desc;
};

const fallbackQuizzes = [
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
  
  const [categories, setCategories] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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
      
      const dbQuizzes = (quizData || []).map(q => ({ ...q, options: q.options  }));
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

      // Fetch user progress if logged in or guest
      const userOrGuestId = user ? user.id : 'guest';
      let dbProgress = [];
      if (user) {
        try {
          const { data: progressData } = await supabase
            .from('user_quiz_progress')
            .select('quiz_id, is_correct')
            .eq('user_id', user.id);
          dbProgress = progressData || [];
        } catch (e) {
          console.warn('Error fetching DB progress:', e);
        }
      }

      const localKey = `local_user_quiz_progress_${userOrGuestId}`;
      const localProgressStr = localStorage.getItem(localKey);
      const localProgress = localProgressStr ? JSON.parse(localProgressStr) : [];

      const combinedProgress = [...dbProgress];
      localProgress.forEach((lp) => {
        if (!combinedProgress.some(p => p.quiz_id === lp.quiz_id)) {
          combinedProgress.push(lp);
        }
      });

      setUserProgress(combinedProgress);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [user, fetchData]);

  const getCategoryQuizzes = (categoryId) => {
    return quizzes.filter(q => q.category_id === categoryId);
  };

  const getCategoryProgress = (categoryId) => {
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

  const handleStartQuiz = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = async (answerIndex) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    const currentQuiz = getCategoryQuizzes(selectedCategory)[currentQuizIndex];
    const isCorrect = answerIndex === currentQuiz.correct_answer;

    const userOrGuestId = user ? user.id : 'guest';
    const alreadyAnswered = userProgress.some(p => p.quiz_id === currentQuiz.id);
    
    if (!alreadyAnswered) {
      const newProgressItem = { quiz_id: currentQuiz.id, is_correct: isCorrect };

      // 1. Save to localStorage for instant local persistence
      const localKey = `local_user_quiz_progress_${userOrGuestId}`;
      try {
        const localProgressStr = localStorage.getItem(localKey);
        const localProgress = localProgressStr ? JSON.parse(localProgressStr) : [];
        if (!localProgress.some(p => p.quiz_id === currentQuiz.id)) {
          localProgress.push(newProgressItem);
          localStorage.setItem(localKey, JSON.stringify(localProgress));
        }
      } catch (storageErr) {
        console.warn('LocalStorage write failed:', storageErr);
      }

      // 2. Save to Supabase if authenticated and is a database quiz
      if (user) {
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
      }

      setUserProgress(prev => [...prev, newProgressItem]);
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
    const categoryQuizzes = getCategoryQuizzes(selectedCategory);
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
      _jsxDEV(Layout, { children: 
        _jsxDEV('div', { className: "min-h-[60vh] flex items-center justify-center"   , children: 
          _jsxDEV(Loader2, { className: "h-8 w-8 animate-spin text-primary"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 410}, this )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 409}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 408}, this)
    );
  }

  // Quiz Mode
  if (selectedCategory) {
    const categoryQuizzes = getCategoryQuizzes(selectedCategory);
    const currentQuiz = categoryQuizzes[currentQuizIndex];
    const category = categories.find(c => c.id === selectedCategory);

    if (!currentQuiz) {
      return (
        _jsxDEV(Layout, { children: 
          _jsxDEV('div', { className: "py-12 text-center" , children: [
            _jsxDEV('p', { children: "No quizzes available in this category."     }, void 0, false, {fileName: _jsxFileName, lineNumber: 426}, this)
            , _jsxDEV(Button, { onClick: () => setSelectedCategory(null), className: "mt-4", children: "Go Back"

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 427}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 425}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 424}, this)
      );
    }

    return (
      _jsxDEV(Layout, { children: 
        _jsxDEV('div', { className: "py-8 lg:py-12" , children: 
          _jsxDEV('div', { className: "container mx-auto px-4 max-w-2xl"   , children: [
            /* Progress */
            _jsxDEV('div', { className: "mb-6", children: [
              _jsxDEV('div', { className: "flex items-center justify-between mb-2"   , children: [
                _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: category ? translateCategoryName(category.name, t) : ''}, void 0, false, {fileName: _jsxFileName, lineNumber: 442}, this)
                , _jsxDEV('p', { className: "text-sm font-medium" , children: [
                  t('ed_question'), " " , currentQuizIndex + 1, " of "  , categoryQuizzes.length
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 443}, this)
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 441}, this)
              , _jsxDEV(Progress, { value: ((currentQuizIndex + 1) / categoryQuizzes.length) * 100,}, void 0, false, {fileName: _jsxFileName, lineNumber: 447}, this )
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 440}, this)

            /* Question Card */
            , _jsxDEV(Card, { className: "animate-fade-in", children: [
              _jsxDEV(CardHeader, { children: 
                _jsxDEV(CardTitle, { className: "text-xl leading-relaxed" , children: 
                  currentQuiz.question
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 453}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 452}, this)
              , _jsxDEV(CardContent, { className: "space-y-3", children: [
                currentQuiz.options.map((option, index) => {
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
                    _jsxDEV(Button, {

                      variant: "outline",
                      className: buttonClass,
                      onClick: () => handleAnswer(index),
                      disabled: showResult,
 children: [
                      _jsxDEV('span', { className: "w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 text-sm font-medium"         , children: 
                        String.fromCharCode(65 + index)
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 480}, this)
                      , _jsxDEV('span', { className: "flex-1", children: option}, void 0, false, {fileName: _jsxFileName, lineNumber: 483}, this)
                      , showResult && isCorrect && (
                        _jsxDEV(CheckCircle, { className: "h-5 w-5 text-accent ml-2"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 485}, this )
                      )
                      , showResult && isSelected && !isCorrect && (
                        _jsxDEV(XCircle, { className: "h-5 w-5 text-destructive ml-2"   ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 488}, this )
                      )
                    ]}, index, true, {fileName: _jsxFileName, lineNumber: 473}, this)
                  );
                })

                , showResult && (
                  _jsxDEV('div', { className: "pt-4 flex justify-between items-center"   , children: [
                    _jsxDEV(Badge, { variant: "secondary", className: "gap-1", children: [
                      _jsxDEV(Award, { className: "h-3 w-3" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 497}, this )
                      , currentQuiz.points, " " , t('ed_quiz_points')
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 496}, this)
                    , _jsxDEV(Button, { onClick: handleNext, className: "bg-secondary hover:bg-secondary/90 gap-2"  , children: [
                      currentQuizIndex < categoryQuizzes.length - 1 ? t('ed_next') : t('ed_finish')
                      , _jsxDEV(ChevronRight, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 502}, this )
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 500}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 495}, this)
                )
              ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 457}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 451}, this)

            , _jsxDEV(Button, { 
              variant: "ghost", 
              onClick: () => setSelectedCategory(null),
              className: "mt-4",
 children: "← Exit Quiz"

            }, void 0, false, {fileName: _jsxFileName, lineNumber: 509}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 438}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 437}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 436}, this)
    );
  }

  // Category Selection
  return (
    _jsxDEV(Layout, { children: 
      _jsxDEV('div', { className: "py-8 lg:py-12" , children: 
        _jsxDEV('div', { className: "container mx-auto px-4"  , children: [
          /* Header */
          _jsxDEV('div', { className: "max-w-3xl mx-auto text-center mb-12"   , children: [
            _jsxDEV('div', { className: "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary mb-4"          , children: [
              _jsxDEV(BookOpen, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 530}, this )
              , _jsxDEV('span', { className: "text-sm font-medium" , children: "Learn & Earn"  }, void 0, false, {fileName: _jsxFileName, lineNumber: 531}, this)
            ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 529}, this)
            , _jsxDEV('h1', { className: "font-display text-3xl md:text-4xl font-bold text-foreground mb-4"     , children: 
              t('ed_title')
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 533}, this)
            , _jsxDEV('p', { className: "text-muted-foreground text-lg" , children: 
              t('ed_desc')
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 536}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 528}, this)

          /* Stats for logged in users */
          , user && userProgress.length > 0 && (
            _jsxDEV('div', { className: "max-w-3xl mx-auto mb-8"  , children: 
              _jsxDEV(Card, { className: "bg-primary/5 border-primary/20" , children: 
                _jsxDEV(CardContent, { className: "py-6", children: 
                  _jsxDEV('div', { className: "flex items-center justify-between"  , children: [
                    _jsxDEV('div', { className: "flex items-center gap-4"  , children: [
                      _jsxDEV('div', { className: "w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center"      , children: 
                        _jsxDEV(Brain, { className: "h-6 w-6 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 549}, this )
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 548}, this)
                      , _jsxDEV('div', { children: [
                        _jsxDEV('p', { className: "font-display font-semibold text-lg"  , children: t('welcome')}, void 0, false, {fileName: _jsxFileName, lineNumber: 552}, this)
                        , _jsxDEV('p', { className: "text-sm text-muted-foreground" , children: [
                          userProgress.length, " completed • "   , userProgress.filter(p => p.is_correct).length, " correct"
                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 553}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 551}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 547}, this)
                    , _jsxDEV(Link, { to: "/leaderboard", children: 
                      _jsxDEV(Button, { variant: "outline", className: "gap-2", children: [
                        _jsxDEV(Award, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 560}, this )
                        , t('nav_leaderboard')
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 559}, this)
                    }, void 0, false, {fileName: _jsxFileName, lineNumber: 558}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 546}, this)
                }, void 0, false, {fileName: _jsxFileName, lineNumber: 545}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 544}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 543}, this)
          )

          /* Categories */
          , _jsxDEV('div', { className: "max-w-4xl mx-auto grid md:grid-cols-2 gap-6"    , children: 
            categories.map((category, index) => {
              const Icon = iconMap[category.icon] || BookOpen;
              const progress = getCategoryProgress(category.id);
              const categoryQuizzes = getCategoryQuizzes(category.id);
              
              return (
                _jsxDEV(Card, {

                  className: "hover:shadow-lg transition-shadow animate-fade-in-up"  ,
                  style: { animationDelay: `${index * 0.1}s` },
 children: [
                  _jsxDEV(CardHeader, { children: 
                    _jsxDEV('div', { className: "flex items-start gap-4"  , children: [
                      _jsxDEV('div', { className: "w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0"       , children: 
                        _jsxDEV(Icon, { className: "h-7 w-7 text-secondary"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 586}, this )
                      }, void 0, false, {fileName: _jsxFileName, lineNumber: 585}, this)
                      , _jsxDEV('div', { className: "flex-1", children: [
                        _jsxDEV(CardTitle, { className: "text-lg mb-1" , children: translateCategoryName(category.name, t)}, void 0, false, {fileName: _jsxFileName, lineNumber: 589}, this)
                        , _jsxDEV(CardDescription, { children: translateCategoryDesc(category.description, t)}, void 0, false, {fileName: _jsxFileName, lineNumber: 590}, this)
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 588}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 584}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 583}, this)
                  , _jsxDEV(CardContent, { children: [
                    user && progress.total > 0 && (
                      _jsxDEV('div', { className: "mb-4", children: [
                        _jsxDEV('div', { className: "flex justify-between text-sm mb-2"   , children: [
                          _jsxDEV('span', { className: "text-muted-foreground", children: "Progress"}, void 0, false, {fileName: _jsxFileName, lineNumber: 598}, this)
                          , _jsxDEV('span', { className: "font-medium", children: [progress.completed, "/", progress.total, " completed" ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 599}, this)
                        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 597}, this)
                        , _jsxDEV(Progress, { value: (progress.completed / progress.total) * 100,}, void 0, false, {fileName: _jsxFileName, lineNumber: 601}, this )
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 596}, this)
                    )
                    , _jsxDEV('div', { className: "flex items-center justify-between"  , children: [
                      _jsxDEV(Badge, { variant: "secondary", children: [
                        categoryQuizzes.length, " Questions"
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 605}, this)
                      , _jsxDEV(Button, { 
                        onClick: () => handleStartQuiz(category.id),
                        className: "bg-secondary hover:bg-secondary/90 gap-2"  ,
                        disabled: categoryQuizzes.length === 0,
 children: [
                        progress.completed === progress.total && progress.total > 0 ? 'Retake Quiz' : t('ed_start')
                        , _jsxDEV(ChevronRight, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 614}, this )
                      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 608}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 604}, this)
                  ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 594}, this)
                ]}, category.id, true, {fileName: _jsxFileName, lineNumber: 578}, this)
              );
            })
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 571}, this)

          , !user && (
            _jsxDEV('div', { className: "max-w-md mx-auto text-center mt-12"   , children: 
              _jsxDEV(Card, { children: 
                _jsxDEV(CardContent, { className: "py-8", children: [
                  _jsxDEV(Award, { className: "h-12 w-12 text-secondary mx-auto mb-4"    ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 627}, this )
                  , _jsxDEV('p', { className: "text-muted-foreground mb-4" , children: "Sign in to track your progress, earn points, and compete on the leaderboard!"

                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 628}, this)
                  , _jsxDEV(Button, { asChild: true, className: "bg-secondary hover:bg-secondary/90" , children: 
                    _jsxDEV(Link, { to: "/auth", children: t('btn_signin')}, void 0, false, {fileName: _jsxFileName, lineNumber: 632}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 631}, this)
                ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 626}, this)
              }, void 0, false, {fileName: _jsxFileName, lineNumber: 625}, this)
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 624}, this)
          )
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 526}, this)
      }, void 0, false, {fileName: _jsxFileName, lineNumber: 525}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 524}, this)
  );
}
