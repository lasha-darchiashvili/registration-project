let characterList = document.querySelector(".forcharacter ul");

// characterid is set in fetch function and then saved in localstorage
let characterId;

const info = {
  getDataUrl: "https://chess-tournament-api.devtest.ge/api/grandmasters",
  sendRequestUrl: "https://chess-tournament-api.devtest.ge/api/register",
};

// fetching data function
function fetchCharacterData(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return displayCharacters(data);
    })
    .catch((err) => console.log(err));
}

// call fetch
fetchCharacterData(info.getDataUrl);

// this function is used in fetching data function.
// this function displays feched data in characters drop down list and also
// second part of this function makes character list work
function displayCharacters(data) {
  data.forEach((character) => {
    const { name, image, id } = character;
    const characterWrapper = document.createElement("li");
    characterId = id;

    characterWrapper.innerHTML = `
    <p>${name}</p>
       <img
       src="https://chess-tournament-api.devtest.ge${image}"
       alt="character"
       class="characterimg"
       />
       <div id="divCheckbox" style="display: none;">${characterId}</div>
    `;

    characterList.append(characterWrapper);
  });

  // making fetched data in drop down list work. I created custom selectors for drop down list, so this was needed to make a list work.
  // function takes 4 fetched items and makes them clickable, also makes custom drop down list arrow icon work.
  let characterOptions = document.querySelectorAll(".characterlist li");
  characterListWork(characterOptions);
}

// "Knowledge-Level" drop down list selectors
let knowledgeInput = document.querySelector(".aroundknowledge");
let knowledgelist = document.querySelector(".forknowledge ul");
let knowledgeOptions = document.querySelectorAll(".knowledgelist li");
let knowledgeValue = document.querySelector(".knowledge");
let knowledgeArrowIcon = document.querySelector(".aroundknowledge .arrow-down");

// "Character" drop down list selectors
let characterInput = document.querySelector(".aroundcharacter");
let characterValue = document.querySelector(".character");
let characterArrowIcon = document.querySelector(".aroundcharacter .arrow-down");
let totalCharactersBlock = document.querySelector(".characterlist small");

// validation selectors
let doneButton = document.querySelector(".doneinfo");
let knowledgeError = document.querySelector(".knowledge-error-message");
let characterError = document.querySelector(".character-error-message");
characterList = document.querySelector(".forcharacter ul");
let secondForm = document.querySelector(".additional-form");
let secondInFormTracker = document.querySelector(".exp-block-thirdpage");

let participationYes = document.querySelector(".answer-yes");
let participationNo = document.querySelector(".answer-no");

let pageThreeHeader = document.querySelector(".right-header");

const validation = {
  knowledge: false,
  character: false,
  participation: true,
};

// calling saving-selectorsInfo-inLocalstorage functions
saveInputs(knowledgeValue);
saveInputs(characterValue);
localStorage.setItem("participationValue", true);

// set participation values in local storage
participationYes.addEventListener("click", function () {
  setParticipationInLocalStorage(1, 2);
});

participationNo.addEventListener("click", function () {
  setParticipationInLocalStorage(2, 1);
});

function setParticipationInLocalStorage(firstValue, secondValue) {
  this.value = firstValue;
  participationNo.value = secondValue;
  localStorage.setItem("participation", this.value);
  localStorage.setItem("participationValue", true);
}

// displaying localstorage info in inputs after roloading a page
window.addEventListener("load", function () {
  if (localStorage.knowledge) {
    knowledgeValue.textContent = localStorage.getItem("knowledge");
  }

  if (localStorage.character) {
    characterValue.textContent = localStorage.getItem("character");
  }

  if (localStorage.participation == 1) {
    participationNo.checked = false;
    participationYes.checked = true;
  } else if (localStorage.participation == 2) {
    participationNo.checked = true;
    participationYes.checked = false;
  }

  // turning green number 2 in form counter if something was chosen before reload, in form
  if (
    localStorage.knowledge ||
    localStorage.character ||
    localStorage.participation
  ) {
    secondInFormTracker.style.backgroundColor = "rgba(233, 250, 241, 1)";
  }

  if (localStorage.knowledgeValidation) {
    formValidation.knowledge = true;
  }
  if (localStorage.characterValidation) {
    formValidation.character = true;
  }
  // changing button name and page header after reload, if relevant
  finishRegistrationStep();
});

