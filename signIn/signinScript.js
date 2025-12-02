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
           window.location.href = "../index.html";
        });
    } else {
        popup("Invalid Email or Password!");
    }
}

// FORGOT EMAIL
function forgotEmail() {
    window.location.href = "../forgotEmail/forgotEmail.html";
}

// FORGOT PASSWORD
function forgotPassword() {
    window.location.href = "../resetPassword/resetPassword.html";
}
