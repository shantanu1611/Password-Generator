const passwordDisplay = document.querySelector('[data-display]')
const copyBtn = document.querySelector('[copyBtn]');
const copyMsg = document.querySelector('[data-copymsg]');
const dataLenghtSlider = document.querySelector('[data-legthSlider]');
const lengthNumber = document.querySelector('[dataLengthNumber]');
const uppercase = document.querySelector('#uppercase');
const lowercase = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');
const strengthIndicator = document.querySelector('[data-indicator]');
const generateBtn = document.querySelector('.generate-btn');
const allCheckBox = document.querySelectorAll('input[type=checkbox]');

const symbolString = '~`!@#$%^&*()_+-="<,>.?/{]{]';


let password = "";
let passwordLength = 10;
let checkCount = 0;
handleSlider();
setIndicator(`#ccc`);

function handleSlider() {
    dataLenghtSlider.value = passwordLength;
    lengthNumber.innerText = passwordLength;

    const min = dataLenghtSlider.min;
    const max = dataLenghtSlider.max;

    dataLenghtSlider.style.backgroundSize = ((passwordLength - min) * 100 / (max - min)) + "% 100%";
}

function setIndicator(color) {
    strengthIndicator.style.backgroundColor = color;
    strengthIndicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRndNumber() {
    return getRndInteger(0, 9);
}

function getLowerCase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function getUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
    return symbolString.charAt(getRndInteger(0, symbolString.length));
}

function checkStrengh() {
    let hasUp = false;
    let hasLo = false;
    let hasNum = false;
    let hasSym = false;


    if (uppercase.checked) hasUp = true;
    if (lowercase.checked) hasLo = true;
    if (numbers.checked) hasNum = true;
    if (symbols.checked) hasSym = true;

    if (hasUp && hasLo && hasNum && hasLo && password.length >= 8) {
        setIndicator('#f00');
    } else if ((hasUp || hasLo) && (hasNum || hasSym) && password.length <= 6) {
        setIndicator('#ff0');
    } else {
        setIndicator("#0f0");
    }
}


async function clipCopy() {
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "Coppied";
    }

    catch (e) {
        copyMsg.innerText = 'Failed';
    }


    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove('active');
    }, 2000);
}

function handleChekboxChange() {
    checkCount = 0;
    allCheckBox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkCount++;
        }
    });

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }
}


allCheckBox.forEach((chekcbox) => {
    chekcbox.addEventListener('change', handleChekboxChange);
})


dataLenghtSlider.addEventListener('input', function (e) {
    passwordLength = e.target.value;
    handleSlider();
})


copyBtn.addEventListener('click', () => {
    if (passwordDisplay.value) {
        clipCopy();
    }
})


generateBtn.addEventListener('click', () => {
    if (checkCount <= 0) return;

    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    funcArr = [];


    if (uppercase.checked) {
        funcArr.push(getUpperCase);
    }
    if (lowercase.checked) {
        funcArr.push(getLowerCase)
    }
    if (numbers.checked) {
        funcArr.push(getRndNumber);
    }
    if (symbols.checked) {
        funcArr.push(generateSymbol);
    }


    for (let i = 0; i < funcArr.length; i++) {
        password += funcArr[i]();
    }


    for (let i = 0; i < (passwordLength - funcArr.length); i++) {
        let rndIdx = getRndInteger(0, funcArr.length);
        console.log(rndIdx);
        password += funcArr[rndIdx]();
    }


    // password = shufflePassword();


    passwordDisplay.value = password;


    checkStrengh();


})