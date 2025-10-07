import React from "react";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Send,
  Linkedin,
  Globe,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Shield,
  Truck,
  CreditCard,
  HeadphonesIcon,
} from "lucide-react";

const footerLinks = {
  products: {
    title: "Products",
    links: [
      "Training T-Shirts",
      "Compression Fit",
      "Tank Tops",
      "Long Sleeve Shirts",
      "Athletic Shorts",
      "Hoodies & Jackets",
      "Accessories",
      "New Arrivals",
    ],
  },
  collections: {
    title: "Collections",
    links: [
      "Men's Collection",
      "Women's Collection",
      "Unisex Collection",
      "Limited Edition",
      "Summer Collection",
      "Winter Collection",
      "Best Sellers",
    ],
  },
  support: {
    title: "Customer Support",
    links: [
      "Size Guide",
      "Shipping Info",
      "Returns & Exchanges",
      "Track Order",
      "FAQs",
      "Contact Us",
      "Warranty Info",
      "Care Instructions",
    ],
  },
  company: {
    title: "Company",
    links: [
      "About Us",
      "Our Story",
      "Sustainability",
      "Careers",
      "Press & Media",
      "Blog",
      "Reviews",
      "Affiliates",
    ],
  },
  resources: {
    title: "Resources",
    links: [
      "Training Tips",
      "Workout Guides",
      "Athlete Stories",
      "Style Guide",
      "Gift Cards",
      "Student Discount",
      "Corporate Gifts",
    ],
  },
  legal: {
    title: "Legal",
    links: [
      "Terms of Service",
      "Privacy Policy",
      "Cookie Policy",
      "GDPR Compliance",
      "Accessibility",
      "Licensing",
    ],
  },
};

const socialLinks = [
  {
    icon: Instagram,
    url: "#",
    label: "Instagram",
    color: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500",
  },
  {
    icon: Facebook,
    url: "#",
    label: "Facebook",
    color: "hover:bg-blue-600",
  },
  // {
  //   icon: Twitter,
  //   url: "#",
  //   label: "Twitter",
  //   color: "hover:bg-sky-500",
  // },
  // {
  //   icon: Youtube,
  //   url: "#",
  //   label: "YouTube",
  //   color: "hover:bg-red-600",
  // },
];

const contactInfo = [
  {
    icon: Mail,
    text: "support@swordhub.com",
    href: "mailto:support@swordhub.com",
  },
  {
    icon: Phone,
    text: "+212 675643119",
    href: "tel:+212 675643119",
  },
  {
    icon: MapPin,
    text: "123 Fitness Ave, NY 10001",
    href: "#",
  },
];

const features = [
  {
    icon: Shield,
    text: "Secure Payment",
  },
  {
    icon: Truck,
    text: "Free Shipping",
  },
  {
    icon: CreditCard,
    text: "Easy Returns",
  },
  {
    icon: HeadphonesIcon,
    text: "24/7 Support",
  },
];

