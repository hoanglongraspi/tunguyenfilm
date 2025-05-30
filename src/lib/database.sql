-- ================================================================
-- TN FILMS CMS DATABASE SCHEMA
-- Simplified schema for portfolio management
-- ================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ================================================================
-- PORTFOLIO TABLE
-- Core table for managing personal projects, commercial work, and events
-- ================================================================
CREATE TABLE IF NOT EXISTS portfolio (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(20) NOT NULL CHECK (category IN ('personal', 'commercial', 'events')),
    image_url TEXT NOT NULL,
    video_url TEXT,
    tags TEXT[] DEFAULT '{}',
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================================
-- MEDIA TABLE
-- For managing uploaded images and videos
-- ================================================================
CREATE TABLE IF NOT EXISTS media (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    type VARCHAR(10) NOT NULL CHECK (type IN ('image', 'video')),
    size BIGINT NOT NULL,
    portfolio_id UUID REFERENCES portfolio(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================================
-- PAGE CONTENT TABLE
-- For basic page content management
-- ================================================================
CREATE TABLE IF NOT EXISTS page_content (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    page_name VARCHAR(100) NOT NULL,
    section VARCHAR(100) NOT NULL,
    title VARCHAR(255),
    content TEXT NOT NULL,
    type VARCHAR(10) DEFAULT 'text' CHECK (type IN ('text', 'html', 'json')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(page_name, section)
);

-- ================================================================
-- TRIGGERS FOR AUTOMATIC TIMESTAMP UPDATES
-- ================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Portfolio updated_at trigger
DROP TRIGGER IF EXISTS update_portfolio_updated_at ON portfolio;
CREATE TRIGGER update_portfolio_updated_at
    BEFORE UPDATE ON portfolio
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Page content updated_at trigger
DROP TRIGGER IF EXISTS update_page_content_updated_at ON page_content;
CREATE TRIGGER update_page_content_updated_at
    BEFORE UPDATE ON page_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ================================================================

-- Enable RLS on all tables
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Allow all operations for now (in production, you'd want proper auth)
CREATE POLICY "Allow all access to portfolio" ON portfolio FOR ALL USING (true);
CREATE POLICY "Allow all access to media" ON media FOR ALL USING (true);
CREATE POLICY "Allow all access to page_content" ON page_content FOR ALL USING (true);

-- ================================================================
-- INDEXES FOR PERFORMANCE
-- ================================================================
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON portfolio(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio(featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_date ON portfolio(date DESC);
CREATE INDEX IF NOT EXISTS idx_media_type ON media(type);
CREATE INDEX IF NOT EXISTS idx_page_content_page ON page_content(page_name);

-- ================================================================
-- SAMPLE DATA FOR TESTING
-- ================================================================

-- Sample portfolio items
INSERT INTO portfolio (title, description, category, image_url, tags, featured, status, date) VALUES
('Wedding at Sunset Beach', 'Beautiful wedding ceremony captured during golden hour with stunning ocean views.', 'events', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800', ARRAY['wedding', 'beach', 'sunset'], true, 'published', '2024-01-15'),
('Corporate Brand Video', 'Professional corporate video showcasing company culture and values.', 'commercial', 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800', ARRAY['corporate', 'branding', 'professional'], true, 'published', '2024-01-10'),
('Personal Art Project', 'Experimental photography exploring urban landscapes and human connection.', 'personal', 'https://images.unsplash.com/photo-1500287035761-cf160cbc4af8?w=800', ARRAY['art', 'urban', 'experimental'], false, 'published', '2024-01-05'),
('Tech Conference Coverage', 'Complete event coverage including keynotes, workshops, and networking sessions.', 'events', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', ARRAY['conference', 'technology', 'corporate'], true, 'published', '2023-12-20'),
('Product Launch Campaign', 'Multi-day campaign covering product launch with interviews and behind-the-scenes.', 'commercial', 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?w=800', ARRAY['product', 'launch', 'campaign'], false, 'published', '2023-12-15'),
('Street Photography Series', 'Documentary series capturing everyday life in the city.', 'personal', 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800', ARRAY['street', 'documentary', 'city'], false, 'draft', '2023-12-01');

-- Sample page content
INSERT INTO page_content (page_name, section, title, content, type) VALUES
('home', 'hero', 'Welcome to TN Films', 'Capturing life''s most precious moments through the lens of creativity and passion.', 'text'),
('home', 'about', 'About Our Work', 'We specialize in wedding photography, corporate videography, and personal art projects.', 'text'),
('about', 'story', 'Our Story', 'Founded with a passion for visual storytelling, TN Films has been creating memorable content for over 5 years.', 'text'),
('contact', 'info', 'Get In Touch', 'Ready to work together? Contact us to discuss your project and bring your vision to life.', 'text');

-- ================================================================
-- STORAGE BUCKET SETUP INSTRUCTIONS
-- ================================================================
-- Run this in Supabase Storage section:
-- 1. Create a bucket named 'media'
-- 2. Make it public
-- 3. Set file size limit to 50MB
-- 4. Allow image and video uploads

-- ================================================================
-- SETUP COMPLETE
-- ================================================================
-- Your TN Films CMS database is now ready!
-- 
-- Next steps:
-- 1. Add your Supabase credentials to .env.local
-- 2. Create the 'media' storage bucket
-- 3. Start managing your portfolio through the CMS
-- ================================================================ 