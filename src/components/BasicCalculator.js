import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BasicCalculator = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation !== null) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-bold text-white">{t('basicCalculator.title')}</h2>
            <div className="flex items-center gap-4">
              <div className="flex bg-white/20 rounded-lg p-2">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-4 py-2 rounded ${i18n.language === 'en' ? 'bg-white text-purple-800' : 'text-white hover:bg-white/10'} transition-colors text-lg font-medium`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('hi')}
                  className={`px-4 py-2 rounded ${i18n.language === 'hi' ? 'bg-white text-purple-800' : 'text-white hover:bg-white/10'} transition-colors text-lg font-medium`}
                >
                  हिं
                </button>
                <button
                  onClick={() => changeLanguage('te')}
                  className={`px-4 py-2 rounded ${i18n.language === 'te' ? 'bg-white text-purple-800' : 'text-white hover:bg-white/10'} transition-colors text-lg font-medium`}
                >
                  తె
                </button>
              </div>
              <button
                onClick={() => navigate('/')}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition-colors text-xl"
              >
                ✕ {t('basicCalculator.close')}
              </button>
            </div>
          </div>

          <div className="bg-black/50 rounded-3xl p-8 shadow-2xl">
            <div className="bg-gray-900 rounded-2xl p-6 mb-6 text-right">
              <div className="text-5xl font-bold text-white min-h-20 flex items-center justify-end">
                {display}
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={clear}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-8 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                C
              </button>
              <button
                onClick={() => performOperation('/')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105"
              >
                ÷
              </button>
              <button
                onClick={() => performOperation('*')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105"
              >
                ×
              </button>
              <button
                onClick={() => performOperation('-')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105"
              >
                −
              </button>
              
              <button
                onClick={() => inputNumber(7)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-8 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                7
              </button>
              <button
                onClick={() => inputNumber(8)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-8 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                8
              </button>
              <button
                onClick={() => inputNumber(9)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-8 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                9
              </button>
              <button
                onClick={() => performOperation('+')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105 row-span-2"
              >
                +
              </button>
              
              <button
                onClick={() => inputNumber(4)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-8 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                4
              </button>
              <button
                onClick={() => inputNumber(5)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-8 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                5
              </button>
              <button
                onClick={() => inputNumber(6)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-8 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                6
              </button>
              
              <button
                onClick={() => inputNumber(1)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-8 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                1
              </button>
              <button
                onClick={() => inputNumber(2)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-8 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                2
              </button>
              <button
                onClick={() => inputNumber(3)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-8 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                3
              </button>
              <button
                onClick={performCalculation}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-8 rounded-2xl text-4xl transition-all transform hover:scale-105 row-span-2"
              >
                =
              </button>
              
              <button
                onClick={() => inputNumber(0)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-8 rounded-2xl text-3xl transition-all transform hover:scale-105 col-span-2"
              >
                0
              </button>
              <button
                onClick={inputDecimal}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-8 rounded-2xl text-3xl transition-all transform hover:scale-105"
              >
                .
              </button>
            </div>
          </div>
          <div className="mt-4 text-center text-gray-300 text-xs">
            Press keyboard keys for quick input
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicCalculator;
