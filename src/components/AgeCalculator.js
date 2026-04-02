import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AgeCalculator = () => {
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [result, setResult] = useState(null);

  const calculateAge = () => {
    if (!birthDate || !currentDate) return;

    const birth = new Date(birthDate);
    const current = new Date(currentDate);

    if (current < birth) {
      alert('Current date cannot be earlier than birth date');
      return;
    }

    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((current - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds
    });
  };

  const clearForm = () => {
    setBirthDate('');
    setCurrentDate('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-cyan-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-bold text-white">Age Calculator</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition-colors text-xl"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white/10 rounded-2xl p-8">
              <label className="block text-white text-2xl font-bold mb-4">Birth Date</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white border-4 border-white/30 focus:outline-none focus:border-white"
              />
            </div>

            <div className="bg-white/10 rounded-2xl p-8">
              <label className="block text-white text-2xl font-bold mb-4">Current Date</label>
              <input
                type="date"
                value={currentDate}
                onChange={(e) => setCurrentDate(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white border-4 border-white/30 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          <div className="flex gap-8 mb-12">
            <button
              onClick={calculateAge}
              className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105"
            >
              Calculate Age
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
              <h3 className="text-4xl font-bold text-white mb-10 text-center">Your Age</h3>
              
              <div className="bg-white rounded-3xl p-10 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-green-600 mb-2">{result.years}</div>
                    <div className="text-xl text-gray-600">Years</div>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-blue-600 mb-2">{result.months}</div>
                    <div className="text-xl text-gray-600">Months</div>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-purple-600 mb-2">{result.days}</div>
                    <div className="text-xl text-gray-600">Days</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-10">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">Total Time</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">{result.totalWeeks}</div>
                    <div className="text-lg text-gray-600">Weeks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600 mb-2">{result.totalDays}</div>
                    <div className="text-lg text-gray-600">Days</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">{result.totalHours.toLocaleString()}</div>
                    <div className="text-lg text-gray-600">Hours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-pink-600 mb-2">{result.totalMinutes.toLocaleString()}</div>
                    <div className="text-lg text-gray-600">Minutes</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgeCalculator;
