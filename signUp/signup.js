
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

    if (!phone || !/^\d{10}$/.test(phone)) {
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
        return;
    }

    // SUCCESS
    msg.textContent = "Signup successful! Redirecting...";
    msg.style.color = "green";

    setTimeout(() => {
        window.location.href = "../signIn/signin.html";
    }, 1000);
}


