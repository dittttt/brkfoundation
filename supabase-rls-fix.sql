-- Run this in your Supabase SQL Editor to fix Row-Level Security (RLS) policies

-- ==============================================
-- 1. POLICIES FOR 'news' TABLE
-- ==============================================
-- Ensure RLS is enabled
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

-- Allow public viewing of news posts
CREATE POLICY "Allow public read access on news" 
ON public.news FOR SELECT 
USING (true);

-- Allow authenticated users (Admins) to Insert, Update, and Delete posts
CREATE POLICY "Allow authenticated insert on news" 
ON public.news FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated update on news" 
ON public.news FOR UPDATE 
TO authenticated 
USING (true) WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on news" 
ON public.news FOR DELETE 
TO authenticated 
USING (true);


-- ==============================================
-- 2. POLICIES FOR STORAGE ('images' bucket)
-- ==============================================

-- Allow public read access to images
CREATE POLICY "Give public access to images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'images');

-- Allow authenticated users to upload new images
CREATE POLICY "Give authenticated users upload access to images" 
ON storage.objects FOR INSERT 
TO authenticated 
WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to update/delete their images (optional but helpful)
CREATE POLICY "Give authenticated users update access" 
ON storage.objects FOR UPDATE 
TO authenticated 
USING (bucket_id = 'images');

CREATE POLICY "Give authenticated users delete access" 
ON storage.objects FOR DELETE 
TO authenticated 
USING (bucket_id = 'images');
