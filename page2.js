// selectors
const submitInfo = document.querySelector(".submitinfo");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const telephone = document.querySelector(".tel");
const birthDate = document.querySelector(".form-control");
const popup = document.querySelector(".popup");
const warningText = document.querySelector(".warning-text");
const errorMessage = document.querySelector(".error-message");
const closePopup = document.querySelector(".close-popup");

// email info
const emailEnding = "@redberry.ge";
const emailEndingLength = emailEnding.length;

const validation = {
  username: false,
  email: false,
  telephone: false,
  birthDate: false,
};

submitInfo.addEventListener("click", function (e) {
  e.preventDefault();

  //   username validation
  if (username.value.trim() == "" || username.value.trim().length < 2) {
    validation.username = false;
    username.parentElement.classList.add("invalid");
    username.parentElement.classList.remove("valid");

    displayPopup("Invalid Username", "Please enter a valid Username");
  } else {
    username.parentElement.classList.remove("invalid");
    username.parentElement.classList.add("valid");
    validation.username = true;
  }

  //   taking last 12 characters of email value which should match "@redberry.ge"
  const emailValue = email.value.trim();
  const emailLength = emailValue.length;
  const emailValueEnding = emailValue.slice(
    emailLength - emailEndingLength,
    emailLength
  );

  //   email validation
  if (emailValueEnding !== emailEnding || !testEmail(email.value.trim())) {
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

  if (!birthDate.value) {
    birthDate.parentElement.classList.add("invalid");
    birthDate.parentElement.classList.remove("valid");
    if (validation.email && validation.username && validation.telephone) {
      displayPopup("Invalid Birth Date", "Please enter a Birth Date");
    }
  } else {
    birthDate.parentElement.classList.remove("invalid");
    birthDate.parentElement.classList.add("valid");
  }

  //   location.href = "/experience.html";
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

function displayPopup(inputWarningText, inputErrosMessage) {
  warningText.textContent = inputWarningText;
  errorMessage.textContent = inputErrosMessage;
  popup.style.display = "block";
}

function hidePopup() {
  popup.style.display = "none";
}

closePopup.addEventListener("click", function () {
  popup.style.display = "none";
});
