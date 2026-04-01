import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AgeCalculator = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [birthDate, setBirthDate] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [result, setResult] = useState(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

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
            <h2 className="text-5xl font-bold text-white">{t('ageCalculator.title')}</h2>
            <div className="flex items-center gap-4">
              <div className="flex bg-white/20 rounded-lg p-2">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-4 py-2 rounded ${i18n.language === 'en' ? 'bg-white text-green-800' : 'text-white hover:bg-white/10'} transition-colors text-lg font-medium`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('hi')}
                  className={`px-4 py-2 rounded ${i18n.language === 'hi' ? 'bg-white text-green-800' : 'text-white hover:bg-white/10'} transition-colors text-lg font-medium`}
                >
                  हिं
                </button>
                <button
                  onClick={() => changeLanguage('te')}
                  className={`px-4 py-2 rounded ${i18n.language === 'te' ? 'bg-white text-green-800' : 'text-white hover:bg-white/10'} transition-colors text-lg font-medium`}
                >
                  తె
                </button>
              </div>
              <button
                onClick={() => navigate('/')}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition-colors text-xl"
              >
                ✕ {t('ageCalculator.close')}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white/10 rounded-2xl p-8">
              <label className="block text-white text-2xl font-bold mb-4">{t('ageCalculator.birthDate')}</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full px-6 py-4 rounded-xl text-2xl bg-white/20 text-white border-4 border-white/30 focus:outline-none focus:border-white"
              />
            </div>

            <div className="bg-white/10 rounded-2xl p-8">
              <label className="block text-white text-2xl font-bold mb-4">{t('ageCalculator.currentDate')}</label>
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
              {t('ageCalculator.calculateAge')}
            </button>
            <button
              onClick={clearForm}
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105"
            >
              {t('ageCalculator.clear')}
            </button>
          </div>

          {result && (
            <div className="bg-white/10 rounded-3xl p-12">
              <h3 className="text-4xl font-bold text-white mb-10 text-center">{t('ageCalculator.yourAge')}</h3>
              
              <div className="bg-white rounded-3xl p-10 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-green-600 mb-2">{result.years}</div>
                    <div className="text-xl text-gray-600">{t('ageCalculator.years')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-blue-600 mb-2">{result.months}</div>
                    <div className="text-xl text-gray-600">{t('ageCalculator.months')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-purple-600 mb-2">{result.days}</div>
                    <div className="text-xl text-gray-600">{t('ageCalculator.days')}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-10">
                <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t('ageCalculator.totalTime')}</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">{result.totalWeeks}</div>
                    <div className="text-lg text-gray-600">{t('ageCalculator.weeks')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-red-600 mb-2">{result.totalDays}</div>
                    <div className="text-lg text-gray-600">{t('ageCalculator.days')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-indigo-600 mb-2">{result.totalHours.toLocaleString()}</div>
                    <div className="text-lg text-gray-600">{t('ageCalculator.hours')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-pink-600 mb-2">{result.totalMinutes.toLocaleString()}</div>
                    <div className="text-lg text-gray-600">{t('ageCalculator.minutes')}</div>
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
