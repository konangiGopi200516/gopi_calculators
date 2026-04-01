import React, { useState, useEffect, useCallback } from 'react';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [history, setHistory] = useState('');

  const inputNumber = useCallback((num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  }, [display, waitingForNewValue]);

  const inputDecimal = useCallback(() => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  }, [display, waitingForNewValue]);

  const clear = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
    setHistory('');
  }, []);

  const deleteLastDigit = useCallback(() => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  }, [display]);

  const performOperation = useCallback((nextOperation) => {
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
    
    if (nextOperation) {
      setHistory(`${previousValue || inputValue} ${nextOperation}`);
    }
  }, [display, operation, previousValue]);

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const handleKeyPress = useCallback((event) => {
    const { key } = event;
    
    if (key >= '0' && key <= '9') {
      inputNumber(parseInt(key));
    } else if (key === '.') {
      inputDecimal();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
      clear();
    } else if (key === 'Backspace') {
      deleteLastDigit();
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      const op = key === '*' ? '×' : key === '/' ? '÷' : key;
      performOperation(op);
    } else if (key === 'Enter' || key === '=') {
      performOperation('=');
    }
  }, [inputNumber, inputDecimal, clear, deleteLastDigit, performOperation]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  const Button = ({ onClick, className = '', children, ...props }) => (
    <button
      onClick={onClick}
      className={`calculator-button ${className}`}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-calculator-bg rounded-3xl shadow-2xl p-6 w-full max-w-md">
        <div className="mb-4">
          {history && (
            <div className="text-gray-400 text-right text-sm mb-2 font-mono">
              {history}
            </div>
          )}
          <div className="calculator-screen min-h-[80px] flex items-center justify-end">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <Button
            onClick={clear}
            className="bg-button-function text-white hover:bg-gray-600 col-span-2"
          >
            Clear
          </Button>
          <Button
            onClick={deleteLastDigit}
            className="bg-button-function text-white hover:bg-gray-600"
          >
            ⌫
          </Button>
          <Button
            onClick={() => performOperation('÷')}
            className="bg-button-secondary text-white hover:bg-orange-600"
          >
            ÷
          </Button>
          
          <Button
            onClick={() => inputNumber(7)}
            className="bg-button-primary text-white hover:bg-gray-700"
          >
            7
          </Button>
          <Button
            onClick={() => inputNumber(8)}
            className="bg-button-primary text-white hover:bg-gray-700"
          >
            8
          </Button>
          <Button
            onClick={() => inputNumber(9)}
            className="bg-button-primary text-white hover:bg-gray-700"
          >
            9
          </Button>
          <Button
            onClick={() => performOperation('×')}
            className="bg-button-secondary text-white hover:bg-orange-600"
          >
            ×
          </Button>
          
          <Button
            onClick={() => inputNumber(4)}
            className="bg-button-primary text-white hover:bg-gray-700"
          >
            4
          </Button>
          <Button
            onClick={() => inputNumber(5)}
            className="bg-button-primary text-white hover:bg-gray-700"
          >
            5
          </Button>
          <Button
            onClick={() => inputNumber(6)}
            className="bg-button-primary text-white hover:bg-gray-700"
          >
            6
          </Button>
          <Button
            onClick={() => performOperation('-')}
            className="bg-button-secondary text-white hover:bg-orange-600"
          >
            −
          </Button>
          
          <Button
            onClick={() => inputNumber(1)}
            className="bg-button-primary text-white hover:bg-gray-700"
          >
            1
          </Button>
          <Button
            onClick={() => inputNumber(2)}
            className="bg-button-primary text-white hover:bg-gray-700"
          >
            2
          </Button>
          <Button
            onClick={() => inputNumber(3)}
            className="bg-button-primary text-white hover:bg-gray-700"
          >
            3
          </Button>
          <Button
            onClick={() => performOperation('+')}
            className="bg-button-secondary text-white hover:bg-orange-600"
          >
            +
          </Button>
          
          <Button
            onClick={() => inputNumber(0)}
            className="bg-button-primary text-white hover:bg-gray-700 col-span-2"
          >
            0
          </Button>
          <Button
            onClick={inputDecimal}
            className="bg-button-primary text-white hover:bg-gray-700"
          >
            .
          </Button>
          <Button
            onClick={() => performOperation('=')}
            className="bg-button-secondary text-white hover:bg-orange-600"
          >
            =
          </Button>
        </div>
        
        <div className="mt-4 text-center text-gray-400 text-xs">
          Press keyboard keys for quick input
        </div>
      </div>
    </div>
  );
};

export default Calculator;
