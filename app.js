const elements = {
    seconds: ['tens', 'ones'],
    hours: ['tens', 'ones'],
    day: ['tens', 'ones'],
    month: ['tens', 'ones'],
    year: ['thousands', 'hundreds', 'tens', 'ones']
};

let previousValues = {};

function updateDisplay() {
    const now = new Date();
    
    const values = {
        seconds: String(now.getSeconds()).padStart(2, '0'),
        hours: String(now.getHours()).padStart(2, '0'),
        day: String(now.getDate()).padStart(2, '0'),
        month: String(now.getMonth() + 1).padStart(2, '0'),
        year: String(now.getFullYear())
    };

    Object.keys(elements).forEach(unit => {
        const digits = values[unit].split('');
        elements[unit].forEach((position, index) => {
            const element = document.getElementById(`${unit}-${position}`);
            const newValue = digits[index];
            if (element.textContent !== newValue) {
                element.textContent = newValue;
                triggerFlipAnimation(element);
            }
        });
    });
}

function triggerFlipAnimation(element) {
    element.classList.add('flip-animation');
    element.addEventListener('animationend', () => {
        element.classList.remove('flip-animation');
    }, {once: true});
}

// Initial update
updateDisplay();
// Update every second
setInterval(updateDisplay, 1000);
