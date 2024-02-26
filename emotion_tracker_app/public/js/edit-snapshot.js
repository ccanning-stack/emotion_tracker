
//With aid of ChatGPT - functions to prompt for user confirmation before submitting 
//correct path for saving edits/deletion of snapshot

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('editForm');
  let lastClickedButton = null;

  // Track the last button clicked within the form
  Array.from(form.querySelectorAll('button[type="submit"]')).forEach(button => {
      button.addEventListener('click', function() {
          lastClickedButton = this; // Store the last button clicked
      });
  });

  form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent the form from submitting immediately

      if (!lastClickedButton) {
          return; // Exit if no button was clicked (shouldn't happen in normal operation)
      }

      let formAction = lastClickedButton.getAttribute('data-path');

      // Confirm action based on the button clicked
      let confirmationMessage = lastClickedButton.value === 'save' ?
          'Are you sure you want to save these edits?' :
          'Are you sure you want to delete this snapshot?';

      if (!confirm(confirmationMessage)) {
          return; // Stop the form submission if the user cancels
      }

      // Set the form's action and submit the form
      form.action = formAction;
      form.submit();
  });
});




//With aid of ChatGPT - function to show save edits button only when there has been a change in form data

function showButton() {
  const button = document.getElementById('saveButton');
  button.style.display = 'block';
}

// Attach change event listeners to all input fields in the form
const form = document.getElementById('editForm');
const inputs = form.querySelectorAll('input');

inputs.forEach(input => {
  input.addEventListener('input', showButton);
});


/*
SLIDERS - disabled in edit form- Kept in case of need for more edits in future
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range
https://www.w3schools.com/howto/howto_js_rangeslider.asp/
*/

document.addEventListener('DOMContentLoaded', function () {
const angerValue2 = document.getElementById("anger-value2");
const angerInput2 = document.getElementById("anger-slider2");
angerValue2.textContent = angerInput2.value;
angerInput2.addEventListener("input", (event) => {
  angerValue2.textContent = event.target.value;
});
});

const contemptValue2 = document.getElementById("contempt-value2");
const contemptInput2 = document.getElementById("contempt-slider2");
contemptValue2.textContent = contemptInput2.value;
contemptInput2.addEventListener("input", (event) => {
  contemptValue2.textContent = event.target.value;
});

const disgustValue2 = document.getElementById("disgust-value2");
const disgustInput2 = document.getElementById("disgust-slider2");
disgustValue2.textContent = disgustInput2.value;
disgustInput2.addEventListener("input", (event) => {
  disgustValue2.textContent = event.target.value;
});

const enjoymentValue2 = document.getElementById("enjoyment-value2");
const enjoymentInput2 = document.getElementById("enjoyment-slider2");
enjoymentValue2.textContent = enjoymentInput2.value;
enjoymentInput2.addEventListener("input", (event) => {
  enjoymentValue2.textContent = event.target.value;
});

const fearValue2 = document.getElementById("fear-value2");
const fearInput2 = document.getElementById("fear-slider2");
fearValue2.textContent = fearInput2.value;
fearInput2.addEventListener("input", (event) => {
  fearValue2.textContent = event.target.value;
});


const sadnessValue2 = document.getElementById("sadness-value2");
const sadnessInput2 = document.getElementById("sadness-slider2");
sadnessValue2.textContent = sadnessInput2.value;
sadnessInput2.addEventListener("input", (event) => {
  sadnessValue2.textContent = event.target.value;
});


const surpriseValue2 = document.getElementById("surprise-value2");
const surpriseInput2 = document.getElementById("surprise-slider2");
surpriseValue2.textContent = surpriseInput2.value;
surpriseInput2.addEventListener("input", (event) => {
  surpriseValue2.textContent = event.target.value;
});