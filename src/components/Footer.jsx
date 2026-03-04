import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-brand-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-serif font-bold tracking-wide text-brand-light">
              Natural <span className="text-brand-gold">Beauty</span>
            </Link>
            <p className="mt-4 text-brand-pink/80 text-sm">
              Unveil your natural beauty with our premium makeup and skincare products. Designed for diverse skin tones and delivered across Ethiopia.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-brand-pink/80 hover:text-brand-gold transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-brand-pink/80 hover:text-brand-gold transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-brand-pink/80 hover:text-brand-gold transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-gold tracking-wider uppercase mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-brand-pink/80 hover:text-brand-light transition-colors text-sm">Face</a></li>
              <li><a href="#" className="text-brand-pink/80 hover:text-brand-light transition-colors text-sm">Eyes</a></li>
              <li><a href="#" className="text-brand-pink/80 hover:text-brand-light transition-colors text-sm">Lips</a></li>
              <li><a href="#" className="text-brand-pink/80 hover:text-brand-light transition-colors text-sm">Skincare</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-gold tracking-wider uppercase mb-4">Customer Care</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-brand-pink/80 hover:text-brand-light transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-brand-pink/80 hover:text-brand-light transition-colors text-sm">Shipping & Returns</a></li>
              <li><a href="#" className="text-brand-pink/80 hover:text-brand-light transition-colors text-sm">FAQs</a></li>
              <li><a href="#" className="text-brand-pink/80 hover:text-brand-light transition-colors text-sm">Store Locator</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-gold tracking-wider uppercase mb-4">Newsletter</h3>
            <p className="text-brand-pink/80 text-sm mb-4">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="mt-2 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-2 text-base text-brand-light placeholder-brand-pink/50 shadow-sm focus:ring-2 focus:ring-brand-gold focus:outline-none sm:text-sm"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md sm:ml-3 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-brand-gold px-4 py-2 text-base font-medium text-brand-dark hover:bg-brand-pink transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-dark sm:text-sm"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-lightBrown/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-brand-pink/60 xl:text-center">
            &copy; {new Date().getFullYear()} Natural Beauty Ethiopia. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6 text-sm text-brand-pink/60">
            <a href="#" className="hover:text-brand-light">Privacy Policy</a>
            <a href="#" className="hover:text-brand-light">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
