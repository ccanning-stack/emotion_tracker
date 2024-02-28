//With aid of ChatGPT (chat.openai.com) - function that hides successful update message for 5 secs

document.addEventListener('DOMContentLoaded', function() {
  
  const message = document.getElementById('action_successful_msg');
      
      // Set a timeout to hide the message after 5 seconds
      setTimeout(function() {
        // Hide the message by changing its display style
        message.style.display = 'none';
      }, 5000); // Adjust time here as needed
    });
  