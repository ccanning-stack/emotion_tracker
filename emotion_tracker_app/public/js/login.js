//With aid of ChatGPT (chat.openai.com) -functions that hide information
//messages after a specified time

document.addEventListener('DOMContentLoaded', function () {

    const message = document.getElementById('account_successful_msg');

    setTimeout(function () {
        message.style.display = 'none';
    }, 5000);
});

document.addEventListener('DOMContentLoaded', function () {

    const message = document.getElementById('invalid_credentials_msg');

    setTimeout(function () {
        message.style.display = 'none';
    }, 5000); 
});

document.addEventListener('DOMContentLoaded', function () {

    const message = document.getElementById('pwd_change_ok_msg');

    setTimeout(function () {
        message.style.display = 'none';
    }, 5000); 
});

function displayUsernameReminder() {
    const usernameReminderMsg = "Username is an email address";
    const reminderElement = document.getElementById("username_reminder_msg");
    reminderElement.textContent = usernameReminderMsg;
    
    setTimeout(function() {
      reminderElement.textContent = "";
    }, 2000);
  }
  
document.getElementById("forgotUsernameBtn").addEventListener("click", displayUsernameReminder);