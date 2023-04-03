document.addEventListener('DOMContentLoaded', function () {
  document.querySelector("#subscribe-button-id").addEventListener("click", function () {
    document.getElementById('subscribe-result-id').style.display = "none";
    let email = document.getElementById("email-id").value;
    if (email === "") {
      document.getElementById('email-id').classList.add('subscription-box-input-error');
      document.getElementById('button-box-id').classList.add('subscription-box-button-error');
      document.getElementById('subscribe-error-id').innerHTML = "Please input your email address";
      document.getElementById('subscribe-error-id').style.display = "block";
    } else {
      if (validateEmail(email)) {
        document.getElementById('email-id').classList.remove('subscription-box-input-error');
        document.getElementById('button-box-id').classList.remove('subscription-box-button-error');
        document.getElementById('subscribe-error-id').innerHTML = "";
        document.getElementById('subscribe-error-id').style.display = "none";
        document.getElementById('subscribe-result-id').style.display = "block";
        document.getElementById("email-id").value = "";
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