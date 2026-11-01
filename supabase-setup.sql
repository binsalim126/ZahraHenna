-- ============================================================================
-- ZAHRA HENNA — PRODUCTION SUPABASE DATABASE SETUP & SCHEMA
-- ============================================================================
-- Project: Zahra Henna (Pure Natural Henna)
-- Instance: https://wqgubwlsmtvwnjeuoqtz.supabase.co
--
-- Instructions:
-- 1. Open your Supabase SQL Editor:
--    https://supabase.com/dashboard/project/wqgubwlsmtvwnjeuoqtz/sql/new
-- 2. Paste this entire SQL script and click "RUN" (Ctrl+Enter / Cmd+Enter).
-- 3. All 4 tables are created with public access & initial catalog seeded.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABLE: public.categories
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  image TEXT,
  product_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABLE: public.products
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_desc TEXT,
  description TEXT,
  ingredients TEXT,
  benefits TEXT,
  how_to_use TEXT,
  category_id TEXT,
  category_name TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_visible BOOLEAN DEFAULT true,
  variants JSONB DEFAULT '[]'::jsonb,
  images JSONB DEFAULT '[]'::jsonb,
  rating NUMERIC DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_visible ON public.products(is_visible);
CREATE INDEX IF NOT EXISTS idx_products_created ON public.products(created_at DESC);

-- 3. TABLE: public.orders
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  total_amount NUMERIC NOT NULL DEFAULT 0,
  subtotal NUMERIC DEFAULT 0,
  shipping_cost NUMERIC DEFAULT 0,
  discount_amount NUMERIC DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'CONFIRMED',
  payment_method TEXT DEFAULT 'CASH_ON_DELIVERY',
  payment_status TEXT DEFAULT 'PENDING',
  address JSONB DEFAULT '{}'::jsonb,
  items JSONB DEFAULT '[]'::jsonb,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON public.orders(created_at DESC);

