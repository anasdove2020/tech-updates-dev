document.addEventListener('DOMContentLoaded', function () {
  const siteKey = window.siteKey;
  const apiUrl = window.apiUrl;
  document.querySelector("#subscribe-button-id").addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById('subscribe-result-id').style.display = "none";
    let email = document.getElementById("email-id").value;
    if (email === "") {
      document.getElementById('email-id').classList.add('subscription-box-input-error');
      document.getElementById('button-box-id').classList.add('subscription-box-button-error');
      document.getElementById('subscribe-error-id').innerHTML = "Please input your email address";
      document.getElementById('subscribe-error-id').style.display = "block";
    } else {
      if (validateEmail(email)) {
        grecaptcha.ready(function () {
          try {
            grecaptcha.execute(siteKey, { action: 'submit' }).then(function () {
              const data = {
                email: email
              };

              fetch(apiUrl + '/api/Subscription', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
                .then(response => {
                  if (response.status === 200) {
                    console.log('Success: ', response);
                    document.getElementById('email-id').classList.remove('subscription-box-input-error');
                    document.getElementById('button-box-id').classList.remove('subscription-box-button-error');
                    document.getElementById('subscribe-error-id').innerHTML = "";
                    document.getElementById('subscribe-error-id').style.display = "none";
                    document.getElementById('subscribe-result-id').style.display = "block";
                    document.getElementById("email-id").value = "";
                  } else if (response.status === 400) {
                    console.error('Bad Request: ', response);
                  } else if (response.status === 500) {
                    console.error('Internal Server Error: ', response);
                  } else {
                    console.error('Unexpected error occurred: ', response);
                  }
                })
                .catch(error => {
                  console.error('Error:', error);
                });
            });
          } catch {
            document.getElementById('email-id').classList.add('subscription-box-input-error');
            document.getElementById('button-box-id').classList.add('subscription-box-button-error');
            document.getElementById('subscribe-error-id').innerHTML = "There is something wrong with google reCAPTCHA. Please contact your administrator.";
            document.getElementById('subscribe-error-id').style.display = "block";
          }
        });
      } else {
        document.getElementById('email-id').classList.add('subscription-box-input-error');
        document.getElementById('button-box-id').classList.add('subscription-box-button-error');
        document.getElementById('subscribe-error-id').innerHTML = "Invalid email address";
        document.getElementById('subscribe-error-id').style.display = "block";
      }
    }
  });

  document.querySelector("#email-id").addEventListener("keyup", function () {
    document.getElementById('email-id').classList.remove('subscription-box-input-error');
    document.getElementById('button-box-id').classList.remove('subscription-box-button-error');
    document.getElementById('subscribe-error-id').innerHTML = "";
    document.getElementById('subscribe-error-id').style.display = "none";
  });
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}