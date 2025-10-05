import React from 'react';
import { Send } from 'lucide-react';
import '../styles/components/Newsletter.css';

export function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2 className="section-title">Join Our Newsletter</h2>
        <p className="section-description">Get exclusive offers and updates</p>
        <form className="newsletter-form">
          <div className="newsletter-input-group">
            <input 
              type="email" 
              className="newsletter-input"
              placeholder="Enter your email address" 
            />
            <button type="submit" className="newsletter-button">
              Subscribe <Send className="w-4 h-4 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

