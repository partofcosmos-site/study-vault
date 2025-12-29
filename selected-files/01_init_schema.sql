-- StudyVault Database Schema

-- 1. PROBLEMS TABLE
CREATE TABLE IF NOT EXISTS problems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_number TEXT UNIQUE NOT NULL, -- e.g., "JEE_2023_P1_Q15"
  exam_type TEXT NOT NULL, -- "JEE_Main", "JEE_Advanced", "NEET", "IPHO", etc.
  exam_year INTEGER, -- 2023, 2022, etc.
  subject TEXT NOT NULL, -- "Physics", "Mathematics", "Chemistry"
  chapter TEXT NOT NULL, -- "Mechanics", "Thermodynamics", "Electromagnetism", etc.
  topic TEXT NOT NULL, -- "Circular Motion", "Capacitors", etc.
  difficulty_level INTEGER DEFAULT 1, -- 1-5 (1=easy, 5=very hard)
  problem_statement TEXT NOT NULL, -- LaTeX or markdown
  problem_image_url TEXT, -- Image of original problem
  -- answer_id UUID, -- Circular dependency if FK to solutions immediately. Can add later or verify in app logic. 
  -- Removing direct FK circular dependency for now or treat as loose reference.
  -- logical reference to solutions(id)
  answer_id UUID, 
  correct_answer TEXT, -- For MCQs: A/B/C/D; For numerical: value range
  answer_type TEXT, -- "MCQ", "Numerical", "Integer", "Multiple_Correct"
  prerequisite_concepts TEXT[], -- Array of concept IDs needed before this
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id), -- Assuming Supabase Auth
  verified BOOLEAN DEFAULT FALSE, -- Moderator approval
  view_count INTEGER DEFAULT 0,
  attempt_count INTEGER DEFAULT 0,
  success_rate FLOAT DEFAULT 0, -- % of users who got it right
  is_premium BOOLEAN DEFAULT FALSE,
  tags TEXT[] -- Array of tags for searching
);

-- 2. SOLUTIONS TABLE (Multiple solutions per problem)
CREATE TABLE IF NOT EXISTS solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  solution_number INTEGER, -- 1st solution, 2nd approach, etc.
  approach_name TEXT, -- "Standard Method", "Shortcut", "Conceptual", etc.
  solution_text TEXT NOT NULL, -- Detailed step-by-step (LaTeX)
  solution_images TEXT[], -- Array of image URLs (diagrams, working)
  time_to_solve INTEGER, -- Estimated minutes
  difficulty_to_understand INTEGER, -- 1-5
  upvotes INTEGER DEFAULT 0,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add FK back to problems if needed, specifically for the "best" or "official" answer
ALTER TABLE problems ADD CONSTRAINT fk_answer FOREIGN KEY (answer_id) REFERENCES solutions(id);

-- 3. CONCEPTS TABLE (Knowledge hierarchy)
CREATE TABLE IF NOT EXISTS concepts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL, -- "Newton's Laws", "Circular Motion", etc.
  subject TEXT NOT NULL, -- Physics, Math, Chemistry
  chapter TEXT NOT NULL,
  description TEXT, -- What is this concept
  formula TEXT[], -- Array of key formulas (LaTeX)
  prerequisites UUID[], -- Array of concept IDs (what to learn first)
  resources TEXT[], -- Links to videos, articles
  example_problems UUID[], -- Problem IDs that use this concept
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. USERS TABLE (Note: Supabase uses auth.users, but we might want a public profile table)
-- We will create a 'profiles' table that extends auth.users
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  exam_target TEXT, -- "JEE_Main", "JEE_Advanced", "NEET", etc.
  grade INTEGER, -- 11, 12
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_premium BOOLEAN DEFAULT FALSE,
  premium_until TIMESTAMP WITH TIME ZONE,
  contribution_count INTEGER DEFAULT 0, -- Solutions contributed
  reputation_score INTEGER DEFAULT 0 -- Upvotes on solutions
);

-- 4. USER PROGRESS TABLE (Spaced repetition data)
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'new', -- "new", "learning", "review", "mastered"
  attempts INTEGER DEFAULT 0,
  repetitions INTEGER DEFAULT 0, -- Continuous successful repetitions for SR algo
  correct_attempts INTEGER DEFAULT 0,
  incorrect_attempts INTEGER DEFAULT 0,
  last_attempted TIMESTAMP WITH TIME ZONE,
  next_review_date TIMESTAMP WITH TIME ZONE, -- When SR algo says to review next
  ease_factor FLOAT DEFAULT 2.5, -- SuperMemo algorithm factor
  interval INTEGER DEFAULT 1, -- Days until next review (1, 3, 7, 14, 30...)
  difficulty_rating INTEGER, -- 0-5 after solving (user feedback)
  time_spent INTEGER DEFAULT 0, -- Total seconds spent
  solution_id_used UUID REFERENCES solutions(id), -- Which solution they viewed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, problem_id)
);

-- 6. SPACED REPETITION QUEUE TABLE
CREATE TABLE IF NOT EXISTS sr_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  problem_id UUID NOT NULL REFERENCES problems(id) ON DELETE CASCADE,
  review_date DATE NOT NULL, -- When to show this problem
  queue_position INTEGER, -- Order in daily queue
  shown BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. STATISTICS TABLE (For analytics dashboard)
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  total_problems_attempted INTEGER DEFAULT 0,
  total_problems_mastered INTEGER DEFAULT 0,
  total_time_spent INTEGER DEFAULT 0, -- seconds
  daily_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  accuracy_percentage FLOAT DEFAULT 0,
  last_active TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. PREMIUM PURCHASES TABLE
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  product_name TEXT, -- "JEE_Physics_Complete", "NEET_Chemistry_Complete", etc.
  price FLOAT,
  payment_method TEXT, -- "Stripe", "Razorpay", etc.
  transaction_id TEXT UNIQUE,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_problems_exam_type ON problems(exam_type);
CREATE INDEX IF NOT EXISTS idx_problems_chapter ON problems(chapter);
CREATE INDEX IF NOT EXISTS idx_problems_verified ON problems(verified);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_review_date ON user_progress(next_review_date);
CREATE INDEX IF NOT EXISTS idx_sr_queue_user_date ON sr_queue(user_id, review_date);
