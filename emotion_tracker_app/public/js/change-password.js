var check2 = function() {
    if (document.getElementById('password-change-1').value ==
      document.getElementById('password-change-2').value) {
      document.getElementById('match_message').style.color = 'green';
      document.getElementById('match_message').innerHTML = 'matching';

    } else {
      document.getElementById('match_message').style.color = 'red';
      document.getElementById('match_message').innerHTML = 'not matching';
    }
  }