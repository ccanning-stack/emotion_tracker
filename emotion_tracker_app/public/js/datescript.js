/*
ChatGPT https://chat.openai.com/
This function constructs a string in the format YYYY-MM-DD HH:MM:SS by extracting
each part of the current date and time, 
padding single digits with leading zeros where necessary
*/

function getCurrentDateTimeFormatted() {
    const now = new Date();
  
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  
  //change date to current time when DOM Content Loads
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dateDisplay").textContent = getCurrentDateTimeFormatted();
  });
  