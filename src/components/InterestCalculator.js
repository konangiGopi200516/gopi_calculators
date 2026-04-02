import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InterestCalculator = () => {
  const navigate = useNavigate();
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const years = diffDays / 365;
      setTime(years.toFixed(2));
    }
  }, [startDate, endDate]);

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) return;

    // Rupees-based interest calculation
    // ₹r means ₹r per ₹100 per month
    const monthlyRatePercent = r; // ₹r per ₹100 = r% per month
    const monthlyInterest = (monthlyRatePercent / 100) * p;
    const totalMonths = t * 12;
    const totalInterest = monthlyInterest * totalMonths;
    const total = p + totalInterest;

    setResult({
      principal: p,
      interest: totalInterest,
      total,
      rate: r,
      time: t,
      monthlyInterest,
      monthlyRatePercent
    });
  };

  const clearForm = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setStartDate('');
    setEndDate('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-bold text-white">Interest Calculator</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition-colors text-xl"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
            <div className="bg-white/10 rounded-2xl p-8">
              <label className="block text-white text-lg font-semibold mb-4">Principal Amount (₹)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter principal amount"
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white placeholder-white/50 border-4 border-white/30 focus:outline-none focus:border-white"
              />
            </div>

            <div className="bg-white/10 rounded-2xl p-8">
              <label className="block text-white text-lg font-semibold mb-4">Interest Rate (₹ per ₹100 per month)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Example: 2"
                step="0.1"
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white placeholder-white/50 border-4 border-white/30 focus:outline-none focus:border-white"
              />
              <p className="text-white/60 text-sm mt-2">₹2 = ₹2 per ₹100 per month</p>
            </div>

            <div className="bg-white/10 rounded-2xl p-8">
              <label className="block text-white text-lg font-semibold mb-4">Money Given Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white border-4 border-white/30 focus:outline-none focus:border-white"
              />
            </div>

            <div className="bg-white/10 rounded-2xl p-8">
              <label className="block text-white text-lg font-semibold mb-4">Money Received Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white border-4 border-white/30 focus:outline-none focus:border-white"
              />
            </div>

            <div className="bg-white/10 rounded-2xl p-8">
              <label className="block text-white text-lg font-semibold mb-4">Time Period (years)</label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Enter years"
                step="0.1"
                readOnly={startDate && endDate}
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white placeholder-white/50 border-4 border-white/30 focus:outline-none focus:border-white read-only:bg-white/10"
              />
              {startDate && endDate && (
                <p className="text-white/60 text-sm mt-2">Calculated from dates</p>
              )}
            </div>
          </div>

          <div className="flex gap-8 mb-12">
            <button
              onClick={calculateInterest}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-6 rounded-2xl text-3xl transition-all transform hover:scale-105"
            >
              Calculate Interest
            </button>
            <button
              onClick={clearForm}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-6 rounded-2xl text-3xl transition-all transform hover:scale-105"
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="bg-white/10 rounded-3xl p-10">
              <h3 className="text-3xl font-bold text-white mb-10 text-center">Interest Calculation Results</h3>
              
              <div className="bg-white rounded-3xl p-10 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Principal Amount</div>
                    <div className="text-4xl font-bold text-gray-800">₹{result.principal.toLocaleString('en-IN')}</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Interest Rate</div>
                    <div className="text-4xl font-bold text-gray-800">₹{result.rate} per ₹100 per month</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Time Period</div>
                    <div className="text-4xl font-bold text-gray-800">{result.time} years</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Monthly Interest</div>
                    <div className="text-4xl font-bold text-green-600">₹{result.monthlyInterest.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-10 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Total Interest</div>
                    <div className="text-4xl font-bold text-green-600">₹{result.interest.toLocaleString('en-IN')}</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Final Amount</div>
                    <div className="text-4xl font-bold text-blue-600">₹{result.total.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-3xl p-10 text-white">
                <div className="text-center">
                  <div className="text-white/80 text-lg mb-4">Simple Interest</div>
                  <div className="text-6xl font-bold">₹{result.interest.toLocaleString('en-IN')}</div>
                  <div className="text-white/80 text-lg mt-4">Final Amount: ₹{result.total.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterestCalculator;