export function Footer() {
  return (
    <footer className="relative py-6 overflow-hidden md:py-8">
      {/* Professional Background Design */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface/30 via-background to-background">
        {/* Subtle Glow Accents */}
        <div className="absolute w-[800px] h-[400px] -top-48 -left-48 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute w-[600px] h-[300px] top-1/2 -right-32 bg-primary/4 rounded-full blur-3xl" />

        {/* Clean Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(97,254,8,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(97,254,8,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-secondary/[0.02]" />

        {/* Top Edge Glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      {/* Content with higher z-index */}
      <div className="container relative z-10 px-4 mx-auto lg:px-6">
        {/* Top Section - Brand + Newsletter */}
        <div className="grid gap-4 pb-4 mb-4 md:gap-6 md:pb-6 md:mb-6 lg:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-3 lg:col-span-1">
            <div>
              <h3 className="mb-1.5 text-xl font-bold md:text-2xl">
                SWORD<span className="text-primary">HUB</span>
              </h3>
              <p className="text-xs leading-relaxed text-text-muted">
                Premium athletic wear designed for champions. Elevate your
                performance with cutting-edge materials.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-1.5">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.href}
                  className="flex items-center gap-2 text-xs transition-colors group text-text-muted hover:text-primary"
                >
                  <div className="p-1.5 transition-colors rounded-lg bg-surface/50 group-hover:bg-primary/10">
                    <info.icon size={12} className="text-primary" />
                  </div>
                  <span>{info.text}</span>
                </a>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-1.5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 p-1.5 transition-all rounded-lg bg-surface/30 hover:bg-surface/50"
                >
                  <feature.icon size={12} className="text-primary" />
                  <span className="text-xs font-medium text-text">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-2">
            <div className="p-4 md:p-5 lg:p-6 bg-surface/30 backdrop-blur-sm rounded-xl">
              <div className="max-w-xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-2 md:mb-3">
                  <Send className="text-primary" size={18} />
                  <h3 className="text-base font-bold md:text-lg lg:text-xl text-text">
                    Join Our Community
                  </h3>
                </div>
                <p className="mb-3 text-xs text-center md:text-sm md:mb-4 text-text-muted">
                  Subscribe for exclusive access to new launches, special
                  offers, and athlete tips. Plus, get 15% off your first order!
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-3 py-2 text-xs md:py-2.5 md:text-sm sm:flex-1 rounded-xl bg-background/50 text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <button className="flex items-center justify-center gap-2 px-4 py-2 text-xs md:py-2.5 md:px-5 md:text-sm font-semibold transition-all sm:w-auto rounded-xl bg-primary text-background hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95">
                    Subscribe
                    <ChevronRight size={14} />
                  </button>
                </div>
                <p className="mt-2 text-xs text-center text-text-muted">
                  By subscribing, you agree to our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Links Section - 6 Columns
        <div className="grid grid-cols-2 gap-8 pb-12 mb-8 md:grid-cols-3 lg:grid-cols-6">
          {Object.entries(footerLinks).map(([key, category]) => (
            <div key={key}>
              <h4 className="mb-5 text-sm font-bold tracking-wider uppercase text-primary">
                {category.title}
              </h4>
              <ul className="space-y-3">
                {category.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="flex items-center text-sm transition-all group text-text-muted hover:text-primary hover:translate-x-1"
                    >
                      <ChevronRight
                        size={14}
                        className="mr-1 transition-opacity opacity-0 group-hover:opacity-100"
                      />
                      <span>{link}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div> */}

        {/* Bottom Section - Compact Layout */}
        <div className="py-3 md:py-4">
          {/* Single Row Layout on Desktop */}
          <div className="flex flex-col gap-4 md:gap-5">
            {/* Social Media & Developer Credit - Side by Side on Desktop */}
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row md:gap-6">
              {/* Social Media */}
              <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
                <h4 className="text-xs font-bold tracking-wider uppercase md:text-sm text-text">
                  Connect:
                </h4>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`group relative p-2.5 md:p-3 bg-surface/50 rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1 ${social.color} hover:text-white`}
                    >
                      <social.icon
                        size={18}
                        className="relative z-10 md:w-5 md:h-5"
                      />
                      <span className="absolute inset-0 transition-all duration-300 rounded-lg bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-primary/20" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Developer Credit */}
              <div className="flex flex-col items-center gap-2 md:flex-row md:gap-3">
                <p className="text-xs font-semibold md:text-sm text-text-muted">
                  Crafted with <span className="text-primary">passion</span>
                </p>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.linkedin.com/in/your-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2 overflow-hidden text-xs md:text-sm text-white transition-all duration-300 group bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
                  >
                    <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-700 to-blue-800 group-hover:opacity-100" />
                    <Linkedin size={16} className="relative z-10" />
                    <span className="relative z-10 font-semibold">
                      LinkedIn
                    </span>
                    <ExternalLink
                      size={12}
                      className="relative z-10 transition-all duration-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </a>

                  <a
                    href="https://your-portfolio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center gap-1.5 px-3 py-2 md:px-4 md:py-2 overflow-hidden text-xs md:text-sm transition-all duration-300 group bg-gradient-to-r from-primary to-secondary text-background rounded-lg hover:shadow-lg hover:shadow-primary/50 hover:scale-105"
                  >
                    <span className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-secondary to-primary group-hover:opacity-100" />
                    <Globe size={16} className="relative z-10" />
                    <span className="relative z-10 font-semibold">
                      Portfolio
                    </span>
                    <ExternalLink
                      size={12}
                      className="relative z-10 transition-all duration-300 -translate-x-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Copyright & Legal Links */}
            <div className="pt-3 md:pt-4">
              <div className="flex flex-col items-center justify-between gap-3 md:flex-row md:gap-4">
                {/* Copyright */}
                <div className="flex items-center gap-2 text-center">
                  <p className="text-xs font-semibold md:text-sm text-text">
                    © {new Date().getFullYear()}{" "}
                    <span className="text-sm font-bold md:text-base">
                      SWORD<span className="text-primary">HUB</span>
                    </span>
                  </p>
                  <span className="hidden text-xs md:inline text-text-muted">
                    •
                  </span>
                  <p className="hidden text-xs md:inline text-text-muted">
                    Designed for champions
                  </p>
                </div>

                {/* Legal Links */}
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:gap-3 text-text-muted">
                  <a
                    href="#"
                    className="font-medium transition-all hover:text-primary hover:underline underline-offset-4"
                  >
                    Privacy
                  </a>
                  <span className="text-primary/40">•</span>
                  <a
                    href="#"
                    className="font-medium transition-all hover:text-primary hover:underline underline-offset-4"
                  >
                    Terms
                  </a>
                  <span className="text-primary/40">•</span>
                  <a
                    href="#"
                    className="font-medium transition-all hover:text-primary hover:underline underline-offset-4"
                  >
                    Cookies
                  </a>
                  <span className="text-primary/40">•</span>
                  <a
                    href="#"
                    className="font-medium transition-all hover:text-primary hover:underline underline-offset-4"
                  >
                    Sitemap
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
