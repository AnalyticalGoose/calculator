const buttons = document.querySelectorAll('button')
const topScreen = document.querySelector('.top-screen')
const bottomScreen = document.querySelector('.bottom-screen')

let totalValue = '0'
let screenValue = ''
let operatorMemory = '+'
let tempMemory = ''

window.addEventListener('keydown', function(e) {
    const key = document.querySelector(`button[data-key="${e.key}"`)
    !key ? false : eventBus(key.innerText)
})

buttons.forEach(b => {
    b.addEventListener('click', function(e) {
        eventBus(e.target.textContent)
    })
})

function updateInput(input) {
    screenValue += input
    bottomScreen.textContent = screenValue
}

function updateTotal(calc) {
    totalValue = calc
    topScreen.textContent = totalValue
}

function updateScreenOperator() {
    operatorMemory = tempMemory
    bottomScreen.textContent = operatorMemory
    screenValue = ""
}

function eventBus(input) {
    !isNaN(input) ? updateInput(input) : operatorBus(input)
}

function operatorBus(input) {
    ['+', '-', 'x', '÷'].includes(input) ? (tempMemory = input, operatorFunctions[operatorMemory]()) : otherFunctions[input]()
}

const otherFunctions = {
    '=': () => displayEvaluation(operations[operatorMemory](totalValue, screenValue)),
    '%': () => displayEvaluation(operations['x']((parseFloat(screenValue)/100), totalValue)),
    'AC': () => displayEvaluation(""),
    '▶': () => (screenValue = screenValue.slice(-0, -1), bottomScreen.textContent = screenValue),
    '.': () => bottomScreen.textContent.includes('.') ? false : updateInput('.'),
    '√': () => bottomScreen.textContent.includes('√') ? false : (updateInput('√'), operatorMemory = '√'),
}

function displayEvaluation(input) {
    totalValue = "0"
    operatorMemory = "+"
    screenValue = input
    bottomScreen.textContent = screenValue
    topScreen.textContent = ""
}

const operatorFunctions = {
    '+': () => {
        updateTotal(operations['+'](totalValue, screenValue))
        updateScreenOperator()
    },
    '-': () => {
        updateTotal(operations['-'](totalValue, screenValue))
        updateScreenOperator()
    },
    'x': () => {
        updateTotal(operations['x'](totalValue, screenValue))
        updateScreenOperator()
    },
    '÷': () => {
        updateTotal(operations['÷'](totalValue, screenValue))
        updateScreenOperator()
    }
}

const operations = {
    '+': (x, y) => {return parseFloat((parseFloat(x) + parseFloat(y)).toFixed(3))},
    '-': (x, y) => {return parseFloat((parseFloat(x) - parseFloat(y)).toFixed(3))},
    'x': (x, y) => {return parseFloat((parseFloat(x) * parseFloat(y)).toFixed(3))},
    '÷': (x, y) => {return parseFloat((parseFloat(x) / parseFloat(y)).toFixed(3))},
    '√': (x, y) => {return parseFloat(Math.sqrt(y.slice(1)).toFixed(3))}
}