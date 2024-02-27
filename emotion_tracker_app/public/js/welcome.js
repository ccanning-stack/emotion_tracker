//With aid of ChatGPT (chat.openai.com) - function that displays successful logout message for 5 secs

document.addEventListener('DOMContentLoaded', function() {
  
    const message = document.getElementById('logout_successful_msg');
        
        // Set a timeout to hide the message after 5 seconds (5000 milliseconds)
        setTimeout(function() {
          // Hide the message by changing its display style
          message.style.display = 'none';
        }, 5000); // Adjust time here as needed
      });