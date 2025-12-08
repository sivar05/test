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
function login() {
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (email === "" && password === "") {
        popup("Please enter Email and Password!");
        return;
    }

    if (email === "") {
        popup("Please enter your Email!");
        return;
    }

    if (password === "") {
        popup("Please enter your Password!");
        return;
    }

    if (email === "siva@test.in" && password === "12345") {
        popup("Login Successful!", () => {
            goTo("homepage/home.html");
        });
    } else {
        popup("Invalid Email or Password!");
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

// UNIVERSAL PATH HANDLER (LOCAL + GITHUB PAGES)
function goTo(path) {
    let base = "";

    // Detect GitHub Pages domain
    if (location.hostname === "sivar05.github.io") {
        base = "/test/"; // Your repository name
    }

    window.location.href = base + path;
}