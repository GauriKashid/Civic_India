-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create enum for report status
CREATE TYPE public.report_status AS ENUM ('submitted', 'in_review', 'assigned', 'in_progress', 'resolved', 'rejected');

-- Create enum for report category
CREATE TYPE public.report_category AS ENUM ('garbage', 'pothole', 'streetlight', 'traffic', 'vandalism', 'water_supply', 'drainage', 'other');

-- Create enum for severity
CREATE TYPE public.report_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  phone TEXT,
  city TEXT,
  state TEXT,
  avatar_url TEXT,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Create reports table
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_number TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  category report_category NOT NULL,
  severity report_severity DEFAULT 'medium',
  status report_status DEFAULT 'submitted',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  address TEXT,
  city TEXT,
  state TEXT,
  pincode TEXT,
  image_urls TEXT[],
  assigned_to TEXT,
  authority_remarks TEXT,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create report_comments table
CREATE TABLE public.report_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  comment TEXT NOT NULL,
  is_authority BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create badges table
CREATE TABLE public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  points_required INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_badges table
CREATE TABLE public.user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, badge_id)
);

-- Create quiz_categories table
CREATE TABLE public.quiz_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create quizzes table
CREATE TABLE public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.quiz_categories(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  points INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create user_quiz_progress table
CREATE TABLE public.user_quiz_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE NOT NULL,
  is_correct BOOLEAN NOT NULL,
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  UNIQUE (user_id, quiz_id)
);

-- Create contact_messages table
CREATE TABLE public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_quiz_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to generate report number
CREATE OR REPLACE FUNCTION public.generate_report_number()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.report_number := 'CIV' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 100000)::TEXT, 5, '0');
  RETURN NEW;
END;
$$;

-- Trigger for report number
CREATE TRIGGER set_report_number
  BEFORE INSERT ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_report_number();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for reports
CREATE POLICY "Anyone can view reports"
  ON public.reports FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reports"
  ON public.reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reports"
  ON public.reports FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all reports"
  ON public.reports FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for report_comments
CREATE POLICY "Anyone can view comments"
  ON public.report_comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can add comments"
  ON public.report_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage comments"
  ON public.report_comments FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for badges
CREATE POLICY "Anyone can view badges"
  ON public.badges FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage badges"
  ON public.badges FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_badges
CREATE POLICY "Users can view their own badges"
  ON public.user_badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view user badges for leaderboard"
  ON public.user_badges FOR SELECT
  USING (true);

CREATE POLICY "System can award badges"
  ON public.user_badges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for quiz_categories
CREATE POLICY "Anyone can view quiz categories"
  ON public.quiz_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage quiz categories"
  ON public.quiz_categories FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for quizzes
CREATE POLICY "Anyone can view quizzes"
  ON public.quizzes FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage quizzes"
  ON public.quizzes FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_quiz_progress
CREATE POLICY "Users can view their own progress"
  ON public.user_quiz_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save their progress"
  ON public.user_quiz_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for contact_messages
CREATE POLICY "Anyone can submit contact messages"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view contact messages"
  ON public.contact_messages FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage contact messages"
  ON public.contact_messages FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for report images
INSERT INTO storage.buckets (id, name, public) VALUES ('report-images', 'report-images', true);

-- Storage policies
CREATE POLICY "Anyone can view report images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'report-images');

CREATE POLICY "Authenticated users can upload report images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'report-images');

-- Insert default badges
INSERT INTO public.badges (name, description, icon, points_required) VALUES
  ('First Report', 'Submit your first civic issue report', 'award', 0),
  ('Active Citizen', 'Submit 5 civic issue reports', 'star', 50),
  ('Community Champion', 'Submit 10 civic issue reports', 'trophy', 100),
  ('Quiz Master', 'Complete 5 quizzes', 'brain', 50),
  ('Civic Scholar', 'Complete all education modules', 'graduation-cap', 200);

-- Insert quiz categories
INSERT INTO public.quiz_categories (name, description, icon) VALUES
  ('Traffic Rules', 'Test your knowledge of Indian traffic rules and road safety', 'car'),
  ('Civic Responsibilities', 'Learn about your duties as a responsible citizen', 'users'),
  ('Environmental Awareness', 'Understand waste management and environmental protection', 'leaf'),
  ('Public Safety', 'Know about emergency services and safety protocols', 'shield');

-- Insert sample quizzes
INSERT INTO public.quizzes (category_id, question, options, correct_answer, points) 
SELECT 
  c.id,
  'What is the minimum age for obtaining a driving license for a motorcycle in India?',
  '["16 years", "18 years", "21 years", "14 years"]'::jsonb,
  1,
  10
FROM public.quiz_categories c WHERE c.name = 'Traffic Rules';

INSERT INTO public.quizzes (category_id, question, options, correct_answer, points) 
SELECT 
  c.id,
  'What color is the stop signal on a traffic light?',
  '["Green", "Yellow", "Red", "Blue"]'::jsonb,
  2,
  10
FROM public.quiz_categories c WHERE c.name = 'Traffic Rules';

INSERT INTO public.quizzes (category_id, question, options, correct_answer, points) 
SELECT 
  c.id,
  'Which of the following is a civic duty of every Indian citizen?',
  '["Pay taxes", "Vote in elections", "Follow laws", "All of the above"]'::jsonb,
  3,
  10
FROM public.quiz_categories c WHERE c.name = 'Civic Responsibilities';

INSERT INTO public.quizzes (category_id, question, options, correct_answer, points) 
SELECT 
  c.id,
  'What should you do with wet and dry waste at home?',
  '["Mix them together", "Burn them", "Segregate them separately", "Throw anywhere"]'::jsonb,
  2,
  10
FROM public.quiz_categories c WHERE c.name = 'Environmental Awareness';

INSERT INTO public.quizzes (category_id, question, options, correct_answer, points) 
SELECT 
  c.id,
  'What is the emergency number for police in India?',
  '["100", "101", "102", "108"]'::jsonb,
  0,
  10
FROM public.quiz_categories c WHERE c.name = 'Public Safety';