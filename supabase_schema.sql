-- Database Schema for ORIXA E-commerce

-- 1. Create Profiles table (linked to Auth)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Products table
CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(12, 2) NOT NULL,
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  details TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create Orders table
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  total_amount NUMERIC(12, 2) NOT NULL,
  status TEXT DEFAULT 'processing' CHECK (status IN ('processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Create Order Items table
CREATE TABLE public.order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id),
  quantity INTEGER NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  size TEXT
);

-- Enable Realtime for relevant tables
ALTER PUBLICATION supabase_realtime ADD TABLE products;
ALTER PUBLICATION supabase_realtime ADD TABLE orders;

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Product policies: Anyone can read, only admins can modify
CREATE POLICY "Products are viewable by everyone" ON public.products FOR SELECT USING (true);
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Profiles policies: Users can read/edit their own, admins can read all
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Seed Initial Data
INSERT INTO public.products (name, price, category, stock, description, details, sizes)
VALUES 
('ORIXA Signature Blazer', 4999.00, 'Apparel', 15, 'A premium tailored blazer for boys, crafted from high-quality wool blend.', ARRAY['Wool Blend', 'Tailored Fit', 'Satin Lining'], ARRAY['6Y', '8Y', '10Y', '12Y']),
('Cotton Crew Neck', 1299.00, 'Apparel', 50, 'Daily essential tee in premium organic cotton.', ARRAY['100% Organic Cotton', 'Soft feel', 'Durable stitch'], ARRAY['6Y', '8Y', '10Y', '12Y']),
('Slim Fit Chinos', 2499.00, 'Apparel', 30, 'Classic slim-fit chinos for a sophisticated young look.', ARRAY['Cotton Twill', 'Adjustable waist', 'Slim cut'], ARRAY['6Y', '8Y', '10Y', '12Y']),
('Leather School Bag', 3499.00, 'Accessories', 10, 'Handcrafted leather bag for the elite student.', ARRAY['Genuine Leather', 'Polished brass', 'Ergonomic'], ARRAY['OS']);
