// UNIVERSAL PATH HANDLER
function goTo(path) {
  let base = (location.hostname === "sivar05.github.io") ? "/test/" : "../";
  window.location.href = base + path;
}

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("changepassword");
  if (btn) btn.addEventListener("click", resetPassword);
});

function resetPassword() {

  const msg = document.getElementById("message");

  // safety check
  if (!msg) {
    console.error("message element missing in HTML");
    return;
  }

  clearError("email-error");
  clearError("old-error");
  clearError("password-error");
  clearError("confirm-error");
  clearError("check-error");
  clearError("password-match-error");

  const email = document.getElementById("email").value.trim();
  const oldPassword = document.getElementById("oldPassword").value.trim();
  const newPassword = document.getElementById("newPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailpattern.test(email)) {
    document.getElementById("email-error").innerText = "Please enter valid email";
    msg.style.color = "red";
    return;
  }

  if (!oldPassword) {
    document.getElementById("old-error").innerText = "Enter old password";
    return;
  }

  if (!newPassword) {
    document.getElementById("password-error").innerText = "Enter new password";
    return;
  }

  if (!confirmPassword) {
    document.getElementById("confirm-error").innerText = "Confirm password";
    return;
  }

  if (newPassword !== confirmPassword) {
    document.getElementById("check-error").innerText = "Passwords not matching";
    return;
  }

  if (oldPassword === newPassword) {
    document.getElementById("password-match-error").innerText =
      "Old & new password cannot be same";
    return;
  }

  fetch("http://localhost:3000/api/change-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, oldPassword, newPassword })
  })
  .then(async res => {
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  })
  .then(data => {
    msg.style.color = "green";
    msg.innerText = data.message;
    alert("Password updated successfully");
    setTimeout(() => goTo("index.html"), 1000);
  })
  .catch(err => {
    msg.style.color = "red";
    msg.innerText = err.message || "Password update failed";
  });
}

function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.innerText = "";
}