function handleEmailInput() {
  const emailInput = document.getElementById("email");
  const button = document.getElementById("sendLinkBtn");
  const message = document.getElementById("message");

  const email = emailInput.value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    button.style.display = "block";
    message.textContent = "";
  } else {
    button.style.display = "none";
    message.textContent = "Enter a valid email address";
  }
}

function sendResetLink() {
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message");

  if (!email) {
    message.textContent = "Email is required";
    return;
  }

  message.style.color = "black";
  message.textContent = "Sending reset link...";

  fetch("http://localhost:3000/api/send-reset-link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      // success message
      message.style.color = "green";
      message.textContent = data.message || "Reset link sent";

      // ⏳ redirect after 2 seconds
      setTimeout(() => {
        goTo("resetpassword/resetpassword.html");
      }, 2000);
    })
    .catch(() => {
      message.style.color = "red";
      message.textContent = "Failed to send reset link";
    });
}

// PATH HANDLER
function goTo(path) {
  let base = (location.hostname === "sivar05.github.io") ? "/test/" : "../";
  window.location.href = base + path;
}
