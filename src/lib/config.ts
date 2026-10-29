export const BRAND_CONFIG = {
  name: "Zahra Henna",
  tagline: "100% Natural. Zero Chemicals. Pure Henna.",
  subtext: "Handcrafted natural henna cones made with pure henna leaf powder, moringa, and therapeutic essential oils for rich, dark-brown stains.",
  
  // Single central WhatsApp Number (can also be read from process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210", // Placeholder: 91XXXXXXXXXX
  
  email: "care@zahrahenna.com",
  phone: "+91 98765 43210",
  location: "Artisanal Studio, Sojat, Rajasthan, India",
  
  socialLinks: {
    instagram: "https://instagram.com/zahrahenna",
    facebook: "https://facebook.com/zahrahenna",
    youtube: "https://youtube.com/@zahrahenna",
    tiktok: "https://tiktok.com/@zahrahenna",
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210"}`,
  },

  images: {
    conesInHand: "/assets/images/henna-cones-in-hand.png",
    moringaSwirl: "/assets/images/moringa-leaf-powder-swirl.png",
    bridalHenna: "/assets/images/bridal-henna-hands.jpg",
  },
};
