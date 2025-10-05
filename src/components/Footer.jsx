import React from "react";
import { Instagram, Facebook, Twitter, Youtube, Send } from "lucide-react";

const footerLinks = {
  shop: ["Training T-Shirts", "Compression Fit", "Tank Tops", "Long Sleeve"],
  help: ["Size Guide", "Shipping Info", "Returns", "Track Order"],
  company: ["Our Story", "Sustainability", "WhatsApp Contact"],
  legal: ["Terms", "Privacy", "Cookie Policy"],
};

const socialLinks = [
  { icon: Instagram, url: "#" },
  { icon: Facebook, url: "#" },
  { icon: Twitter, url: "#" },
  { icon: Youtube, url: "#" },
];

export function Footer() {
  return (
    <footer className="pt-16 border-t bg-surface/80 backdrop-blur-md border-primary/10">
      <div className="container px-4 mx-auto lg:px-8">
        {/* Newsletter */}
        <div className="max-w-2xl mx-auto mb-16 text-center">
          <h3 className="mb-4 text-2xl font-bold text-text">
            Get Exclusive Updates
          </h3>
          <p className="mb-6 text-text-muted">
            Join our community to receive early access to new designs, special
            offers, and fitness tips.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border rounded-xl bg-background/50 text-text placeholder-text-muted border-primary/10 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="flex items-center gap-2 px-6 py-3 transition-all rounded-xl bg-primary text-background hover:shadow-lg hover:shadow-primary/20 hover:scale-105">
              Subscribe
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-8 mb-12 md:grid-cols-4">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-4 font-semibold uppercase text-primary">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="transition-colors text-neutral hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-accent">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="p-2 transition-all rounded-lg text-neutral hover:text-primary hover:bg-accent"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
