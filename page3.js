let characterList = document.querySelector(".forcharacter ul");

const info = {
  url: "https://chess-tournament-api.devtest.ge/api/grandmasters",
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
fetchCharacterData(info.url);

// this function is used in fetching data function.
// this function displays feched data in characters drop down list and also
// second part of this function makes character list work
function displayCharacters(data) {
  data.forEach((character) => {
    const { name, image } = character;
    const characterWrapper = document.createElement("li");

    characterWrapper.innerHTML = `
    <p>${name}</p>
       <img
       src="https://chess-tournament-api.devtest.ge${image}"
       alt="character"
       class="characterimg"
       />
    `;

    characterList.append(characterWrapper);
  });

  // making fetched data in drop down list work. I created custom selectors for drop down list, so this was needed to make list work.
  // function takes 4 fetched items and makes them clickable, also makes custom drop down list arrow work.
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

// calling saving-selectorsInfo-inLocalstorage-on-reload functions
saveInputsOnRefresh(knowledgeValue);
saveInputsOnRefresh(characterValue);

participationYes.addEventListener("click", function () {
  this.value = "1";
  participationNo.value = "2";
  localStorage.setItem("participation", this.value);
});

participationNo.addEventListener("click", function () {
  this.value = "2";
  participationYes.value = "1";
  localStorage.setItem("participation", this.value);
});

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

  if (
    localStorage.knowledge ||
    localStorage.character ||
    localStorage.participation === "1" ||
    localStorage.participation === "2"
  ) {
    secondInFormTracker.style.backgroundColor = "rgba(233, 250, 241, 1)";
  }
  if (localStorage.knowledge && localStorage.character) {
    finishRegistration();
  }
});

// this functions is doing next => if user clicks on any input in form, on third page, number 2 in form tracker changes color
secondForm.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("aroundknowledge") ||
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
      knowledgeValue.textContent = option.textContent;
      toggleKnowledgeClasses();
      if (localStorage.knowledge && localStorage.character) {
        finishRegistration();
      }
    });
  });

  // this function makes "knowledge-level" drop downl list active/inactive
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
      characterValue.textContent = option.querySelector("p").textContent;
      toggleCharacterClasses();
      if (localStorage.knowledge && localStorage.character) {
        finishRegistration();
      }
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

  if (formValidation.knowledge && formValidation.character) {
    console.log(this.textContent);
  }
});

// this functions activates error message if condition in not met
function knowledgeLevelValidation(knowledgelvl) {
  if (knowledgelvl === "level of knowledge") {
    formValidation.knowledge = false;
    knowledgeError.style.visibility = "visible";
  } else {
    knowledgeError.style.visibility = "hidden";
    formValidation.knowledge = true;
  }
}

// this functions activates error message if condition in not met
function characterLevelValidation(characterlvl) {
  if (characterlvl === "Choose your character") {
    formValidation.character = false;
    characterError.style.visibility = "visible";
  } else {
    characterError.style.visibility = "hidden";
    formValidation.character = true;
  }
}
// --------------------------------- section ending ---------------------------------- //
//------------------------------------------------------------------------------------//

// saving input info in localstorage on reload
function saveInputsOnRefresh(input) {
  input.addEventListener("DOMNodeInserted", function (e) {
    let inputValue;
    inputValue = this.textContent;

    console.log(inputValue);
    console.log(input);
    localStorage.setItem(input.className, inputValue);
  });
}

function finishRegistration() {
  doneButton.textContent = "Done";
  pageThreeHeader.textContent = "Almost Done!";
}
