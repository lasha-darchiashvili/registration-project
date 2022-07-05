// "Knowledge-Level" drop down list selectors
let knowledgeInput = document.querySelector(".aroundknowledge");
let knowledgelist = document.querySelector(".forknowledge ul");
let knowledgeOptions = document.querySelectorAll(".knowledgelist li");
let knowledgeValue = document.querySelector(".knowledge");
let knowledgeArrowIcon = document.querySelector(".aroundknowledge .arrow-down");

// "Character" drop down list selectors
let characterInput = document.querySelector(".aroundcharacter");
let characterlist = document.querySelector(".forcharacter ul");
let characterOptions = document.querySelectorAll(".characterlist li");
let characterValue = document.querySelector(".character");
let characterArrowIcon = document.querySelector(".aroundcharacter .arrow-down");
let totalCharacters = document.querySelector(".characterlist small");

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
  });
});

// this function makes "knowledge-level" drop downl list active/inactive
// and rotates arrow icon
function toggleKnowledgeClasses() {
  knowledgelist.classList.toggle("active");
  knowledgeArrowIcon.classList.toggle("rotate");
}

// making static "character" drop down list active
characterInput.addEventListener("click", function () {
  toggleCharacterClasses();
});

// eventlistener for each "character" option which sets chosen option in input
// and after that also closes drop-down list and rotates arrow
characterOptions.forEach((option) => {
  option.addEventListener("click", function () {
    characterValue.textContent = option.textContent;
    toggleCharacterClasses();
  });
});

// this function makes "character" drop down list active/inactive
// and rotates arrow icon
function toggleCharacterClasses() {
  characterlist.classList.toggle("active");
  characterArrowIcon.classList.toggle("rotate");
}

// counting characters length and giving number to HTML
totalCharacters.textContent = `(Total ${characterOptions.length})`;

// const overlay = document.querySelector(".overlay");

// overlay.addEventListener("click", function () {
//   characterlist.classList.remove("active");
//   characterArrowIcon.classList.remove("rotate");

//   knowledgelist.classList.remove("active");
//   knowledgeArrowIcon.classList.remove("rotate");
// });

const elementSmall = document.querySelector("small");

window.addEventListener("click", function (e) {
  if (
    knowledgelist.classList.contains("active") &&
    e.target !== knowledgeInput &&
    e.target !== knowledgelist
  ) {
    knowledgelist.classList.remove("active");
    knowledgeArrowIcon.classList.toggle("rotate");
  } else if (
    characterlist.classList.contains("active") &&
    e.target !== characterInput &&
    e.target !== characterlist &&
    e.target !== elementSmall
  ) {
    characterlist.classList.remove("active");
    characterArrowIcon.classList.toggle("rotate");
  } else return;
});
