import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleInterestCalculator = () => {
  const navigate = useNavigate();
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [interestType, setInterestType] = useState('simple');
  const [result, setResult] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const years = diffDays / 365;
      setTime(years.toFixed(2));
    }
  }, [fromDate, toDate]);

  const calculateInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) return;

    // Rupees-based interest calculation
    // ₹r means ₹r per ₹100 per month
    const monthlyRatePercent = r; // ₹r per ₹100 = r% per month
    const monthlyRate = monthlyRatePercent / 100;
    const totalMonths = t * 12;

    let interest, total;

    if (interestType === 'simple') {
      // Simple Interest: SI = P × r × t
      const monthlyInterest = monthlyRate * p;
      interest = monthlyInterest * totalMonths;
      total = p + interest;
    } else {
      // Compound Interest: A = P(1 + r)^n
      total = p * Math.pow((1 + monthlyRate), totalMonths);
      interest = total - p;
    }

    setResult({
      principal: p,
      interest,
      total,
      rate: r,
      time: t,
      monthlyRatePercent,
      monthlyRate,
      totalMonths,
      type: interestType
    });
  };

  const clearForm = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setInterestType('simple');
    setFromDate('');
    setToDate('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-amber-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-bold text-white">Compound Interest Calculator</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition-colors text-xl"
            >
              ✕ Close
            </button>
          </div>

          <div className="space-y-8 mb-10">
            <div>
              <label className="block text-white text-lg font-semibold mb-4">Principal Amount (₹)</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="Enter principal amount"
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white placeholder-white/50 border-4 border-white/30 focus:outline-none focus:border-white"
              />
            </div>

            <div>
              <label className="block text-white text-lg font-semibold mb-4">Interest Rate (₹ per ₹100 per month)</label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="Example: 2"
                step="0.1"
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white placeholder-white/50 border-4 border-white/30 focus:outline-none focus:border-white"
              />
              <p className="text-white/60 text-lg mt-2">₹2 = ₹2 per ₹100 per month (2% monthly)</p>
            </div>

            <div>
              <label className="block text-white text-lg font-semibold mb-4">Interest Type</label>
              <select
                value={interestType}
                onChange={(e) => setInterestType(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white border-4 border-white/30 focus:outline-none focus:border-white"
              >
                <option value="simple" className="bg-gray-800 text-white">Simple Interest</option>
                <option value="compound" className="bg-gray-800 text-white">Compound Interest</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-white text-lg font-semibold mb-4">Money Given Date</label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white border-4 border-white/30 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-white text-lg font-semibold mb-4">Money Received Date</label>
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white border-4 border-white/30 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-white text-lg font-semibold mb-4">Time Period (years)</label>
              <input
                type="number"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Enter years"
                step="0.1"
                readOnly={fromDate && toDate}
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white placeholder-white/50 border-4 border-white/30 focus:outline-none focus:border-white read-only:bg-white/10"
              />
              {fromDate && toDate && (
                <p className="text-white/60 text-lg mt-2">Calculated from dates</p>
              )}
            </div>

            <div className="flex gap-8">
              <button
                onClick={calculateInterest}
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-6 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                Calculate
              </button>
              <button
                onClick={clearForm}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-6 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                Clear
              </button>
            </div>
          </div>

          {result && (
            <div className="mt-12 bg-white/10 rounded-3xl p-10">
              <h3 className="text-3xl font-bold text-white mb-10 text-center">Calculation Results</h3>
              
              <div className="bg-white rounded-3xl p-10 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Principal</div>
                    <div className="text-4xl font-bold text-gray-800">₹{result.principal.toLocaleString('en-IN')}</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Interest Rate</div>
                    <div className="text-4xl font-bold text-gray-800">₹{result.rate} per ₹100 per month</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Time</div>
                    <div className="text-4xl font-bold text-gray-800">{result.time} years</div>
                  </div>
                  
                  <div>
                    <div className="text-gray-600 text-lg mb-3">Type</div>
                    <div className="text-4xl font-bold text-gray-800 capitalize">{result.type} Interest</div>
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

              <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-10 text-white">
                <div className="text-center">
                  <div className="text-white/80 text-lg mb-4">{result.type === 'simple' ? 'Simple Interest' : 'Compound Interest'}</div>
                  <div className="text-6xl font-bold">₹{result.interest.toLocaleString('en-IN')}</div>
                  <div className="text-white/80 text-lg mt-4">Final Amount: ₹{result.total.toLocaleString('en-IN')}</div>
                  {result.type === 'compound' && (
                    <div className="text-white/80 text-lg mt-2">
                      Formula: A = P(1 + r)^{result.totalMonths}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleInterestCalculator;