// this addEventListener is doing next => if user clicks on any input in form, on third page, number 2 in form tracker changes color
secondForm.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("aroundknowledge") ||
    e.target.classList.contains("aroundcharacter") ||
    e.target.parentElement.classList.contains("form-check")
  ) {
    secondInFormTracker.style.backgroundColor = "rgba(233, 250, 241, 1)";
  }
});

// ------------------------------------------------ section -------------------------------------------//
// make two custom lists work, first custom list is called in fetch functiion, another is called here
// two functions that are created here are practically similiar, for one is for static data and another is for dynamic data
knowledgeListWork();

function knowledgeListWork() {
  // making static "knowledge-level" drop down list active
  knowledgeInput.addEventListener("click", function () {
    toggleKnowledgeClasses();
  });

  // eventlistener for each "knowledge-level" option which sets chosen option in input
  // and after that also closes drop-down list and rotates arrow
  knowledgeOptions.forEach((option) => {
    option.addEventListener("click", function () {
      knowledgeError.style.visibility = "hidden";
      formValidation.knowledge = true;
      localStorage.setItem("knowledgeValidation", true);

      knowledgeValue.textContent = option.textContent;
      toggleKnowledgeClasses();

      // changing button name and page header(certain requirements should be met)
      finishRegistrationStep();
    });
  });

  // this function makes "knowledge-level" drop down list active/inactive
  // and rotates arrow icon
  function toggleKnowledgeClasses() {
    knowledgelist.classList.toggle("active");
    knowledgeArrowIcon.classList.toggle("rotate");
  }
}

function characterListWork(characterOptions) {
  // making static "character" drop down list active
  characterInput.addEventListener("click", function () {
    toggleCharacterClasses();
  });

  // eventlistener for each "character" option which sets chosen option in input
  // and after that also closes drop-down list and rotates arrow
  characterOptions.forEach((option) => {
    option.addEventListener("click", function () {
      characterError.style.visibility = "hidden";
      formValidation.character = true;
      localStorage.setItem("characterValidation", true);

      characterValue.textContent = option.querySelector("p").textContent;
      toggleCharacterClasses();

      finishRegistrationStep();

      localStorage.setItem(
        "id",
        option.querySelector("#divCheckbox").textContent
      );
    });
  });

  // this function makes "character" drop down list active/inactive
  // and rotates arrow icon
  function toggleCharacterClasses() {
    characterList.classList.toggle("active");
    characterArrowIcon.classList.toggle("rotate");
  }

  // counting characters length and giving number to HTML
  totalCharactersBlock.textContent = `(Total ${characterOptions.length})`;
}
// ----------------------------------section ending-----------------------------------------------//

// here is done next: clicking outside of drop down lists makes lists to close(display:none).
window.addEventListener("click", function (e) {
  if (
    knowledgelist.classList.contains("active") &&
    e.target !== knowledgeInput &&
    e.target !== knowledgelist
  ) {
    knowledgelist.classList.remove("active");
    knowledgeArrowIcon.classList.toggle("rotate");
  } else if (
    characterList.classList.contains("active") &&
    e.target !== characterInput &&
    e.target !== characterList &&
    e.target !== totalCharactersBlock
  ) {
    characterList.classList.remove("active");
    characterArrowIcon.classList.toggle("rotate");
  } else return;
});

// booleans for form validation
const formValidation = {
  knowledge: false,
  character: false,
};

// ------------------------- section -----------------------------------------//
// eventlistener on submiting the form
doneButton.addEventListener("click", function (e) {
  e.preventDefault();
  knowledgeLevelValidation(knowledgeValue.textContent);
  characterLevelValidation(characterValue.textContent);

  if (localStorage.knowledge && localStorage.character) {
    sendData();
  }
});

