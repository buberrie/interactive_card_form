"use strict";
const form = document.getElementById('form');
const successful = document.querySelector('.added');
const inputName = document.getElementById('input-name');
const inputCardNum = document.getElementById('input-number');
const inputExpMonth = document.getElementById('month');
const inputExpYear = document.getElementById('year');
const inputCvc = document.getElementById('cvc');
const button = document.getElementById('btn');
inputName.addEventListener('keyup', copyName);
inputCardNum.addEventListener('keyup', copyCardNum);
inputExpMonth.addEventListener('keyup', copyMonth);
inputExpYear.addEventListener('keyup', copyYear);
inputCvc.addEventListener('keyup', copyCvc);
function copyCardNum(e) {
    let cardNum = document.getElementById('card-num');
    if (inputCardNum.value.length === 0) {
        cardNum.textContent = '0000 0000 0000 0000';
    }
    else {
        cardNum.textContent = inputCardNum.value;
    }
}
inputCardNum.addEventListener('keydown', function (e) {
    let val = e.target.value, len = val.length, lst = val[len - 1], key = e.key;
    e.target.value =
        key === 'Backspace'
            ? val
            : len === 4 || len === 9 || len === 14
                ? val + '\xa0'
                : val;
});
function copyName() {
    let name = document.getElementById('name');
    if (inputName.value.length === 0) {
        name.textContent = '-- --';
    }
    else {
        name.textContent = inputName.value;
    }
}
function copyMonth(e) {
    let val = e.target.value;
    if (val.length === 1) {
        val = '0' + val;
    }
    else {
        val = val;
    }
    let expMonth = document.getElementById('expMonth');
    if (val.length === 0) {
        expMonth.textContent = '--';
    }
    else {
        expMonth.textContent = val;
    }
}
function copyYear(e) {
    let val = e.target.value;
    if (val.length === 1) {
        val = '0' + val;
    }
    else {
        val = val;
    }
    let expYear = document.getElementById('expYear');
    if (val.length === 0) {
        expYear.textContent = '--';
    }
    else {
        expYear.textContent = val;
    }
}
function copyCvc(e) {
    let cvcDesktop = document.getElementById('cvc-desktop');
    let cvcMobile = document.getElementById('cvc-mobile');
    if (inputCvc.value.length === 0) {
        cvcDesktop.textContent = '000';
        cvcMobile.textContent = '000';
    }
    else {
        cvcDesktop.textContent = inputCvc.value;
        cvcMobile.textContent = inputCvc.value;
    }
}
const isRequired = (value) => value === '' ? false : true;
const validLength = (length, min) => length < min ? false : true;
const validNum = (input) => (/^([0-9\s])+$/.test(input));
const showError = (input, message) => {
    const inputField = input === null || input === void 0 ? void 0 : input.parentElement;
    const error = inputField.querySelector('small');
    if (error) {
        error.textContent = message;
    }
    const borderError = inputField.querySelector('input');
    if (borderError) {
        borderError.classList.add('error');
    }
};
const showSuccess = (input) => {
    const inputField = input === null || input === void 0 ? void 0 : input.parentElement;
    const error = inputField.querySelector('small');
    if (error) {
        error.textContent = '';
    }
    const borderError = inputField.querySelector('input');
    if (borderError) {
        borderError.classList.remove('error');
    }
};
const checkName = () => {
    let valid = false;
    const name = inputName.value.trim();
    if (!isRequired(name)) {
        showError(inputName, "Cardholder's name cannot be blank.");
    }
    else {
        showSuccess(inputName);
        valid = true;
    }
    return valid;
};
const checkCardNum = () => {
    let valid = false;
    const min = 19;
    const cardNum = inputCardNum.value.trim();
    console.log(cardNum);
    let length = cardNum.length + 3;
    if (!isRequired(cardNum)) {
        showError(inputCardNum, 'Card number cannot be blank.');
    }
    else if (!validNum(cardNum)) {
        showError(inputCardNum, 'Invalid format, Numbers only');
    }
    else if (!validLength(length, min)) {
        showError(inputCardNum, `Card number must be 16 characters.`);
    }
    else {
        showSuccess(inputCardNum);
        valid = true;
    }
    return valid;
};
const checkCvc = () => {
    let valid = false;
    const min = 3;
    const cvc = inputCvc.value.trim();
    if (!isRequired(cvc)) {
        showError(inputCvc, "CVC can't be blank.");
    }
    else if (!validNum(cvc)) {
        showError(inputCvc, 'Invalid format, Numbers only');
    }
    else if (!validLength(cvc.length, min)) {
        showError(inputCvc, `CVC must be ${min} characters.`);
    }
    else {
        showSuccess(inputCvc);
        valid = true;
    }
    return valid;
};
const checkExpMonth = () => {
    let valid = false;
    const expMonthStr = inputExpMonth.value.trim();
    if (!isRequired(expMonthStr)) {
        showError(inputExpMonth, "Month can't be blank.");
    }
    else if (!validNum(expMonthStr)) {
        showError(inputExpMonth, 'Invalid format, Numbers only');
    }
    else {
        const expMonth = parseInt(expMonthStr, 10);
        if (expMonth > 12) {
            showError(inputExpMonth, 'Not a valid month number');
        }
        else {
            showSuccess(inputExpMonth);
            valid = true;
        }
    }
    return valid;
};
const checkExpYear = () => {
    let valid = false;
    const expYear = inputExpYear.value.trim();
    if (!isRequired(expYear)) {
        showError(inputExpYear, "Year can't be blank.");
    }
    else if (!validNum(expYear)) {
        showError(inputExpYear, 'Invalid format, Numbers only');
    }
    else {
        showSuccess(inputExpYear);
        valid = true;
    }
    return valid;
};
button.addEventListener('click', () => {
    const isNameValid = checkName();
    const isNumValid = checkCardNum();
    const isMonthValid = checkExpMonth();
    const isYearValid = checkExpYear();
    const isCvcValid = checkCvc();
    const isValid = isNameValid && isNumValid && isMonthValid && isYearValid && isCvcValid;
    if (!isValid) {
    }
    else if (button.textContent && button.textContent.includes('Confirm')) {
        button.textContent = 'Continue';
        form.classList.add('successful');
        successful.classList.add('successful');
    }
    else {
        window.location.reload();
    }
});
//# sourceMappingURL=script.js.map