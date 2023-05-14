//Get the input areas
const form = document.getElementById('form');
const successful = document.querySelector('.added');
const inputName = document.getElementById('input-name');
const inputCardNum = document.getElementById('input-number');
const inputExpMonth = document.getElementById('month');
const inputExpYear = document.getElementById('year');
const inputCvc = document.getElementById('cvc');
const button = document.getElementById('btn')
let error = true


//print out text input of each input area of the form into the card
//Eventlistener for each area
inputName.addEventListener('keyup', copyName);
inputCardNum.addEventListener('keyup', copyCardNum);
inputExpMonth.addEventListener('keyup', copyMonth);
inputExpYear.addEventListener('keyup', copyYear);
inputCvc.addEventListener('keyup', copyCvc);

const err = inputExpYear.parentElement;

//instruction for printing text input
function copyCardNum(e)
{
  let cardNum = document.getElementById('card-num')

  if (inputCardNum.value.length === 0) {
    cardNum.textContent = "0000 0000 0000 0000";
  } else {
    cardNum.textContent = inputCardNum.value
  }
}

// auto spacing
inputCardNum.addEventListener("keydown", function(e){
  val = e.target.value,
   len = val.length,
   lst = val[len-1],
   key = e.key;
e.target.value = key === "Backspace" ? val
                                    : len === 4 ||
                                      len === 9 ||
                                      len === 14  ? val + "\xa0"
                                                 : val;
});

function copyName()
{
  let name = document.getElementById('name');

  if(inputName.value.length === 0) {
    name.textContent = "-- --";
  } else {
    name.textContent = inputName.value;
  }
}

function copyMonth(e)
{
  let val = e.target.value;
  
  if (val.length === 1) {
    val = "0" + val;
  } else {
    val = val;
  }

  let expMonth = document.getElementById('expMonth')

  if (val.length === 0) {
    expMonth.textContent = "--";
  } else {
    expMonth.textContent = val
  }
}

function copyYear(e)
{
  let val = e.target.value;
  
  if (val.length === 1) {
    val = "0" + val;
  } else {
    val = val;
  }

  let expYear = document.getElementById('expYear')
  
  if (val.length === 0) {
    expYear.textContent = "--";
  } else {
    expYear.textContent = val
  }
}

function copyCvc(e)
{
  let cvcDesktop = document.getElementById('cvc-desktop')
  let cvcMobile = document.getElementById('cvc-mobile')
  
  if (inputCvc.value.length === 0) {
    cvcDesktop.textContent = "000";
    cvcMobile.textContent = "000";
  } else {
    cvcDesktop.textContent = inputCvc.value;
    cvcMobile.textContent = inputCvc.value;
  }
}

//Error validation 
const isRequired = value => value === '' ? false : true;
const validLenght = (length, min) => length < min ? false : true;
const validNum = (input) => (/^([0-9\s])+$/.test(input));

const showError = (input, message) => {
  // get the form-field element
  const inputField = input.parentElement;

  // show the error message
  const error = inputField.querySelector('small');
  error.textContent = message;

  // add the error class to border
  const borderError = inputField.querySelector('input')
  borderError.classList.add('error')
  
};

const showSuccess = (input) => {
  // get the form-field element
  const inputField = input.parentElement;

  // hide the error message
  const error = inputField.querySelector('small');
  error.textContent = '';

  // remove the error class from border
  const borderError = inputField.querySelector('input')
  borderError.classList.remove('error') 
}


const checkName = () => {
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

const checkCardNum = () => {
  let valid = false;
  const min = 19; //i6 digits + space
  const cardNum = inputCardNum.value.trim();
  let length = cardNum.length + "\xa0";

  if (!isRequired(cardNum)) {
      showError(inputCardNum, 'Card number cannot be blank.');
  } else if (!validNum(cardNum)) {
    showError(inputCardNum, 'Invalid format, Numbers only')
  } else if (!validLenght(length, min)) {
      showError(inputCardNum, `Card number must be 16 characters.`)
  } else {
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
  } else if (!validNum(cvc)) {
    showError(inputCvc, 'Invalid format, Numbers only')
  } else if (!validLenght(cvc.length, min)) {
      showError(inputCvc, `CVC must be ${min} characters.`)
  } else {
      showSuccess(inputCvc);
      valid = true;
  }
  return valid;
};

const checkExpMonth = () => {
  let valid = false;
  const expMonth = inputExpMonth.value.trim();

  if (!isRequired(expMonth)) {
      showError(inputExpMonth, "Month can't be blank.");
  } else if (!validNum(expMonth)) {
    showError(inputExpMonth, 'Invalid format, Numbers only')
  } else if (expMonth > 12) {
    showError(inputExpMonth, 'Not a valid month number')
  } else {
      showSuccess(inputExpMonth);
      valid = true;
  }
  return valid;
};

const checkExpYear = () => {
  let valid = false;
  const expYear = inputExpYear.value.trim();

  if (!isRequired(expYear)) {
      showError(inputExpYear, "Year can't be blank.");
  } else if (!validNum(expYear)) {
    showError(inputExpYear, 'Invalid format, Numbers only')
  } else {
      showSuccess(inputExpYear);
      valid = true;
  }
  return valid;
};


//handle submit button
button.addEventListener('click', () => {
  let isNameValid = checkName(),
  isNumValid = checkCardNum(),
  isMonthValid = checkExpMonth(),
  isYearValid = checkExpYear(),
  isCvcValid =   checkCvc();

  let isValid  = isNameValid &&
    isNumValid &&
    isMonthValid &&
    isYearValid &&
    isCvcValid;

  if (!isValid) {
    
  }
  else if (button.textContent.includes('Confirm')) 
  {
    button.textContent = 'Continue'
    form.classList.add('successful');
    successful.classList.add('successful');
  } 
  else 
  {
    window.location.reload(true)
  }
})