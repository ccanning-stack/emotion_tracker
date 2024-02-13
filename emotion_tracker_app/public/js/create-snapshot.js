//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range

const enjoymentValue = document.querySelector("#enjoyment-value");
const enjoymentInput = document.querySelector("#enjoyment-slider");
enjoymentValue.textContent = enjoymentInput.value;
enjoymentInput.addEventListener("input", (event) => {
  enjoymentValue.textContent = event.target.value;
});


const sadnessValue = document.querySelector("#sadness-value");
const sadnessInput = document.querySelector("#sadness-slider");
sadnessValue.textContent = sadnessInput.value;
sadnessInput.addEventListener("input", (event) => {
  sadnessValue.textContent = event.target.value;
});


const angerValue = document.querySelector("#anger-value");
const angerInput = document.querySelector("#anger-slider");
angerValue.textContent = angerInput.value;
angerInput.addEventListener("input", (event) => {
  angerValue.textContent = event.target.value;
});

const contemptValue = document.querySelector("#contempt-value");
const contemptInput = document.querySelector("#contempt-slider");
contemptValue.textContent = contemptInput.value;
contemptInput.addEventListener("input", (event) => {
  contemptValue.textContent = event.target.value;
});

const disgustValue = document.querySelector("#disgust-value");
const disgustInput = document.querySelector("#disgust-slider");
disgustValue.textContent = disgustInput.value;
disgustInput.addEventListener("input", (event) => {
  disgustValue.textContent = event.target.value;
});

const fearValue = document.querySelector("#fear-value");
const fearInput = document.querySelector("#fear-slider");
fearValue.textContent = fearInput.value;
fearInput.addEventListener("input", (event) => {
  fearValue.textContent = event.target.value;
});

const surpriseValue = document.querySelector("#surprise-value");
const surpriseInput = document.querySelector("#surprise-slider");
surpriseValue.textContent = surpriseInput.value;
surpriseInput.addEventListener("input", (event) => {
  surpriseValue.textContent = event.target.value;
});
