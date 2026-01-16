const form = document.querySelector("form");

const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const consent = document.querySelector("#consent");
const queryRadios = document.querySelectorAll("input[name='query']");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  clearErrors();

  let valid = true;

  if (!firstname.value.trim()) {
    setError(firstname, "This field is required");
    valid = false;
  }

  if (!lastname.value.trim()) {
    setError(lastname, "This field is required");
    valid = false;
  }

  if (!validateEmail(email.value)) {
    setError(email, "Please enter a valid email address");
    valid = false;
  }

  if (!isRadioChecked(queryRadios)) {
    setGroupError(".query-container", "Please select a query type");
    valid = false;
  }

  if (!message.value.trim()) {
    setError(message, "This field is required");
    valid = false;
  }

  if (!consent.checked) {
    setGroupError(".consent-container", "To submit this form, please consent to being contacted");
    valid = false;
  }

  if (valid) {
    showSuccessMessage();
    form.reset();
  }
});

/* ---------- Helpers ---------- */

function setError(input, message) {
  input.classList.add("input-error");
  input.nextElementSibling.textContent = message;
}

function setGroupError(selector, message) {
  const container = document.querySelector(selector);
  const error = container.querySelector(".error");
  error.textContent = message;
}

function showSuccessMessage() {
  const message = document.getElementById("successMessage");
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
  }, 4000); 
}


function clearErrors() {
  document.querySelectorAll(".error").forEach(err => err.textContent = "");
  document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isRadioChecked(radios) {
  return [...radios].some(r => r.checked);
}
