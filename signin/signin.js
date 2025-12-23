
// UNIVERSAL PATH HANDLER (LOCAL + GITHUB PAGES)
function goTo(path) {
    let base = "";

    // Detect GitHub Pages domain
    if (location.hostname === "sivar05.github.io") {
        base = "/test/"; // Your repository name
    }else {
        base = "../"; 
    }
    window.location.href = base + path;
}
let popupCallback = null;

// Show popup
function popup(message, callback) {
    document.getElementById("popupText").textContent = message;
    popupCallback = callback || null;
    document.getElementById("popup").style.display = "flex";
}

// Close popup
function closePopup() {
    document.getElementById("popup").style.display = "none";

    if (popupCallback) {
        popupCallback();
        popupCallback = null;
    }
}

// LOGIN
// In signin.js - Add more debugging
function login() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  
  console.log('🔍 Login attempt:', { email, password });
  
  const API_BASE =
    location.hostname === "sivar05.github.io"
      ? "https://signup-api.up.railway.app"
      : "http://localhost:3000";
      
  fetch(`${API_BASE}/api/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password
    })
  })
  .then(async response => {
    console.log("📥 Response status:", response.status);
    console.log("📥 Response headers:", response.headers);
    
    const text = await response.text();
    console.log("📥 Response text:", text);
    
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("❌ JSON parse error:", e);
      throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`);
    }
  })
  .then(data => {
    console.log("✅ Login successful data:", data);
    popup("Login Successful!", () => {
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      goTo("homepage/home.html");
    });
  })
  .catch(err => {
    console.error("❌ Full login error:", err);
    popup(err.message || "Login failed. Please try again.");
  });     
}

// ...........Recent password type-------------//
function showPassword() {
  document.getElementById("password").type = "text";
}

function hidePassword() {
  document.getElementById("password").type = "password";
}

function toggleEye() {
  const password = document.getElementById("password");
  const eyeIcon = document.getElementById("eyeIcon");

  if (password.value.length > 0) {
    eyeIcon.style.display = "block"; // show icon only when typing
  } else {
    eyeIcon.style.display = "none";  // hide if empty
    password.type = "password";      // safety
  }
}



// Clear error text
function clearError(errorId) {
    document.getElementById(errorId).innerText = "";
}

//for console test
async function testAPI() {
  const testURLs = [
    'https://signup-api.up.railway.app/api/auth/signin',
    'https://signup-api.up.railway.app/',
    'https://your-backend.onrender.com/api/auth/signin', // if using render
    'http://localhost:3000/api/auth/signin' // local test
  ];
  
  for (const url of testURLs) {
    try {
      console.log('Testing:', url);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: 'test', password: 'test'})
      });
      console.log(`${url}: ${response.status}`);
    } catch (error) {
      console.log(`${url}: ERROR -`, error.message);
    }
  }
}

//Exit-back

(function () {
    // Push fake history state
    history.pushState(null, null, location.href);

    window.addEventListener("popstate", function () {
        let exitConfirm = confirm("Do you want to exit?");

        if (exitConfirm) {
            // Android WebView support
            if (navigator.userAgent.includes("Android")) {
                window.location.href = "about:blank";
            } else {
                window.open('', '_self');
                window.close();
            }
        } else {
            // Stay on same page
            history.pushState(null, null, location.href);
        }
    });
})();



//Password show/hide
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);

    if (input.type === "password") {
        input.type = "text";
        icon.src = "image/symbol/view.png";
    } else {
        input.type = "password";
        icon.src = "image/symbol/hide.png";
    }
}


// REDIRECT TO SIGN UP
function redirectToSignUp() {
    popup("Redirecting to Signup Page...", () => {
        goTo("signup/signup.html");
    });
}

// REDIRECT TO FORGOT PASSWORD
function forgotPassword() {
    popup("Redirecting to Password Recovery Page...", () => {
        goTo("forgotpassword/forgotpassword.html");
    });
}

// REDIRECT TO FORGOT EMAIL
function forgotEmail() {
    popup("Redirecting to Email Recovery Page...", () => {
        goTo("forgotemail/forgotemail.html");
    });
}

// Close popup when clicking outside
window.addEventListener("click", function(event) {
    let popupElement = document.getElementById("popup");
    if (event.target === popupElement) {
        closePopup();
    }
});

// Close popup with ESC key
window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        let popupElement = document.getElementById("popup");
        if (popupElement.style.display === "flex") {
            closePopup();
        }
    }
});


function handlePasswordInput() {
    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (password.value.length > 0) {
        eyeIcon.style.display = "block";
    } else {
        eyeIcon.style.display = "none";
        password.type = "password"; // force hide
        eyeIcon.src = "image/symbol/close.png";
    }
}