// this functions activates error message if condition in not met
function knowledgeLevelValidation(knowledgelvl) {
  if (knowledgelvl === "level of knowledge *") {
    formValidation.knowledge = false;
    knowledgeError.style.visibility = "visible";
  }
}

// this functions activates error message if condition in not met
function characterLevelValidation(characterlvl) {
  if (characterlvl === "Choose your character *") {
    formValidation.character = false;
    characterError.style.visibility = "visible";
  }
}
// --------------------------------- section ending ---------------------------------- //
//------------------------------------------------------------------------------------//

// saving input info in localstorage
function saveInputs(input) {
  input.addEventListener("DOMNodeInserted", function (e) {
    let inputValue;
    inputValue = this.textContent;

    if (input === knowledgeValue) {
      inputValue = inputValue.toLowerCase();
    }
    localStorage.setItem(input.className, inputValue);
  });
}

// changes button text and page header text
function finishRegistrationStep() {
  if (localStorage.knowledge && localStorage.character) {
    doneButton.textContent = "Done";
    pageThreeHeader.textContent = "Almost Done!";
  }
}

// function that sends http request
function sendData() {
  let participationBoolean;
  if (localStorage.participationValue === "true") {
    participationBoolean = true;
  } else if (localStorage.participationValue === "false") {
    participationBoolean = false;
  }

  let experience;

  // api accepts word "normal" and on the page its displayed as "intermediate", so this change fixes problem
  if (localStorage.knowledge === "intermediate") {
    experience = "normal";
  } else {
    experience = localStorage.knowledge;
  }

  characterId = Number(characterId);

  const dataToSend = {
    name: `${localStorage.username}`,
    email: `${localStorage.email}`,
    phone: `${localStorage.tel}`,
    date_of_birth: `${localStorage.textboxdate}`,
    experience_level: `${experience}`,
    already_participated: participationBoolean,
    character_id: characterId,
  };

  fetch(info.sendRequestUrl, {
    method: "post",
    body: JSON.stringify(dataToSend),
    headers: {
      "Content-Type": "application/JSON",
    },
  })
    .then((response) => console.log(response))
    .then((data) => redirectToOnboarding())
    .catch((err) => console.log(err));
}

// this function finilizes registration and is use in "sending request" function
function redirectToOnboarding() {
  if (formValidation.character && formValidation.knowledge) {
    location.href = "/onboarding.html";
  }
  localStorage.clear();
}

// --------------------------------------------------------

data4 = [
  {
    name: "Nona Gaprindashvili",
    image:
      "https://app.fide.com/upload/9851/3e2cad26edd91e519d091e2982b9e7e1.jpg",
    id: 1,
  },
  {
    name: "Queens Gambit",
    image: "https://www.refinery29.com/images/9993213.jpg",
    id: 2,
  },
  {
    name: "Garry Kasparov",
    image:
      "https://www.chessjournal.com/wp-content/uploads/2021/08/Garry-Kasparov-Chess-Grandmaster.jpg",
    id: 3,
  },
  {
    name: "Messi & Ronaldo",
    image: "https://pbs.twimg.com/media/Fh8dvWPXwAE5FPJ.jpg:large",
    id: 4,
  },
];

function displayCharacters(data) {
  data.forEach((character) => {
    const { name, image, id } = character;
    const characterWrapper = document.createElement("li");
    characterId = id;

    characterWrapper.innerHTML = `
    <p>${name}</p>
       <img
       src="${image}"
       alt="character"
       class="characterimg"
       />
       <div id="divCheckbox" style="display: none;">${characterId}</div>
    `;

    characterList.append(characterWrapper);
  });

  // making fetched data in drop down list work. I created custom selectors for drop down list, so this was needed to make a list work.
  // function takes 4 fetched items and makes them clickable, also makes custom drop down list arrow icon work.
  let characterOptions = document.querySelectorAll(".characterlist li");
  characterListWork(characterOptions);
}

displayCharacters(data4);
