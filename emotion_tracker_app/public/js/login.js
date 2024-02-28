//With aid of ChatGPT (chat.openai.com) -function that hides account creation successful message for 5 secs

document.addEventListener('DOMContentLoaded', function () {

    const message = document.getElementById('account_successful_msg');

    // Set a timeout to hide the message after 5 seconds
    setTimeout(function () {
        // Hide the message by changing its display style
        message.style.display = 'none';
    }, 5000); // Adjust time here as needed
});

document.addEventListener('DOMContentLoaded', function () {

    const message = document.getElementById('invalid_credentials_msg');

    // Set a timeout to hide the message after 3 seconds
    setTimeout(function () {
        // Hide the message by changing its display style
        message.style.display = 'none';
    }, 3000); // Adjust time here as needed
});