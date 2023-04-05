document.addEventListener('DOMContentLoaded', function () {
  document.querySelector("#email-id").addEventListener("keyup", function () {
    document.getElementById('email-id').classList.remove('subscription-box-input-error');
    document.getElementById('button-box-id').classList.remove('subscription-box-button-error');
    document.getElementById('subscribe-error-id').innerHTML = "";
    document.getElementById('subscribe-error-id').style.display = "none";
  });
});

function onSubmit(token) {
  showLoading(true);
  const apiUrl = window.apiUrl;
  const functionKey = window.functionKey;
  if (token) {
    let email = document.getElementById("email-id").value;
    if (email === "") {
      showError("Please input your email address");
    } else {
      if (validateEmail(email)) {
        const data = {
          email: email,
          token: token
        };

        fetch(apiUrl + '/api/Subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-functions-key': functionKey
          },
          body: JSON.stringify(data)
        })
          .then(response => {
            if (response.status === 200) {
              setTimeout(function() {
                document.getElementById('subscribe-result-id').style.display = "none";
              }, 5000);
              document.getElementById('email-id').classList.remove('subscription-box-input-error');
              document.getElementById('button-box-id').classList.remove('subscription-box-button-error');
              document.getElementById('subscribe-error-id').innerHTML = "";
              document.getElementById('subscribe-error-id').style.display = "none";
              document.getElementById('subscribe-result-id').style.display = "block";
              document.getElementById("email-id").value = "";
              showLoading(false);
            } else if (response.status === 400) {
              return response.json().then(errorResponse => {
                showError(errorResponse.ErrorMessage);
              });
            } else {
              showError("Unexpected error occured. Please contact your administrator.");
            }
          })
          .catch(() => {
            showError("Unexpected error occured. Please contact your administrator.");
          });
      } else {
        showError("Invalid email address.");
      }
    }
  } else {
    showError("There is something wrong with google reCAPTCHA. Please contact your administrator.");
  }
}

function showLoading(shown) {
  if (shown) {
    document.getElementById('subscribe-button-id').innerHTML = '<i class="fa fa-spinner fa-spin"></i>';
    document.getElementById('subscribe-button-id').disabled = true;
  } else {
    document.getElementById('subscribe-button-id').innerHTML = "SUBSCRIBE";
    document.getElementById('subscribe-button-id').disabled = false;
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showError(message) {
  document.getElementById('email-id').classList.add('subscription-box-input-error');
  document.getElementById('button-box-id').classList.add('subscription-box-button-error');
  document.getElementById('subscribe-error-id').innerHTML = message;
  document.getElementById('subscribe-error-id').style.display = "block";
  showLoading(false);
}