-- 4. TABLE: public.enquiries
CREATE TABLE IF NOT EXISTS public.enquiries (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enquiries_read ON public.enquiries(is_read);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON public.enquiries(created_at DESC);

-- 5. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- 6. PUBLIC PERMISSIVE POLICIES (Read & Write for Anon Key)
DROP POLICY IF EXISTS "Allow public read and write on products" ON public.products;
CREATE POLICY "Allow public read and write on products"
ON public.products FOR ALL
TO public, anon, authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write on categories" ON public.categories;
CREATE POLICY "Allow public read and write on categories"
ON public.categories FOR ALL
TO public, anon, authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write on orders" ON public.orders;
CREATE POLICY "Allow public read and write on orders"
ON public.orders FOR ALL
TO public, anon, authenticated
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read and write on enquiries" ON public.enquiries;
CREATE POLICY "Allow public read and write on enquiries"
ON public.enquiries FOR ALL
TO public, anon, authenticated
USING (true) WITH CHECK (true);

-- 7. SEED CATEGORIES
INSERT INTO public.categories (id, name, slug, description, image, product_count)
VALUES
  ('cat-cones-pack', 'Pack of 12', 'pack-of-12', 'Individually sealed in clear wrap with caramel-brown paste and fine tip.', '/assets/images/henna-cones-in-hand.png', 2),
  ('cat-single', 'Single Cone', 'single-cone', 'Freshly churned ready-to-use cone with razor-fine pin tip.', '/assets/images/henna-cones-in-hand.png', 1),
  ('cat-bulk', 'Bulk / Wholesale', 'bulk-wholesale', 'Wholesale boxes for professional mehndi artists and salons.', '/assets/images/henna-cones-in-hand.png', 1),
  ('cat-powder', 'Henna Powder', 'henna-powder', 'Triple-sieved pure henna and moringa leaf powder.', '/assets/images/moringa-leaf-powder-swirl.png', 2)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  product_count = EXCLUDED.product_count;

-- 8. SEED INITIAL PRODUCTS (Single-line strings with NO multiline breaks)
INSERT INTO public.products (
  id, title, slug, short_desc, description, ingredients, benefits, how_to_use,
  category_id, category_name, is_featured, is_visible, variants, images, rating, review_count
) VALUES
(
  'prod-1',
  'Natural Henna Cones (Pack of 12)',
  'natural-henna-cones-pack-of-12',
  'Individually sealed in clear plastic wrap, smooth caramel-brown paste, ultra-fine 0.38mm tip for precision bridal designs.',
  'Our signature ready-to-use natural henna cones are freshly rolled and hand-filled with pure Sojat henna leaf powder, moringa, and therapeutic eucalyptus oils. 100% natural, zero chemicals, zero PPD.',
  '100% Natural Lawsonia Inermis, Moringa Oleifera, Filtered Water, Unrefined Cane Sugar, Eucalyptus Oil, Cajeput Oil.',
  'Individually sealed in clear wrap for maximum freshness • Ultra-fine 0.38mm tip • Rich dark mahogany stain lasting 10-14 days • 100% chemical-free',
  '1. Peel wrap or snip tip. 2. Apply on clean skin. 3. Allow paste to dry 30-45 mins. 4. Keep on skin 6-8 hours. 5. Scrape off without water.',
  'cat-cones-pack',
  'Pack of 12',
  true,
  true,
  '[{"id":"var-1-pack12","sku":"ZH-CONE-PK12","name":"Pack of 12 Cones","price":499,"discountPrice":449,"stockQuantity":120,"weightInGrams":360},{"id":"var-1-pack24","sku":"ZH-CONE-PK24","name":"Pack of 24 Cones (Double Pack)","price":899,"discountPrice":799,"stockQuantity":65,"weightInGrams":720}]'::jsonb,
  '[{"id":"img-1","url":"/assets/images/henna-cones-in-hand.png","altText":"Zahra Henna cones held in hand individually wrapped","isPrimary":true,"order":1},{"id":"img-1-2","url":"/assets/images/bridal-henna-hands.jpg","altText":"Rich dark stain results on bridal hands","isPrimary":false,"order":2}]'::jsonb,
  4.98,
  240
),
(
  'prod-2',
  'Single Precision Henna Cone',
  'single-precision-henna-cone',
  'Freshly prepared ready-to-use cone individually sealed with needle-thin applicator tip.',
  'Perfect for casual occasions or trial sessions. Hand-filled with fresh caramel-brown henna paste, rich in moringa and cajeput oil.',
  'Fresh Sojat Henna Leaf Powder, Moringa Leaf Extract, Filtered Spring Water, Organic Sugar, Eucalyptus & Cajeput Essential Oils.',
  'Individually wrapped in clear sealed plastic • Zero preparation needed • 100% natural botanicals with no black dye',
  'Cut micro tip to desired thickness, apply on clean skin, let dry, and keep on for 6-8 hours. Avoid water for 24 hours.',
  'cat-single',
  'Single Cone',
  false,
  true,
  '[{"id":"var-2-single","sku":"ZH-CONE-SINGLE","name":"1 Precision Cone (30g)","price":55,"discountPrice":45,"stockQuantity":200,"weightInGrams":30}]'::jsonb,
  '[{"id":"img-2","url":"/assets/images/henna-cones-in-hand.png","altText":"Single precision henna cone","isPrimary":true,"order":1}]'::jsonb,
  4.9,
  88
),
(
  'prod-3',
  'Master Artist Wholesale Bundle (Box of 50)',
  'master-artist-wholesale-bundle-box-of-50',
  'Bulk pack of 50 individually wrapped cones for bridal henna artists and beauty salons.',
  'Crafted specifically for bridal mehndi specialists who need consistent, smooth paste flow for hours of non-stop application. Freezes for up to 6 months.',
  'Select harvest Rajasthani Henna, Moringa Oleifera, High-terpene Cajeput & Lavender Essential Oils, Pure Cane Sugar.',
  'Wholesale tier pricing for professionals • Consistent 0.38mm tip with zero clogging • Deep dark-brown stain guarantee',
  'Store in freezer upon arrival. Thaw for 30 minutes at room temperature before use.',
  'cat-bulk',
  'Bulk / Wholesale',
  true,
  true,
  '[{"id":"var-3-box50","sku":"ZH-BULK-50","name":"Box of 50 Cones","price":1899,"discountPrice":1699,"stockQuantity":40,"weightInGrams":1500},{"id":"var-3-box100","sku":"ZH-BULK-100","name":"Studio Master Pack (100 Cones)","price":3499,"discountPrice":2999,"stockQuantity":20,"weightInGrams":3000}]'::jsonb,
  '[{"id":"img-3","url":"/assets/images/henna-cones-in-hand.png","altText":"Bundle of 50 henna cones in hand","isPrimary":true,"order":1},{"id":"img-3-2","url":"/assets/images/bridal-henna-hands.jpg","altText":"Bridal stain result","isPrimary":false,"order":2}]'::jsonb,
  5.0,
  52
),
(
  'prod-4',
  'Pure Natural Henna Powder (Grade AAA)',
  'pure-natural-henna-powder-grade-aaa',
  'Triple-cloth micro-sieved Rajasthani henna leaf powder. 100% Lawsonia Inermis with 3.2% natural Lawson dye content.',
  'Stone-ground from shade-dried crown leaves of mature henna bushes in Sojat, Rajasthan. Triple micro-sieved through medical-grade nylon cloth for silky flour consistency.',
  '100% Pure Lawsonia Inermis (Organic Henna Leaf Powder).',
  'Sifted 3 times for zero lumps in cones • High natural dye potency for deep mahogany stains • 100% chemical-free',
  'Mix 100g powder with 30ml lemon juice, 10ml cajeput oil, and 30g sugar. Rest 12-24 hours for dye release before cone filling.',
  'cat-powder',
  'Henna Powder',
  true,
  true,
  '[{"id":"var-4-100g","sku":"ZH-POW-100G","name":"100g Foil Pouch","price":199,"discountPrice":169,"stockQuantity":80,"weightInGrams":100},{"id":"var-4-250g","sku":"ZH-POW-250G","name":"250g Artisanal Tin","price":399,"discountPrice":349,"stockQuantity":50,"weightInGrams":250},{"id":"var-4-500g","sku":"ZH-POW-500G","name":"500g Value Pack","price":699,"discountPrice":599,"stockQuantity":30,"weightInGrams":500}]'::jsonb,
  '[{"id":"img-4","url":"/assets/images/moringa-leaf-powder-swirl.png","altText":"Pure botanical leaf and swirling powder","isPrimary":true,"order":1}]'::jsonb,
  4.95,
  164
),
(
  'prod-5',
  'Moringa & Henna Herbal Hair Blend',
  'moringa-henna-herbal-hair-blend',
  'Ayurvedic blend of pure Henna and nutrient-rich Moringa powder for vibrant natural brown gloss and scalp strength.',
  'Supercharged with organic Moringa leaf powder packed with vitamins A, C, and iron. Nourishes roots, covers greys, and provides brilliant gloss.',
  'Pure Henna (Lawsonia Inermis), Organic Moringa Oleifera Leaf Powder, Wild Amla, Bhringraj.',
  'Promotes thick hair growth and strengthens roots • Natural brown gloss with zero chemical burning • Eliminates dandruff',
  'Mix with warm black tea or water into creamy paste. Apply from roots to ends for 2 hours, then rinse.',
  'cat-powder',
  'Henna Powder',
  false,
  true,
  '[{"id":"var-5-200g","sku":"ZH-MOR-200G","name":"200g Pouch","price":349,"discountPrice":299,"stockQuantity":60,"weightInGrams":200}]'::jsonb,
  '[{"id":"img-5","url":"/assets/images/moringa-leaf-powder-swirl.png","altText":"Moringa leaf swirl with fresh green powder","isPrimary":true,"order":1}]'::jsonb,
  4.88,
  76
),
(
  'prod-6',
  'Bridal Mehndi Luxury Collection Box',
  'bridal-mehndi-luxury-collection-box',
  'Complete bridal set: 12 ready cones, natural aftercare balm, and sealant spray for darkest stain longevity.',
  'Everything needed for a brides unforgettable wedding celebration. Includes 12 cones, organic beeswax balm, and essential oil sealant spray.',
  'Pure Sojat Henna Cones, Beeswax, Clove & Cardamom Balm, Lavender Sealant.',
  'Complete bridal kit in luxury gift packaging • Includes water-resistant aftercare balm • Deep midnight mahogany stains',
  'Apply cones, allow to dry, keep on skin overnight. Scrape off and massage balm generously. Avoid water for 24 hours.',
  'cat-cones-pack',
  'Pack of 12',
  true,
  true,
  '[{"id":"var-6-set","sku":"ZH-BRD-BOX","name":"Full Bridal Box Set","price":799,"discountPrice":699,"stockQuantity":35,"weightInGrams":550}]'::jsonb,
  '[{"id":"img-6","url":"/assets/images/bridal-henna-hands.jpg","altText":"Bridal henna hands with intricate floral mandalas","isPrimary":true,"order":1},{"id":"img-6-2","url":"/assets/images/henna-cones-in-hand.png","altText":"Cones included in the set","isPrimary":false,"order":2}]'::jsonb,
  5.0,
  94
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  slug = EXCLUDED.slug,
  short_desc = EXCLUDED.short_desc,
  description = EXCLUDED.description,
  ingredients = EXCLUDED.ingredients,
  benefits = EXCLUDED.benefits,
  how_to_use = EXCLUDED.how_to_use,
  category_id = EXCLUDED.category_id,
  category_name = EXCLUDED.category_name,
  is_featured = EXCLUDED.is_featured,
  is_visible = EXCLUDED.is_visible,
  variants = EXCLUDED.variants,
  images = EXCLUDED.images,
  rating = EXCLUDED.rating,
  review_count = EXCLUDED.review_count;

-- 9. VERIFICATION
SELECT count(*) AS total_products FROM public.products;
SELECT count(*) AS total_categories FROM public.categories;
