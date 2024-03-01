document.addEventListener('DOMContentLoaded', function () {

    const message = document.getElementById('email_exists_msg');

    // Set a timeout to hide the message after 5 seconds
    setTimeout(function () {
        // Hide the message by changing its display style
        message.style.display = 'none';
    }, 5000); // Adjust time here as needed
});

// https://stackoverflow.com/questions/21727317/how-to-check-confirm-password-field-in-form-without-reloading-page
var check = function() {
    if (document.getElementById('password-input').value ==
      document.getElementById('passconfirm-input').value) {
      document.getElementById('match_message').style.color = 'green';
      document.getElementById('match_message').innerHTML = 'matching';

    } else {
      document.getElementById('match_message').style.color = 'red';
      document.getElementById('match_message').innerHTML = 'not matching';
    }
  }