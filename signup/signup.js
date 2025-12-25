/* =========================
   SIGNUP
========================= */
function signup() {
  const msg = document.getElementById("message");
  const form = document.querySelector("form");

  msg.style.color = "";
  msg.innerText = "";

  if (!validateSignupForm()) return;

  const API_BASE =
    location.hostname === "sivar05.github.io"
      ? "https://signup-api.up.railway.app"
      : "http://localhost:3000";

  fetch(`${API_BASE}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      username: document.getElementById("username").value.trim(),
      email: document.getElementById("email").value.toLowerCase().trim(),
      mobilenumber: document.getElementById("mobilenumber").value.trim(),
      password: document.getElementById("password").value,
      confirmPassword: document.getElementById("confirmPassword").value
    })
  })
    .then(async response => {
      let data;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid server response");
      }

      if (!response.ok) {
        if (response.status === 409) throw new Error("User already exists");
        if (response.status === 422) throw new Error("Validation failed");
        if (response.status >= 500) throw new Error("Server error");
        throw new Error(data.message || "Signup failed");
      }

      return data;
    })
    .then(data => {
      msg.style.color = "green";
      msg.innerText = data.message || "Account created successfully";
      if (form) form.reset();
      setTimeout(() => {
        goTo("signin/signin.html");
      }, 1500);
    })
    .catch(err => {
      msg.style.color = "red";

      if (err.message.includes("Failed to fetch")) {
        msg.innerText = "Cannot connect to server";
      } else {
        msg.innerText = err.message;
      }
    });
}

/* =========================
   VALIDATION
========================= */
function validateSignupForm() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobilenumber = document.getElementById("mobilenumber").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const msg = document.getElementById("message");

  msg.innerText = "";

  if (!username || !email || !mobilenumber || !password || !confirmPassword) {
    msg.style.color = "red";
    msg.innerText = "All fields are required";
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    msg.style.color = "red";
    msg.innerText = "Invalid email address";
    return false;
  }

  if (password === "" || password.length < 5) {
    msg.style.color = "red";
    msg.innerText = "Password must be at least 5 characters";
    return false;
  }

  if (password !== confirmPassword) {
    msg.style.color = "red";
    msg.innerText = "Passwords do not match";
    return false;
  }

  return true;
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

/* =========================
   NAVIGATION & HELPERS
========================= */
function goTo(path) {
  const base = location.hostname === "sivar05.github.io" ? "/test/" : "../";
  window.location.href = base + path;
}

function goBack() {
  goTo("signin/signin.html");
}

function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.innerText = "";
}
