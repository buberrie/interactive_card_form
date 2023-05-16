// Get the input areas
const form = document.getElementById('form') as HTMLFormElement;
const successful = document.querySelector('.added') as HTMLDivElement;
const inputName = document.getElementById('input-name') as HTMLInputElement;
const inputCardNum = document.getElementById('input-number') as HTMLInputElement;
const inputExpMonth = document.getElementById('month') as HTMLInputElement;
const inputExpYear = document.getElementById('year') as HTMLInputElement;
const inputCvc = document.getElementById('cvc') as HTMLInputElement;
const button = document.getElementById('btn') as HTMLButtonElement;

// Print out text input of each input area of the form into the card
// Eventlistener for each area
inputName.addEventListener('keyup', copyName);
inputCardNum.addEventListener('keyup', copyCardNum);
inputExpMonth.addEventListener('keyup', copyMonth);
inputExpYear.addEventListener('keyup', copyYear);
inputCvc.addEventListener('keyup', copyCvc);

// Instruction for printing text input
function copyCardNum(e: KeyboardEvent) {
  let cardNum = document.getElementById('card-num') as HTMLSpanElement;

  if (inputCardNum.value.length === 0) {
    cardNum.textContent = '0000 0000 0000 0000';
  } else {
    cardNum.textContent = inputCardNum.value;
  }
}

// Auto spacing while typing
inputCardNum.addEventListener('keydown', function (e: KeyboardEvent) {
  let val = (e.target as HTMLInputElement).value,
                                                  len = val.length,
                                                  key = e.key;
                                                  (e.target as HTMLInputElement).value =
                                                  key === 'Backspace'
                                                    ? val
                                                    : len === 4 || len === 9 || len === 14
                                                    ? val + '\xa0'
                                                    : val.replace(/(\d{4})(?=\d)/g, '$1 ');
                                                  
});

// Auto spacing when you paste
inputCardNum.addEventListener('paste', (e: ClipboardEvent) => {
  e.preventDefault();
  const pastedText = e.clipboardData?.getData('text/plain') || '';
  const formattedText = pastedText.replace(/(\d{4})(?=\d)/g, '$1 ');
  inputCardNum.value = formattedText;
});

function copyName() {
  let name = document.getElementById('name') as HTMLSpanElement;

  if (inputName.value.length === 0) {
    name.textContent = '-- --';
  } else {
    name.textContent = inputName.value;
  }
}

function copyMonth(e: KeyboardEvent) {
  let val = (e.target as HTMLInputElement).value;

  if (val.length === 1) {
    val = '0' + val;
  } else {
    val = val;
  }

  let expMonth = document.getElementById('expMonth') as HTMLSpanElement;

  if (val.length === 0) {
    expMonth.textContent = '--';
  } else {
    expMonth.textContent = val;
  }
}

function copyYear(e: KeyboardEvent) {
  let val =(e.target as HTMLInputElement).value;

  if (val.length === 1) {
    val = '0' + val;
  } else {
    val = val;
  }

  let expYear = document.getElementById('expYear') as HTMLSpanElement;

  if (val.length === 0) {
    expYear.textContent = '--';
  } else {
    expYear.textContent = val;
  }
}

function copyCvc(e: KeyboardEvent) {
  let cvcDesktop = document.getElementById('cvc-desktop') as HTMLSpanElement;
  let cvcMobile = document.getElementById('cvc-mobile') as HTMLSpanElement;

  if (inputCvc.value.length === 0) {
    cvcDesktop.textContent = '000';
    cvcMobile.textContent = '000';
  } else {
    cvcDesktop.textContent = inputCvc.value;
    cvcMobile.textContent = inputCvc.value;
  }
}

//Error validation 
const isRequired = (value: string): boolean => value === '' ? false : true;
const validLength = (length: number, min: number): boolean => length < min ? false : true;
const validNum = (input: string): boolean => (/^([0-9\s])+$/.test(input));

