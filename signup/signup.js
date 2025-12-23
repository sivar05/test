// SIGNUP with improved error handling
function signup() {
  const msg = document.getElementById("message");
  const form = document.querySelector("form"); // Get form element
  
  msg.style.color = "";
  msg.innerText = "";
  
  // Validate inputs first
  if (!validateSignupForm()) {
    return;
  }

  const API_BASE =
    location.hostname === "sivar05.github.io"
      ? "https://signup-api.up.railway.app"
      : "http://localhost:3000";

  console.log("📡 Sending signup request to:", API_BASE);

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
    console.log("📥 Response status:", response.status);
    
    // Try to parse JSON, but handle non-JSON responses
    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw new Error(`Server returned invalid JSON (${response.status})`);
    }
    
    if (!response.ok) {
      // Handle specific status codes
      if (response.status === 422) {
        throw new Error(data.errors?.[0]?.msg || "Validation failed");
      }
      if (response.status === 409) {
        throw new Error(data.message || "User already exists");
      }
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.");
      }
      throw new Error(data.message || `Error ${response.status}`);
    }
    
    return data;
  })
  .then(data => {
    console.log("✅ Signup successful:", data);
    msg.style.color = "green";
    msg.innerText = data.message || "Account created successfully!";
    
    // Clear form only if form exists
    if (form) {
      form.reset();
    } else {
      // Clear fields manually
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
      document.getElementById("mobilenumber").value = "";
      document.getElementById("password").value = "";
      document.getElementById("confirmPassword").value = "";
    }
    
    setTimeout(() => {
      goTo("signin/signin.html");
    }, 1500);
  })
  .catch(err => {
    console.error("❌ Signup error:", err);
    msg.style.color = "red";
    
    // More specific error messages
    if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      msg.innerText = "Cannot connect to server. Make sure the server is running.";
    } else if (err.message.includes('NetworkError')) {
      msg.innerText = "Network error. Check your internet connection.";
    } else if (err.message.includes('CORS')) {
      msg.innerText = "CORS error. Server might not be configured properly.";
    } else if (err.message.includes('Cannot read properties of null')) {
      msg.innerText = "Form error. Account created but redirection failed.";
    } else {
      msg.innerText = err.message || "Signup failed. Please try again.";
    }
  });
}

// Form validation function
function validateSignupForm() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobilenumber = document.getElementById("mobilenumber").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const msg = document.getElementById("message");
  
  // Clear previous message
  msg.innerText = "";
  
  // Basic validation
  if (!username || !email || !mobilenumber || !password || !confirmPassword) {
    msg.style.color = "red";
    msg.innerText = "All fields are required";
    return false;
  }
  
  if (password !== confirmPassword) {
    msg.style.color = "red";
    msg.innerText = "Passwords do not match";
    return false;
  }
  
  if (password.length < 8) {
    msg.style.color = "red";
    msg.innerText = "Password must be at least 8 characters";
    return false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    msg.style.color = "red";
    msg.innerText = "Please enter a valid email address";
    return false;
  }
  
  return true;
}

//Go-Back function
function goBack() { 
  goTo("signin/signin.html");
}

function showPassword(fieldId) {
  document.getElementById(fieldId).type = "text";
}

function hidePassword(fieldId) {
  document.getElementById(fieldId).type = "password";
}


// PATH HANDLER
function goTo(path) {
  let base = (location.hostname === "sivar05.github.io") ? "/test/" : "../";
  window.location.href = base + path;
}

function clearError(id) {
  const el = document.getElementById(id);
  if (el) el.innerText = "";
}