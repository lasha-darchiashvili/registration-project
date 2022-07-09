// selectors
const submitInfo = document.querySelector(".submitinfo");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const telephone = document.querySelector(".tel");
const birthDate = document.querySelector(".textboxdate");
const popup = document.querySelector(".popup");
const warningText = document.querySelector(".warning-text");
const errorMessage = document.querySelector(".error-message");
const closePopup = document.querySelector(".close-popup");

const form = document.querySelector(".info-form");
const persInfo = document.querySelector(".info");

//form-counter selectors
const stepOne = document.querySelector(".step-one");
const ticks = document.querySelector(".ticks");

// email info
const emailEnding = "@redberry.ge";
const emailEndingLength = emailEnding.length;

// user passes validations or not (true-false)
const validation = {
  username: false,
  email: false,
  telephone: false,
  birthDate: false,
};

// date input in the begining is text input(because of placeholder), on focus it becomes date input
birthDate.addEventListener("focus", function () {
  console.log(localStorage.getItem("textboxdate"));

  this.type = "date";
  this.value = localStorage.getItem("textboxdate");
});

// if date input is blank, show placeholder
birthDate.addEventListener("blur", function () {
  if (!this.value) {
    this.type = "text";
  }
});

// calling saving-inputInfo-inLocalstorage-on-reload functions
saveInputsOnRefresh(username, "keyup");
saveInputsOnRefresh(email, "keyup");
saveInputsOnRefresh(telephone, "keyup");
saveInputsOnRefresh(birthDate, "change");

// displaying localstorage info in inputs after roloading a page
window.addEventListener("load", function () {
  username.value = localStorage.getItem("username");
  email.value = localStorage.getItem("email");
  telephone.value = localStorage.getItem("tel");

  if (localStorage.getItem("textboxdate")) {
    birthDate.value = formatDate(localStorage.getItem("textboxdate"));
  }

  if (username.value || email.value || telephone.value || birthDate.value) {
    persInfo.style.backgroundColor = "rgba(233, 250, 241, 1)";
  }
});

submitInfo.addEventListener("click", function (e) {
  e.preventDefault();

  /*  this 4 functions check username,email,telephone and birthDate for validations. if conditions are not met displays error popup,
   if conditions are met sets validation.username, validation.email, validation.telephone and validation birthDate to true */
  usernameValidation(username);
  emailValidation(email);
  telephoneValidation(telephone);
  birthDateValidation(birthDate);

  //   this is doing next : if input values pass validations, button "next" takes user to the next page
  if (
    validation.email &&
    validation.username &&
    validation.telephone &&
    validation.birthDate
  ) {
    hidePopup();
    stepOne.style.display = "none";
    ticks.style.display = "block";
    location.href = "/experience.html";
  }
});

// this functions is doing next => if user clicks on any input in form on second page, number 1 in form tracker changes color
form.addEventListener("click", function (e) {
  if (e.target.parentElement.className === "input-field") {
    persInfo.style.backgroundColor = "rgba(233, 250, 241, 1)";
  }
});

//   username validation. this function checks username to be mandatory and length to be more than 2 characters
//   also this function displays error popup if conditions are not satisfied
//   lastly it sets validation.username to true if conditions are met
function usernameValidation(username) {
  if (username.value.trim() == "" || username.value.trim().length < 2) {
    validation.username = false;
    username.parentElement.classList.add("invalid");
    username.parentElement.classList.remove("valid");

    //displays popup with these messages
    displayPopup("Invalid Username", "Please enter a valid Username");
  } else {
    username.parentElement.classList.remove("invalid");
    username.parentElement.classList.add("valid");
    validation.username = true;
  }
}

// -------------------------------------- validation functions ---------------------------------------- //