const showError = (input: HTMLInputElement, message: string): void => {
  // get the form-field element
  const inputField = input?.parentElement as HTMLElement;

  // show the error message
  const error = inputField.querySelector('small');
  if (error) {
    error.textContent = message;
  }

  // add the error class to border
  const borderError = inputField.querySelector('input')
  if (borderError) {
    borderError.classList.add('error');
  }
};

const showSuccess = (input: HTMLInputElement): void => {
  // get the form-field element
  const inputField = input?.parentElement as HTMLElement;

  // hide the error message
  const error = inputField.querySelector('small');
  if (error) {
    error.textContent = '';
  }

  // remove the error class from border
  const borderError = inputField.querySelector('input')
  if (borderError) {
    borderError.classList.remove('error');
  }
}


const checkName = (): boolean => {
  let valid = false;
  const name = inputName.value.trim();

  if (!isRequired(name)) {
      showError(inputName, "Cardholder's name cannot be blank.");
  } else {
      showSuccess(inputName);
      valid = true;
  }
  return valid;
};

const checkCardNum = (): boolean => {
  let valid = false;
  const cardNum = inputCardNum.value.trim();
  const min = cardNum.includes('\xa0') ? 19 : 16; //16 digits + space
  let length = cardNum.length;

  if (!isRequired(cardNum)) {
      showError(inputCardNum, 'Card number cannot be blank.');
  } else if (!validNum(cardNum)) {
    showError(inputCardNum, 'Invalid format, Numbers only')
  } else if (!validLength(length, min)) {
      showError(inputCardNum, `Card number must be 16 characters.`)
  } else {
      showSuccess(inputCardNum);
      valid = true;
  }
  return valid;
};

const checkCvc = (): boolean => {
  let valid = false;
  const min = 3;
  const cvc = inputCvc.value.trim();

  if (!isRequired(cvc)) {
      showError(inputCvc, "CVC can't be blank.");
  } else if (!validNum(cvc)) {
    showError(inputCvc, 'Invalid format, Numbers only')
  } else if (!validLength(cvc.length, min)) {
      showError(inputCvc, `CVC must be ${min} characters.`)
  } else {
      showSuccess(inputCvc);
      valid = true;
  }
  return valid;
};

const checkExpMonth = (): boolean => {
  let valid = false;
  const expMonthStr = inputExpMonth.value.trim();

  if (!isRequired(expMonthStr)) {
    showError(inputExpMonth, "Month can't be blank.");
  } else if (!validNum(expMonthStr)) {
    showError(inputExpMonth, 'Invalid format, Numbers only');
  } else {
    const expMonth = parseInt(expMonthStr, 10);
    if (expMonth > 12) {
      showError(inputExpMonth, 'Not a valid month number');
    } else {
      showSuccess(inputExpMonth);
      valid = true;
    }
  }
  
  return valid;
};

const checkExpYear = (): boolean => {
  let valid = false;
  const expYear = inputExpYear.value.trim();

  if (!isRequired(expYear)) {
    showError(inputExpYear, "Year can't be blank.");
  } else if (!validNum(expYear)) {
    showError(inputExpYear, 'Invalid format, Numbers only');
  } else {
    showSuccess(inputExpYear);
    valid = true;
  }

  return valid;
};

// handle submit button
button.addEventListener('click', () => {
  const isNameValid = checkName();
  const isNumValid = checkCardNum();
  const isMonthValid = checkExpMonth();
  const isYearValid = checkExpYear();
  const isCvcValid = checkCvc();

  const isValid = isNameValid && isNumValid && isMonthValid && isYearValid && isCvcValid;

  if (!isValid) {
    // handle invalid form submission
  } else if (button.textContent && button.textContent.includes('Confirm')) {
    button.textContent = 'Continue';
    form.classList.add('successful');
    successful.classList.add('successful');
  } else {
    window.location.reload();
  }  
});

