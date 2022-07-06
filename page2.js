// selectors
const submitInfo = document.querySelector(".submitinfo");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const telephone = document.querySelector(".tel");
const birthDate = document.querySelector(".form-control");

// email info
const emailEnding = "@redberry.ge";
const emailEndingLength = emailEnding.length;

submitInfo.addEventListener("click", function (e) {
  e.preventDefault();

  //   username validation
  if (username.value.trim() == "" || username.value.trim().length < 2) {
    username.parentElement.classList.add("invalid");
    username.parentElement.classList.remove("valid");
  } else {
    username.parentElement.classList.remove("invalid");
    username.parentElement.classList.add("valid");
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
    email.parentElement.classList.add("invalid");
    email.parentElement.classList.remove("valid");
  } else {
    email.parentElement.classList.remove("invalid");
    email.parentElement.classList.add("valid");
  }

  const telValue = telephone.value;
  //   phone validation
  if (telValue === "" || telValue.length !== 9 || !testTelephone(telValue)) {
    telephone.parentElement.classList.add("invalid");
    telephone.parentElement.classList.remove("valid");
  } else {
    telephone.parentElement.classList.remove("invalid");
    telephone.parentElement.classList.add("valid");
  }

  if (!birthDate.value) {
    birthDate.parentElement.classList.add("invalid");
    birthDate.parentElement.classList.remove("valid");
  } else {
    birthDate.parentElement.classList.remove("invalid");
    birthDate.parentElement.classList.add("valid");
  }
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
