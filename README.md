# Zahra Henna — Official E-Commerce Showcase & WhatsApp Ordering

A modern, fully responsive e-commerce showcase website for **"Zahra Henna"**, a natural henna cone brand (distributor & manufacturer). Built with Next.js (App Router), Tailwind CSS, and Framer Motion. Customers easily browse cones and bundles, with instant checkout and enquiries completed directly via WhatsApp.

---

## 🎨 Official Brand Identity & Palette

Strict adherence to the official color palette:
- **Henna Brown (Primary):** `#5A2E1A`
- **Deep Mehndi Dark:** `#2B1409`
- **Moringa Leaf Green (Accent):** `#5E8C31`
- **Soft Leaf Green (Light Accent):** `#A9C47F`
- **Warm Cream (Background):** `#FAF3E8`
- **Sand / Caramel (Secondary):** `#C98A4B`
- **White:** `#FFFFFF`

**Typography:**
- Headings: Playfair Display / Cormorant Garamond
- Body: Poppins / Inter

---

## 🚀 Live Preview

The application is running locally on:
**[http://localhost:3000](http://localhost:3000)**

---

## 📱 WhatsApp Order Integration

Orders are sent directly to your WhatsApp number via the pre-filled link:
```
https://wa.me/<MY_WHATSAPP_NUMBER>?text=<encoded_message>
```

**Message Format:**
```
Hello Zahra Henna 👋
I would like to place an order:
1. Natural Henna Cones (Pack of 12) (Pack of 12 Cones) x 1 - ₹449
2. Master Artist Bulk Cones (Box of 50) x 1 - ₹1699

Total: ₹2148
Name: Priyal Verma
Phone: +91 98765 43210
Address: Flat 402, Lotus Residency, Jaipur
Notes: Please pack with cold protection
```

The WhatsApp number is centralized in `.env` as `NEXT_PUBLIC_WHATSAPP_NUMBER` and configured in `src/lib/config.ts`. You can also update it live from the **Admin Settings** page without touching code!

---

## 📁 Project Structure

```
zahra-henna/
├── public/
│   └── assets/
│       └── images/
│           ├── henna-cones-in-hand.png          # Real uploaded cones visual
│           ├── moringa-leaf-powder-swirl.png    # Real uploaded moringa swirl visual
│           └── bridal-henna-hands.jpg           # Real uploaded bridal henna visual
├── src/
│   ├── app/
│   │   ├── layout.tsx                           # Global layout (Navbar, Footer, CartDrawer, WhatsApp FAB)
│   │   ├── page.tsx                             # Home page (Hero, Marquee, Products, Ingredients, Gallery, Testimonials, CTA)
│   │   ├── about/page.tsx                       # Our Journey, Chemical-Free Promise, How We Make It (4 steps), Values, Stats
│   │   ├── shop/page.tsx                        # Product catalog (search, category filter, sort, quick add)
│   │   ├── shop/[slug]/page.tsx                 # Product detail (gallery, ingredients, usage/aftercare tips, WhatsApp enquire)
│   │   ├── cart/page.tsx                        # Cart with +/- controls, delivery details, "Checkout via WhatsApp"
│   │   ├── contact/page.tsx                     # Contact cards, social links, Enquiry form + WhatsApp send, FAQ accordion
│   │   └── admin/
│   │       ├── layout.tsx                       # Admin console layout with sidebar
│   │       ├── page.tsx                         # Overview dashboard (KPIs, recent WhatsApp orders, recent messages)
│   │       ├── login/page.tsx                   # Secure login in brand colors
│   │       ├── products/page.tsx                # Product management (list, stock badges, edit, delete)
│   │       ├── products/new/page.tsx            # Add product form
│   │       ├── orders/page.tsx                  # WhatsApp orders log (New, Confirmed, Delivered) + direct customer WA chat
│   │       ├── enquiries/page.tsx               # Contact form inquiries with mark as read & delete
│   │       └── settings/page.tsx                # Update WhatsApp number, social URLs, and hero text
│   ├── components/
│   │   └── storefront/
│   │       ├── Navbar.tsx                       # Sticky navbar (turns cream on scroll)
│   │       ├── Logo.tsx                         # "Zahra Henna" with leaf & henna-drop mark
│   │       ├── Footer.tsx                       # Brand line, links, social media, WhatsApp
│   │       ├── ProductCard.tsx                  # Product card with stepper & WhatsApp enquiry
│   │       ├── QuoteMarquee.tsx                 # Animated "100% Natural" quote marquee
│   │       ├── CartDrawer.tsx                   # Slide-over cart drawer
│   │       └── WhatsAppFloatingButton.tsx       # Floating WhatsApp button on every page
│   ├── lib/
│   │   ├── config.ts                            # Centralized brand config & WhatsApp number
│   │   ├── cart-context.tsx                     # Cart provider with localStorage persistence
│   │   ├── utils.ts                             # Currency formatter (₹) and helpers
│   │   └── data/
│   │       ├── mock-data.ts                     # Seed data (6 products, 4 categories, testimonials, FAQs)
│   │       └── store.ts                         # Data layer for products, orders, enquiries, and settings
│   └── types/index.ts                           # Shared TypeScript interfaces
├── .env.example
├── tailwind.config.ts                           # Theme variables with official brand palette
└── package.json
```

---

## ⚙️ Environment Variables (`.env`)

```bash
# Central WhatsApp Number (e.g. 91XXXXXXXXXX)
NEXT_PUBLIC_WHATSAPP_NUMBER="919876543210"

# Supabase Database & Auth (Optional / for remote storage)
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

---

## 🔐 Admin Credentials

- **Login URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email:** `admin@zahrahenna.com`
- **Password:** `ZahraAdmin2026!`

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Zahra Henna official release"
   git remote add origin https://github.com/your-username/zahra-henna.git
   git push -u origin main
   ```
2. Go to **[vercel.com](https://vercel.com)** $\to$ Click **Add New Project** $\to$ Import your repo.
3. In **Environment Variables**, set:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = your actual WhatsApp number with country code (e.g., `919876543210`).
4. Click **Deploy**. Vercel will build and launch your live production website!
