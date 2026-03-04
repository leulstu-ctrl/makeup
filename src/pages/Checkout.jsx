import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

const PAYMENT_METHODS = [
  { id: 'telebirr', name: 'Telebirr', description: 'Pay easily with your phone' },
  { id: 'cbebirr', name: 'CBE Birr', description: 'Direct from your CBE account' },
  { id: 'mpesa', name: 'M-Pesa Sahar', description: 'Fast and secure mobile money' },
  { id: 'cod', name: 'Cash on Delivery', description: 'Pay when your order arrives' },
];

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState('telebirr');
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Addis Ababa',
    address: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // In a real app, this would submit the order to a backend
    setIsSuccess(true);

    // Clear cart after a short delay so the user can see the success state
    setTimeout(() => {
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl border border-brand-pink text-center transform transition-all animate-fade-in-up">
          <div className="flex justify-center">
            <CheckCircle2 className="h-24 w-24 text-brand-gold" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-brand-dark font-serif">Order Confirmed!</h2>
          <p className="mt-2 text-sm text-brand-lightBrown">
            Thank you for shopping with Natural Beauty. Your beautiful products will be delivered soon!
          </p>
          <div className="mt-8">
            <button
              onClick={() => navigate('/')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-brand-light bg-brand-dark hover:bg-brand-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-light min-h-screen">
      <div className="max-w-7xl mx-auto px-4 pt-8 pb-16 sm:px-6 lg:px-8">

        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-brand-brown hover:text-brand-gold transition-colors">
            <ChevronLeft className="mr-1 h-5 w-5" />
            Back to shopping
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-5 lg:col-start-8 mb-10 lg:mb-0">
            <section aria-labelledby="summary-heading" className="bg-white rounded-lg px-4 py-6 sm:p-6 lg:p-8 shadow-sm border border-brand-pink/50 sticky top-24">
              <h2 id="summary-heading" className="text-lg font-medium text-brand-dark font-serif mb-4">
                Order Summary
              </h2>

              {items.length === 0 ? (
                <p className="text-brand-lightBrown">Your cart is empty.</p>
              ) : (
                <ul role="list" className="divide-y divide-brand-pink/30 border-t border-b border-brand-pink/30 mb-6 max-h-96 overflow-y-auto">
                  {items.map((product) => (
                    <li key={product.id} className="flex py-4">
                      <div className="flex-shrink-0">
                        <img
                          src={product.imageSrc}
                          alt={product.name}
                          className="w-16 h-16 rounded-md object-center object-cover border border-brand-pink/20"
                        />
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-brand-dark">
                            <h3 className="font-serif">{product.name}</h3>
                            <p className="ml-4 text-brand-gold whitespace-nowrap">ETB {(product.price * product.quantity).toLocaleString()}</p>
                          </div>
                          <p className="mt-1 text-sm text-brand-lightBrown">Qty {product.quantity}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <dl className="space-y-4 text-sm text-brand-lightBrown">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-brand-dark">ETB {totalPrice.toLocaleString()}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Shipping estimate</dt>
                  <dd className="font-medium text-brand-dark">ETB 150</dd>
                </div>
                <div className="flex items-center justify-between border-t border-brand-pink/50 pt-4">
                  <dt className="text-base font-medium text-brand-dark font-serif">Order Total</dt>
                  <dd className="text-lg font-bold text-brand-gold font-serif">ETB {(totalPrice + (items.length > 0 ? 150 : 0)).toLocaleString()}</dd>
                </div>
              </dl>
            </section>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-7 lg:col-start-1 lg:row-start-1">
            <form onSubmit={handlePlaceOrder} className="bg-white rounded-lg shadow-sm border border-brand-pink/50 p-6 sm:p-8">

              <div className="mb-10">
                <h2 className="text-xl font-medium text-brand-dark font-serif mb-6">Shipping Details</h2>

                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-brand-brown">Full Name</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="block w-full border-brand-pink/50 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold sm:text-sm p-2.5 border bg-brand-light/20"
                        placeholder="Abebe Bikila"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-brand-brown">Phone Number</label>
                    <div className="mt-1">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="block w-full border-brand-pink/50 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold sm:text-sm p-2.5 border bg-brand-light/20"
                        placeholder="+251 91 234 5678"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label htmlFor="city" className="block text-sm font-medium text-brand-brown">City / Region</label>
                    <div className="mt-1">
                      <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="block w-full border-brand-pink/50 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold sm:text-sm p-2.5 border bg-brand-light/20"
                      >
                        <option value="Addis Ababa">Addis Ababa</option>
                        <option value="Dire Dawa">Dire Dawa</option>
                        <option value="Adama">Adama (Nazret)</option>
                        <option value="Hawassa">Hawassa</option>
                        <option value="Bahir Dar">Bahir Dar</option>
                        <option value="Mekelle">Mekelle</option>
                        <option value="Gondar">Gondar</option>
                      </select>
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-brand-brown">Street Address / Local Area</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="block w-full border-brand-pink/50 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold sm:text-sm p-2.5 border bg-brand-light/20"
                        placeholder="Bole, near Edna Mall"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-brand-pink/50">
                <h2 className="text-xl font-medium text-brand-dark font-serif mb-6">Payment Method</h2>

                <fieldset>
                  <legend className="sr-only">Payment method</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PAYMENT_METHODS.map((method) => (
                      <div key={method.id} className="relative flex">
                        <label
                          className={clsx(
                            selectedPayment === method.id
                              ? 'border-brand-gold ring-2 ring-brand-gold bg-brand-pink/10'
                              : 'border-brand-pink/50 bg-white hover:bg-brand-pink/5',
                            'relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none w-full transition-all'
                          )}
                        >
                          <input
                            type="radio"
                            name="payment-method"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={(e) => setSelectedPayment(e.target.value)}
                            className="sr-only"
                          />
                          <div className="flex flex-1">
                            <div className="flex flex-col">
                              <span id={`${method.id}-label`} className="block text-sm font-medium text-brand-dark">
                                {method.name}
                              </span>
                              <span id={`${method.id}-description`} className="mt-1 flex items-center text-sm text-brand-lightBrown">
                                {method.description}
                              </span>
                            </div>
                          </div>
                          <CheckCircle2
                            className={clsx(
                              selectedPayment === method.id ? 'text-brand-gold' : 'invisible',
                              'h-5 w-5'
                            )}
                            aria-hidden="true"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>

              <div className="mt-10 pt-6 border-t border-brand-pink/50 flex justify-end">
                <button
                  type="submit"
                  disabled={items.length === 0}
                  className="w-full sm:w-auto bg-brand-dark border border-transparent rounded-md shadow-sm py-3 px-8 text-base font-medium text-brand-light hover:bg-brand-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
