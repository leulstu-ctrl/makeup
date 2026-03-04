import { useState } from 'react';
import { CheckCircle2, ChevronLeft } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const PAYMENT_METHODS = [
  { id: 'ebirr', name: 'EBIRR', description: 'Pay securely with EBIRR' },
];

import { useEffect } from 'react';
import { ImageOff } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [selectedPayment, setSelectedPayment] = useState('ebirr');
  const [step, setStep] = useState('form'); // 'form' | 'payment' | 'success'
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [confirmationCode, setConfirmationCode] = useState('');
  const [screenshotFileName, setScreenshotFileName] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: 'Addis Ababa',
    address: ''
  });

  useEffect(() => {
    let timerId;
    if (step === 'payment' && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
             clearInterval(timerId);
             setStep('form');
             alert("Payment session expired. Please try again.");
             return 600;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [step]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleConfirmPayment = (e) => {
    e.preventDefault();
    // In a real app, verify the confirmation code and screenshot upload here
    if (confirmationCode.trim() !== '' || screenshotFileName !== '') {
      setStep('success');
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshotFileName(file.name);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (step === 'success') {
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

  if (step === 'payment') {
    const orderTotal = product ? product.price + 150 : 0;

    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-xl shadow-2xl border border-brand-pink transform transition-all animate-fade-in-up">

          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-brand-dark font-serif mb-2">Complete Payment</h2>
            <p className="text-brand-lightBrown text-sm">Please follow the instructions below to finalize your order.</p>
          </div>

          <div className="bg-brand-pink/10 rounded-lg p-6 border border-brand-pink/30 text-center">
            <div className="text-4xl font-mono font-bold text-brand-dark mb-2 tracking-wider">
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-brand-brown uppercase tracking-widest">Time Remaining</p>
          </div>

          <div className="space-y-6">
            <div className="border-b border-brand-pink/30 pb-4">
              <h3 className="text-sm font-medium text-brand-brown uppercase tracking-wider mb-3">Payment Instructions</h3>
              <ol className="list-decimal list-inside text-sm text-brand-dark space-y-2">
                <li>Open your EBIRR application.</li>
                <li>Send exactly <span className="font-bold text-brand-gold">ETB {orderTotal.toLocaleString()}</span> to the following number:</li>
              </ol>
              <div className="mt-4 bg-brand-light/50 p-4 rounded-md text-center border border-brand-pink/50">
                <span className="text-2xl font-bold text-brand-dark tracking-widest">0992910265</span>
              </div>
            </div>

            <form onSubmit={handleConfirmPayment} className="space-y-6 pt-2">
              <div className="space-y-4">
                <div>
                  <label htmlFor="confirmation" className="block text-sm font-medium text-brand-brown">
                    Confirmation Letter / Transaction ID <span className="text-brand-lightBrown text-xs font-normal">(Optional if screenshot uploaded)</span>
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="confirmation"
                      name="confirmation"
                      value={confirmationCode}
                      onChange={(e) => setConfirmationCode(e.target.value)}
                      className="block w-full border-brand-pink/50 rounded-md shadow-sm focus:ring-brand-gold focus:border-brand-gold sm:text-sm p-3 border bg-white"
                      placeholder="e.g., TXN123456789"
                    />
                  </div>
                  <p className="mt-2 text-xs text-brand-lightBrown">Enter the confirmation code you received after transferring the money.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brand-brown">
                    Upload Screenshot <span className="text-brand-lightBrown text-xs font-normal">(Optional)</span>
                  </label>
                  <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-brand-pink/50 border-dashed rounded-md hover:border-brand-gold hover:bg-brand-pink/5 transition-colors">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-brand-lightBrown"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-brand-brown justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-brand-gold hover:text-brand-brown focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-gold p-1"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileUpload} />
                        </label>
                      </div>
                      <p className="text-xs text-brand-lightBrown">PNG, JPG, GIF up to 5MB</p>
                      {screenshotFileName && (
                        <p className="text-xs text-green-600 font-medium mt-2">Selected: {screenshotFileName}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                 <button
                  type="button"
                  onClick={() => setStep('form')}
                  className="w-full sm:w-1/3 flex justify-center py-3 px-4 border border-brand-pink rounded-md shadow-sm text-sm font-medium text-brand-brown bg-white hover:bg-brand-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={confirmationCode.trim() === '' && screenshotFileName === ''}
                  className="w-full sm:w-2/3 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-brand-light bg-brand-dark hover:bg-brand-brown focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Payment
                </button>
              </div>
            </form>
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

              {!product ? (
                <p className="text-brand-lightBrown">No product selected.</p>
              ) : (
                <ul role="list" className="divide-y divide-brand-pink/30 border-t border-b border-brand-pink/30 mb-6 max-h-96 overflow-y-auto">
                    <li className="flex py-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-md border border-brand-pink/20 overflow-hidden bg-brand-pink/10 flex items-center justify-center">
                        {product.imageSrc ? (
                          <img
                            src={product.imageSrc}
                            alt={product.name}
                            className="w-full h-full object-center object-cover"
                          />
                        ) : (
                          <ImageOff className="h-6 w-6 text-brand-lightBrown opacity-50" />
                        )}
                      </div>
                      <div className="ml-4 flex-1 flex flex-col">
                        <div>
                          <div className="flex justify-between text-sm font-medium text-brand-dark">
                            <h3 className="font-serif">{product.name}</h3>
                            <p className="ml-4 text-brand-gold whitespace-nowrap">ETB {product.price.toLocaleString()}</p>
                          </div>
                          <p className="mt-1 text-sm text-brand-lightBrown">Qty 1</p>
                        </div>
                      </div>
                    </li>
                </ul>
              )}

              <dl className="space-y-4 text-sm text-brand-lightBrown">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd className="font-medium text-brand-dark">ETB {product ? product.price.toLocaleString() : 0}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt>Shipping estimate</dt>
                  <dd className="font-medium text-brand-dark">ETB 150</dd>
                </div>
                <div className="flex items-center justify-between border-t border-brand-pink/50 pt-4">
                  <dt className="text-base font-medium text-brand-dark font-serif">Order Total</dt>
                  <dd className="text-lg font-bold text-brand-gold font-serif">ETB {product ? (product.price + 150).toLocaleString() : 0}</dd>
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
                        <option value="Oromia">Oromia</option>
                        <option value="Amhara">Amhara</option>
                        <option value="Tigray">Tigray</option>
                        <option value="Sidama">Sidama</option>
                        <option value="Somali">Somali</option>
                        <option value="Afar">Afar</option>
                        <option value="Benishangul-Gumuz">Benishangul-Gumuz</option>
                        <option value="Gambela">Gambela</option>
                        <option value="Harar">Harari</option>
                        <option value="Dire Dawa">Dire Dawa</option>
                        <option value="Abama">Abama</option>
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
                  disabled={!product}
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
