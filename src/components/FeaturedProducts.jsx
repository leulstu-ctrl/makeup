import { useNavigate } from 'react-router-dom';
import { ImageOff } from 'lucide-react';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: "Radiant Glow Foundation",
    description: "A lightweight, buildable foundation that matches your unique undertones.",
    price: 1500,
    imageSrc: "https://images.unsplash.com/photo-1599305090598-fe179d501227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Velvet Matte Lipstick",
    description: "Deep, rich color with a comfortable matte finish that lasts all day.",
    price: 850,
    imageSrc: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Precision Liquid Eyeliner",
    description: "Waterproof, smudge-proof liquid eyeliner for the perfect wing.",
    price: 700,
    imageSrc: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "Dewy Setting Spray",
    description: "Lock in your makeup and keep your skin looking fresh and hydrated.",
    price: 1200,
    imageSrc: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "Hydrating Facial Serum",
    description: "Infused with botanical extracts to nourish and plump the skin.",
    price: 2100,
    imageSrc: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "Rosehip Face Oil",
    description: "Pure, cold-pressed rosehip oil for a bright and glowing complexion.",
    price: 1800,
    imageSrc: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "Cream Blush Duo",
    description: "Two complementary shades that blend seamlessly into the skin.",
    price: 1300,
    imageSrc: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Gentle Cleansing Balm",
    description: "Melts away makeup and impurities without stripping the skin.",
    price: 1600,
    imageSrc: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "Luxury Eyeshadow Palette",
    description: "A stunning palette of highly pigmented, blendable shades.",
    price: 3999,
    imageSrc: "/Screenshot From 2026-03-04 19-37-42.png",
  },
  {
    id: 13,
    name: "Premium Skincare Set",
    description: "A complete set of our best-selling skincare essentials.",
    price: 2999,
    imageSrc: "/Screenshot From 2026-03-04 19-38-02.png",
  },
  {
    id: 14,
    name: "Pro Makeup Brushes",
    description: "Professional-grade brushes for flawless application.",
    price: 2999,
    imageSrc: "/Screenshot From 2026-03-04 19-39-07.png",
  },
  {
    id: 15,
    name: "3 Colors Matte Lipsticks",
    description: "A stunning set of 3 long-lasting matte lipsticks.",
    price: 3999,
    imageSrc: "/Screenshot From 2026-03-04 19-39-43.png",
  }
];

export default function FeaturedProducts() {
  const navigate = useNavigate();

  return (
    <div id="products" className="bg-brand-light">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-serif font-bold tracking-tight text-brand-dark mb-8">Featured Products</h2>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {MOCK_PRODUCTS.map((product) => (
            <div key={product.id} className="group relative flex flex-col bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-brand-pink/20">

              <div className="aspect-[4/5] h-64 sm:h-80 bg-brand-pink/10 overflow-hidden flex items-center justify-center relative w-full">
                {product.imageSrc ? (
                  <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 absolute inset-0"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-brand-lightBrown p-4">
                    <ImageOff className="h-12 w-12 mb-2 opacity-50" />
                    <span className="text-sm font-medium">Image coming soon</span>
                  </div>
                )}
              </div>

              <div className="flex-1 p-4 space-y-2 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-semibold text-brand-dark">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-brand-lightBrown line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 flex items-center justify-between mt-auto z-10 relative">
                  <div className="flex flex-col">
                    <p className="text-lg font-medium text-brand-gold">
                      ETB {(product.price * 0.7).toLocaleString()}
                      <span className="ml-2 text-sm text-gray-400 line-through">ETB {product.price.toLocaleString()}</span>
                    </p>
                    <span className="text-xs text-brand-pink font-semibold">30% OFF FIRST PURCHASE</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/checkout', { state: { product } });
                    }}
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-brand-pink text-brand-brown hover:bg-brand-gold hover:text-brand-light transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold"
                    aria-label={`Buy ${product.name}`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
