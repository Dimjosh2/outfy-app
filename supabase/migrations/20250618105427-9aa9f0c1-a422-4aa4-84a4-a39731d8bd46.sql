
-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  body_type TEXT,
  color_season TEXT,
  style_goals TEXT,
  preferred_colors TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create wardrobe items table
CREATE TABLE public.wardrobe_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  color TEXT,
  season TEXT,
  image_url TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create outfits table
CREATE TABLE public.outfits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  occasion TEXT,
  items UUID[] NOT NULL,
  image_url TEXT,
  is_favorite BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create outfit plans table (for calendar planning)
CREATE TABLE public.outfit_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  outfit_id UUID REFERENCES public.outfits(id) ON DELETE CASCADE,
  planned_date DATE NOT NULL,
  weather_temp INTEGER,
  weather_condition TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create style feed saves table
CREATE TABLE public.saved_looks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  look_data JSONB NOT NULL,
  saved_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wardrobe_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outfits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.outfit_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_looks ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Create RLS policies for wardrobe_items
CREATE POLICY "Users can view their own wardrobe items" 
  ON public.wardrobe_items 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wardrobe items" 
  ON public.wardrobe_items 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wardrobe items" 
  ON public.wardrobe_items 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wardrobe items" 
  ON public.wardrobe_items 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for outfits
CREATE POLICY "Users can view their own outfits" 
  ON public.outfits 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own outfits" 
  ON public.outfits 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own outfits" 
  ON public.outfits 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own outfits" 
  ON public.outfits 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for outfit_plans
CREATE POLICY "Users can view their own outfit plans" 
  ON public.outfit_plans 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own outfit plans" 
  ON public.outfit_plans 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own outfit plans" 
  ON public.outfit_plans 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own outfit plans" 
  ON public.outfit_plans 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create RLS policies for saved_looks
CREATE POLICY "Users can view their own saved looks" 
  ON public.saved_looks 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved looks" 
  ON public.saved_looks 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved looks" 
  ON public.saved_looks 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create storage bucket for wardrobe images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('wardrobe-images', 'wardrobe-images', true);

-- Create storage policy for wardrobe images
CREATE POLICY "Users can upload their own wardrobe images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'wardrobe-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own wardrobe images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'wardrobe-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own wardrobe images"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'wardrobe-images' AND auth.uid()::text = (storage.foldername(name))[1]);
