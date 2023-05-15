const buttons = document.querySelectorAll('button')
const topScreen = document.querySelector('.top-screen')
const bottomScreen = document.querySelector('.bottom-screen')

let memory = ''
let operationMemory = ''

window.addEventListener('keydown', function(e) {
    console.log(e.key)
})

buttons.forEach(b => {
    b.addEventListener('click', function(e) {
        eventBus(e.target.textContent)
    })
})

function updateInput(input) {
    bottomScreen.textContent += input
}

function screenShift(input) {
    topScreen.textContent = bottomScreen.textContent
    bottomScreen.textContent = input
}


function eventBus(input) {
    !isNaN(input) ? updateInput(input) : operatorFunctions[input]()
}

const operatorFunctions = {
    
    
    '+': () => (evaluate(topScreen.textContent, bottomScreen.textContent, 'add'), screenShift('+')),


    '-': () => console.log('minus'),
    'x': () => console.log('multiply'),
    '÷': () => console.log('divide'),
    '=': () => console.log('eval'),
    '.': () => bottomScreen.textContent.includes('.') ? false : updateInput('.'),
    'AC': () => console.log('clear'),
    '▶': () => console.log('backspace'),
    '%': () => console.log('percent'),
    '√': () => console.log('sqrt'),
}

function evaluate(x, y, operation) {
    const operations = {
        'add' : () => x + y,
        // subtract:
        // multiply:
        // divide:
        // percentage:
        // sqrt:
    }
    console.log(operations[operation])
} 