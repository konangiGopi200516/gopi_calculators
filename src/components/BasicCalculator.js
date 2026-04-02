import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BasicCalculator = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

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

  const calculateResult = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-5xl font-bold text-white">Basic Calculator</h2>
            <button
              onClick={() => navigate('/')}
              className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-xl transition-colors text-xl"
            >
              ✕ Close
            </button>
          </div>

          <div className="bg-black/50 rounded-3xl p-8 max-w-md mx-auto">
            <div className="bg-gray-900 text-white text-6xl font-bold text-right p-6 rounded-2xl mb-6 min-h-[80px] flex items-center justify-end">
              {display}
            </div>

            <div className="grid grid-cols-4 gap-4">
              <button
                onClick={clear}
                className="col-span-2 bg-red-600 hover:bg-red-700 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => performOperation('/')}
                className="bg-orange-600 hover:bg-orange-700 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                ÷
              </button>
              <button
                onClick={() => performOperation('*')}
                className="bg-orange-600 hover:bg-orange-700 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                ×
              </button>

              <button
                onClick={() => inputNumber(7)}
                className="bg-gray-700 hover:bg-gray-800 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                7
              </button>
              <button
                onClick={() => inputNumber(8)}
                className="bg-gray-700 hover:bg-gray-800 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                8
              </button>
              <button
                onClick={() => inputNumber(9)}
                className="bg-gray-700 hover:bg-gray-800 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                9
              </button>
              <button
                onClick={() => performOperation('-')}
                className="bg-orange-600 hover:bg-orange-700 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                −
              </button>

              <button
                onClick={() => inputNumber(4)}
                className="bg-gray-700 hover:bg-gray-800 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                4
              </button>
              <button
                onClick={() => inputNumber(5)}
                className="bg-gray-700 hover:bg-gray-800 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                5
              </button>
              <button
                onClick={() => inputNumber(6)}
                className="bg-gray-700 hover:bg-gray-800 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                6
              </button>
              <button
                onClick={() => performOperation('+')}
                className="bg-orange-600 hover:bg-orange-700 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                +
              </button>

              <button
                onClick={() => inputNumber(1)}
                className="bg-gray-700 hover:bg-gray-800 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                1
              </button>
              <button
                onClick={() => inputNumber(2)}
                className="bg-gray-700 hover:bg-gray-800 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                2
              </button>
              <button
                onClick={() => inputNumber(3)}
                className="bg-gray-700 hover:bg-gray-800 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                3
              </button>
              <button
                onClick={calculateResult}
                className="row-span-2 bg-green-600 hover:bg-green-700 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                =
              </button>

              <button
                onClick={() => inputNumber(0)}
                className="col-span-2 bg-gray-700 hover:bg-gray-800 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
              >
                0
              </button>
              <button
                onClick={inputDecimal}
                className="bg-gray-700 hover:bg-gray-800 text-white text-3xl font-bold py-6 rounded-2xl transition-colors"
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
