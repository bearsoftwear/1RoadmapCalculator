import { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';
import { cn } from '@/lib/utils';

function App() {
  const [count, setCount] = useState(0);
  const [display, setDisplay] = useState('0');
  const [firstDigit, setFirstDigit] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const displayValue = Number.parseFloat(display);

    setWaitingForSecondOperand(true);
    if (firstDigit === null) {
      setFirstDigit(displayValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstDigit(result);
    }
    setOperator(nextOperator);
  };

  const handleEquals = () => {
    if (operator === null || firstDigit === null) return;
    const result = performCalculation();
    setDisplay(String(result));
    setOperator(null);
    setFirstDigit(null);
    setWaitingForSecondOperand(false);
  };

  const clearDisplay = () => {
    setDisplay('0');
    setOperator(null);
    setFirstDigit(null);
    setWaitingForSecondOperand(false);
  };

  const performCalculation = () => {
    const secondDigit = Number.parseFloat(display);
    let result = 0;

    if (firstDigit === null || operator === null)
      return Number.parseFloat(display);

    switch (operator) {
      case '+':
        result = firstDigit + secondDigit;
        break;
      case '-':
        result = firstDigit - secondDigit;
        break;
      case '*':
        result = firstDigit * secondDigit;
        break;
      case '/':
        result = firstDigit / secondDigit;
        break;
      default:
        return secondDigit;
    }

    return result;
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const toggleSign = () => {
    const currentValue = Number.parseFloat(display);
    setDisplay(String(-1 * currentValue));
  };

  const handlePercentage = () => {
    const currentValue = Number.parseFloat(display);
    const percentValue = currentValue / 100;
    setDisplay(String(percentValue));
  };
  return (
    <>
      <h1>Calculator</h1>
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-gray-100 dark:bg-gray-700">
          <div className="text-right text-3xl font-mono h-12 flex items-center justify-end overflow-hidden">
            <span className="truncate">{display}</span>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-1 p-2">
          <Button
            onClick={clearDisplay}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            AC
          </Button>
          <Button
            onClick={toggleSign}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            +/-
          </Button>
          <Button
            onClick={handlePercentage}
            className="bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            %
          </Button>
          <Button
            onClick={() => handleOperator('/')}
            style={{
              backgroundColor:
                operator === '/' && waitingForSecondOperand
                  ? 'brown'
                  : '#f59e42',
              color: 'white',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            ÷
          </Button>

          <Button onClick={() => inputDigit('7')}>7</Button>
          <Button onClick={() => inputDigit('8')}>8</Button>
          <Button onClick={() => inputDigit('9')}>9</Button>
          <Button
            onClick={() => handleOperator('*')}
            style={{
              backgroundColor:
                operator === '*' && waitingForSecondOperand
                  ? 'brown'
                  : '#f59e42',
              color: 'white',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            ×
          </Button>

          <Button onClick={() => inputDigit('4')}>4</Button>
          <Button onClick={() => inputDigit('5')}>5</Button>
          <Button onClick={() => inputDigit('6')}>6</Button>
          <Button
            onClick={() => handleOperator('-')}
            style={{
              backgroundColor:
                operator === '-' && waitingForSecondOperand
                  ? 'brown'
                  : '#f59e42',
              color: 'white',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            -
          </Button>

          <Button onClick={() => inputDigit('1')}>1</Button>
          <Button onClick={() => inputDigit('2')}>2</Button>
          <Button onClick={() => inputDigit('3')}>3</Button>
          <Button
            onClick={() => handleOperator('+')}
            style={{
              backgroundColor:
                operator === '+' && waitingForSecondOperand
                  ? 'brown'
                  : '#f59e42',
              color: 'white',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            +
          </Button>

          <Button onClick={() => inputDigit('0')} className="col-span-2">
            0
          </Button>
          <Button onClick={inputDecimal}>.</Button>
          <Button
            onClick={handleEquals}
            style={{
              backgroundColor: '#f59e42',
              color: 'white',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            =
          </Button>
        </div>
      </div>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
      </div>
    </>
  );
}

export default App;
