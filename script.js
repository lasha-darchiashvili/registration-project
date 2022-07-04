let knowledgeInput = document.querySelector(".aroundknowledge");
let knowledgelist = document.querySelector(".forknowledge ul");
let knowledgeOptions = document.querySelectorAll(".knowledgelist li");
let knowledgeValue = document.querySelector(".knowledge");
let knowledgeArrowIcon = document.querySelector(".aroundknowledge .arrow-down");

let characterInput = document.querySelector(".aroundcharacter");
let characterlist = document.querySelector(".forcharacter ul");
let characterOptions = document.querySelectorAll(".characterlist li");
let characterValue = document.querySelector(".character");
let characterArrowIcon = document.querySelector(".aroundcharacter .arrow-down");

knowledgeInput.addEventListener("click", function () {
  toggleKnowledgeClasses();
});

knowledgeOptions.forEach((option) => {
  option.addEventListener("click", function () {
    knowledgeValue.textContent = option.textContent;
    toggleKnowledgeClasses();
  });
});

function toggleKnowledgeClasses() {
  knowledgelist.classList.toggle("active");
  knowledgeArrowIcon.classList.toggle("rotate");
}

characterInput.addEventListener("click", function () {
  toggleCharacterClasses();
});

characterOptions.forEach((option) => {
  option.addEventListener("click", function () {
    characterValue.textContent = option.textContent;
    toggleCharacterClasses();
  });
});

function toggleCharacterClasses() {
  characterlist.classList.toggle("active");
  characterArrowIcon.classList.toggle("rotate");
}
