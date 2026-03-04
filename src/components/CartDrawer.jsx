import { useCart } from '../contexts/CartContext';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, totalPrice } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-brand-dark bg-opacity-75 transition-opacity backdrop-blur-sm"
          aria-hidden="true"
          onClick={() => setIsCartOpen(false)}
        />

        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div className="pointer-events-auto w-screen max-w-md transform transition-all duration-500 ease-in-out">
            <div className="flex h-full flex-col bg-brand-light shadow-xl">

              {/* Header */}
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-2xl font-serif font-bold text-brand-dark" id="slide-over-title">Shopping Cart</h2>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="relative -m-2 p-2 text-brand-brown hover:text-brand-dark transition-colors"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close panel</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                {/* Cart Items */}
                <div className="mt-8">
                  <div className="flow-root">
                    {items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center text-brand-brown py-12">
                        <ShoppingBag className="h-16 w-16 mb-4 text-brand-pink" />
                        <p className="text-lg">Your cart is currently empty.</p>
                        <button
                          onClick={() => setIsCartOpen(false)}
                          className="mt-6 font-medium text-brand-gold hover:text-brand-brown underline underline-offset-4"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <ul role="list" className="-my-6 divide-y divide-brand-pink/50">
                        {items.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-brand-pink/50">
                              <img
                                src={product.imageSrc}
                                alt={product.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-brand-dark">
                                  <h3 className="font-serif">
                                    <a href="#">{product.name}</a>
                                  </h3>
                                  <p className="ml-4 text-brand-gold whitespace-nowrap">ETB {product.price.toLocaleString()}</p>
                                </div>
                                <p className="mt-1 text-sm text-brand-lightBrown line-clamp-2">{product.description}</p>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="flex items-center border border-brand-pink rounded-md">
                                  <button
                                    className="p-1 text-brand-brown hover:bg-brand-pink transition-colors rounded-l-md"
                                    onClick={() => updateQuantity(product.id, product.quantity - 1)}
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <p className="text-brand-dark px-3 py-1 font-medium">{product.quantity}</p>
                                  <button
                                    className="p-1 text-brand-brown hover:bg-brand-pink transition-colors rounded-r-md"
                                    onClick={() => updateQuantity(product.id, product.quantity + 1)}
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-brand-brown hover:text-brand-dark underline underline-offset-2"
                                    onClick={() => removeItem(product.id)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-brand-pink px-4 py-6 sm:px-6 bg-white/50">
                  <div className="flex justify-between text-lg font-bold text-brand-dark font-serif">
                    <p>Subtotal</p>
                    <p className="text-brand-gold">ETB {totalPrice.toLocaleString()}</p>
                  </div>
                  <p className="mt-1 text-sm text-brand-lightBrown">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-brand-dark px-6 py-4 text-base font-medium text-brand-light shadow-sm hover:bg-brand-brown transition-colors focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-brand-lightBrown">
                    <p>
                      or{' '}
                      <button
                        type="button"
                        className="font-medium text-brand-gold hover:text-brand-brown"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Continue Shopping<span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
