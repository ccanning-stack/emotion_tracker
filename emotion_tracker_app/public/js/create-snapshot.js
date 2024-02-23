

/*
SLIDERS
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
https://www.w3schools.com/howto/howto_js_rangeslider.asp/
*/

const angerValue = document.getElementById("anger-value");
const angerInput = document.getElementById("anger-slider");
angerValue.textContent = angerInput.value;
angerInput.addEventListener("input", (event) => {
  angerValue.textContent = event.target.value;
});

const contemptValue = document.getElementById("contempt-value");
const contemptInput = document.getElementById("contempt-slider");
contemptValue.textContent = contemptInput.value;
contemptInput.addEventListener("input", (event) => {
  contemptValue.textContent = event.target.value;
});

const disgustValue = document.getElementById("disgust-value");
const disgustInput = document.getElementById("disgust-slider");
disgustValue.textContent = disgustInput.value;
disgustInput.addEventListener("input", (event) => {
  disgustValue.textContent = event.target.value;
});

const enjoymentValue = document.getElementById("enjoyment-value");
const enjoymentInput = document.getElementById("enjoyment-slider");
enjoymentValue.textContent = enjoymentInput.value;
enjoymentInput.addEventListener("input", (event) => {
  enjoymentValue.textContent = event.target.value;
});

const fearValue = document.getElementById("fear-value");
const fearInput = document.getElementById("fear-slider");
fearValue.textContent = fearInput.value;
fearInput.addEventListener("input", (event) => {
  fearValue.textContent = event.target.value;
});


const sadnessValue = document.getElementById("sadness-value");
const sadnessInput = document.getElementById("sadness-slider");
sadnessValue.textContent = sadnessInput.value;
sadnessInput.addEventListener("input", (event) => {
  sadnessValue.textContent = event.target.value;
});


const surpriseValue = document.getElementById("surprise-value");
const surpriseInput = document.getElementById("surprise-slider");
surpriseValue.textContent = surpriseInput.value;
surpriseInput.addEventListener("input", (event) => {
  surpriseValue.textContent = event.target.value;
});