//   email validation, this function checks email to be mandatory and to have mail format (including @redberry.ge)
//   also this function displays error popup if conditions are not satisfied
//   lastly, it sets validation.email to true if conditions are met
function emailValidation(email) {
  //   taking last 12 characters of email value, which should match "@redberry.ge"
  const emailValue = email.value.trim().toLowerCase();
  const emailLength = emailValue.length;
  const emailValueEnding = emailValue.slice(
    emailLength - emailEndingLength,
    emailLength
  );

  //   email validation
  if (emailValueEnding !== emailEnding || !testEmail(emailValue)) {
    validation.email = false;
    email.parentElement.classList.add("invalid");
    email.parentElement.classList.remove("valid");
    if (validation.username) {
      displayPopup("Invalid Email", "Please enter a valid email");
    }
  } else {
    email.parentElement.classList.remove("invalid");
    email.parentElement.classList.add("valid");
    validation.email = true;
  }
}

//   telephone validation, this function checks telephone to be mandatory, to have 9 numbers and to have only numbers
//   also this function displays error popup if conditions are not satisfied
//   lastly it sets validation.telephone to true if conditions are met
function telephoneValidation(telephone) {
  const telValue = telephone.value;
  //   phone validation
  if (telValue === "" || telValue.length !== 9 || !testTelephone(telValue)) {
    validation.telephone = false;
    telephone.parentElement.classList.add("invalid");
    telephone.parentElement.classList.remove("valid");
    if (validation.email && validation.username) {
      displayPopup(
        "Invalid Telephone Number",
        "Please enter a valid Telephone Number"
      );
    }
  } else {
    telephone.parentElement.classList.remove("invalid");
    telephone.parentElement.classList.add("valid");
    validation.telephone = true;
  }
}

//   birth date validation, this function checks birth date to be mandatory
//   also this function displays error popup if condition is not satisfied
//   lastly it sets validation.birthDate to true if conditions are met
function birthDateValidation(birthDate) {
  if (!birthDate.value) {
    birthDate.parentElement.classList.add("invalid");
    birthDate.parentElement.classList.remove("valid");
    if (validation.email && validation.username && validation.telephone) {
      displayPopup("Invalid Birth Date", "Please enter a Birth Date");
    }
  } else {
    birthDate.parentElement.classList.remove("invalid");
    birthDate.parentElement.classList.add("valid");
    validation.birthDate = true;
  }
}

// ---------------------------------------- validations section ending----------------------------------------- //
// ------------------------------------------------------------------------------------------------------------//

// this function takes error messages as arguments and displays popup with this messages
function displayPopup(inputWarningText, inputErrosMessage) {
  warningText.textContent = inputWarningText;
  errorMessage.textContent = inputErrosMessage;
  popup.style.display = "block";
}

// this function hides error popup
function hidePopup() {
  popup.style.display = "none";
}

// closes popup via clicking X
closePopup.addEventListener("click", function () {
  popup.style.display = "none";
});

// email regex
const testEmail = function (email) {
  return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
    email
  );
};

// telephone regex
const testTelephone = function (telephone) {
  return /^[0-9]*$/.test(telephone);
};

// this function returns formated date for textbox-date
function formatDate(dateInput) {
  correctedDate = new Date(dateInput);
  let date =
    correctedDate.getDate() > 9
      ? correctedDate.getDate()
      : `${0}${correctedDate.getDate()}`;
  let month =
    correctedDate.getMonth() + 1 > 9
      ? correctedDate.getMonth() + 1
      : `${0}${correctedDate.getMonth() + 1}`;
  let year = correctedDate.getFullYear();

  return `${month}/${date}/${year}`;
}

// saving input info in localstorage on reload
function saveInputsOnRefresh(input, eventType) {
  input.addEventListener(eventType, function (e) {
    let inputValue;

    if (eventType === "change") {
      inputValue = this.value;
    } else {
      //   const pressedKey = String.fromCharCode(e.keyCode);
      inputValue = this.value;
    }
    console.log(inputValue);
    console.log(input);
    localStorage.setItem(input.className, inputValue);
  });
}
