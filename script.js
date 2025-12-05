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
    const mail = email.replace(/\D/g, '');
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
           window.location.href = "../homepage/home.html";
        });
    } else {
        popup("Invalid Email or Password!");
    }
}

// REDIRECT TO SIGN UP
function redirectToSignUp() {
    window.location.href = "/signup/signup.html";
}

function forgotPassword() {
    popup("Redirecting to Password Recovery Page...", () => {
       window.location.href = "forgotpassword/forgotpassword.html";
    });
}
function forgotEmail() {
    popup("Redirecting to Email Recovery Page...", () => {
        window.location.href = "forgotemail/forgotemail.html";
    }
); 
}
// Event listener for forgot password link
document.getElementById("forgotPasswordLink").addEventListener("click", forgotPassword);
// Event listener for forgot email link
document.getElementById("forgotEmailLink").addEventListener("click", forgotEmail);

// Event listener for popup close button
document.getElementById("popupClose").addEventListener("click", closePopup);        

// Event listener for login button
document.getElementById("loginButton").addEventListener("click", login);

// Event listener for sign up redirect link
document.getElementById("signUpRedirect").addEventListener("click", redirectToSignUp);

// Optional: Allow closing popup by clicking outside the popup content
window.addEventListener("click", function(event) {
    let popupElement = document.getElementById("popup");    
    if (event.target === popupElement) {
        closePopup();
    }
});

// Optional: Allow closing popup with Escape key
window.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        let popupElement = document.getElementById("popup");
        if (popupElement.style.display === "flex") {
            closePopup();
        }
    }
});

// End of script.js

// Note: Ensure that the HTML elements with IDs used in this script exist in your HTML file.

