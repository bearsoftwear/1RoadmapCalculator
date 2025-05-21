import {useState} from 'react'
import './App.css'
import {Button} from './components/ui/button'
import {cn} from "@/lib/utils"

function App() {
    const [count, setCount] = useState(0)
    const [display, setDisplay] = useState("0")
    const [firstOperand, setFirstOperand] = useState<number | null>(null)
    const [operator, setOperator] = useState<string | null>(null)
    const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

    const inputDigit = (digit: string) => {
        setDisplay(digit === "0" ? digit : display + digit)
    }

    const handleOperator = (operator: string) => {
        const inputValue = Number.parseFloat(display)
        if (operator) {
            const result = performCalculation()
        }
    }

    const handleEquals = () => {
        alert(display, operator)
    }

    const clearDisplay = () => {
        setDisplay("0")
        setOperator(null)
        setFirstOperand(null)
        setWaitingForSecondOperand(false)
    }

    const performCalculation = () => {
        if (operator)
            alert(operator)
    }

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
                    <Button onClick={() => inputDigit("7")}>
                        7
                    </Button>
                    <Button onClick={() => inputDigit("8")}>
                        8
                    </Button>
                    <Button onClick={() => inputDigit("9")}>
                        9
                    </Button>

                    <Button
                        onClick={() => handleOperator("+")}
                        className={cn(
                            "bg-amber-500 hover:bg-amber-600 text-white",
                            operator === "+" && waitingForSecondOperand && "bg-white dark:bg-gray-300 text-amber-500",
                        )}
                    >
                        +
                    </Button>
                    <Button variant="outline" onClick={handleEquals} className="bg-amber-500 hover:bg-amber-600 text-white">
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
    )
}

export default App
