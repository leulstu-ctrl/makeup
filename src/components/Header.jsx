import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, toggleCart } = useCart();

  const navLinks = [
    { name: 'Face', href: '#' },
    { name: 'Eyes', href: '#' },
    { name: 'Lips', href: '#' },
    { name: 'Skincare', href: '#' },
    { name: 'Offers', href: '#' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-light/90 backdrop-blur-md border-b border-brand-pink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-brand-brown hover:text-brand-gold p-2 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
            <Link to="/" className="text-2xl font-serif font-bold text-brand-dark tracking-wide">
              Natural <span className="text-brand-gold">Beauty</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-brand-brown hover:text-brand-gold font-medium transition-colors uppercase text-sm tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Cart Icon */}
          <div className="flex items-center lg:justify-end">
            <button
              onClick={toggleCart}
              className="text-brand-brown hover:text-brand-gold p-2 relative transition-colors"
            >
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-brand-light transform translate-x-1/4 -translate-y-1/4 bg-brand-gold rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute w-full bg-brand-light border-b border-brand-pink shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-brand-brown hover:text-brand-gold hover:bg-brand-pink/30 rounded-md"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
