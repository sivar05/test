
function clearError(id, errorId) {
    document.getElementById(id).classList.remove("error");
    document.getElementById(errorId).innerText = "";
}

function signup() {
    let email = document.getElementById("email").value.trim();
    let username = document.getElementById("username").value.trim();
    let phone = document.getElementById("mobilenumber").value.trim();
    let password = document.getElementById("password").value.trim();
    let confirm= document.getElementById("confirmPassword").value.trim();
    let msg = document.getElementById("message");   

    // INDIVIDUAL FIELD VALIDATION
    if (!email) {
       document.getElementById("email-error").innerText = "Please enter your e-mail address";
        return;
    }

    if (!username) {
        document.getElementById("username-error").innerText = "Please enter your username";
        return;
    }

    if (!phone || !/^\d{10}$/.test(phone)|| phone.length !== 10) {
        document.getElementById("mobile-error").innerText = "Please enter a valid 10-digit phone number!";
        return
        }

    if (!password) {
       document.getElementById("password-error").innerText = "Please enter your password";
        return;
    }

    if (!confirm) {
        document.getElementById("confirm-error").innerText = "Please enter your confirm password";
        return;
    }

    // EMAIL VALIDATION
    const emailpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailpattern.test(email)) {
        document.getElementById("email-error").innerText = "Please enter valid e-mail address";
        msg.style.color = "red";
        return;
    }

    // PASSWORD MATCH
  if (password !== confirm) {
    document.getElementById("check-error").innerText = "Please check password and confirm Password!";
    document.getElementById("confirmPassword").classList.add("error");
    return;
} else {
    // Clear error when passwords match
    document.getElementById("check-error").innerText = "";
}

    // SUCCESS
    msg.textContent = "Signup successful! Redirecting...";
    msg.style.color = "green";

    setTimeout(() => {
        window.location.href = "../homepage/home.html";
    }, 1000);
}


