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
   
  
  const API_BASE =
  location.hostname === "sivar05.github.io"
    ? "https://signup-api.up.railway.app"
    : "http://localhost:3000";

fetch(`${API_BASE}/api/password/changepassword`, {
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

/* =========================
   PASSWORD TOGGLE
========================= */
function handlePasswordInput(input) {
    const icon = input.nextElementSibling;
    if (!icon) return;

    if (input.value.length > 0) {
        icon.style.display = "block";
    } else {
        icon.style.display = "none";
        input.type = "password";
        icon.src = getEyeIcon("close");
    }
}

function togglePassword(icon) {
    if (!icon) return;

    const input = icon.previousElementSibling;
    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
        icon.src = getEyeIcon("open");
    } else {
        input.type = "password";
        icon.src = getEyeIcon("close");
    }
}

function getEyeIcon(type) {
    const base =
        location.hostname === "sivar05.github.io"
            ? "/test/image/symbol/"
            : "../image/symbol/";

    return base + (type === "open" ? "eye_open.png" : "eye_close.png");
}




function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.innerText = "";
}