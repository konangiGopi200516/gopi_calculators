import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DiscountCalculator = () => {
  const navigate = useNavigate();
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [result, setResult] = useState(null);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);

    if (isNaN(price) || isNaN(discount)) return;

    const discountAmount = (price * discount) / 100;
    const finalPrice = price - discountAmount;
    const savingsPercentage = discount;

    setResult({
      originalPrice: price,
      discountPercentage: discount,
      discountAmount,
      finalPrice,
      savingsPercentage
    });
  };

  const clearForm = () => {
    setOriginalPrice('');
    setDiscountPercentage('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-900 to-red-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-bold text-white">Discount Calculator</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition-colors text-xl"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white/10 rounded-2xl p-8">
              <label className="block text-white text-2xl font-bold mb-4">Original Price (₹)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="Enter original price"
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white placeholder-white/50 border-4 border-white/30 focus:outline-none focus:border-white"
              />
            </div>

            <div className="bg-white/10 rounded-2xl p-8">
              <label className="block text-white text-2xl font-bold mb-4">Discount Percentage (%)</label>
              <input
                type="number"
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(e.target.value)}
                placeholder="Enter discount percentage"
                step="0.1"
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white placeholder-white/50 border-4 border-white/30 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div className="flex gap-8 mb-12">
            <button
              onClick={calculateDiscount}
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105"
            >
              Calculate Discount
            </button>
            <button
              onClick={clearForm}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105"
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="bg-white/10 rounded-3xl p-12">
              <h3 className="text-4xl font-bold text-white mb-10 text-center">Discount Details</h3>
              
              <div className="bg-white rounded-3xl p-10 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Original Price</div>
                    <div className="text-5xl font-bold text-gray-800">₹{result.originalPrice.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Discount Percentage</div>
                    <div className="text-5xl font-bold text-pink-600">{result.discountPercentage}%</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-10 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Discount Amount</div>
                    <div className="text-5xl font-bold text-green-600">₹{result.discountAmount.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Final Price</div>
                    <div className="text-5xl font-bold text-blue-600">₹{result.finalPrice.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-10 text-white">
                <div className="text-center">
                  <div className="text-white/80 text-lg mb-4">You Save</div>
                  <div className="text-6xl font-bold">₹{result.discountAmount.toLocaleString('en-IN')}</div>
                  <div className="text-white/80 text-lg mt-4">{result.savingsPercentage}% off</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscountCalculator;
