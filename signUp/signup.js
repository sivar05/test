function signup() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();
    const msg = document.getElementById('message');

    if (!username || !password || !email || !phone || !confirmPassword) {
        msg.textContent = "All fields are required!";
        msg.style.color = "red";
        return;
    }
    if (!email.includes("@") || !email.includes(".")) {
        msg.textContent = "Please enter a valid email address!";
        msg.style.color = "red";
        return;
    }   
    
    const phon = phone.replace(/\D/g, '');
    if(phon.length !== 10 || isNaN(phone)) {
        msg.textContent = "Please enter a valid 10-digit phone number!";
        msg.style.color = "red";
        return;
    }


    if (password !== confirmPassword) {
        msg.textContent = "Passwords do not match!";
        msg.style.color = "red";
        return;
    }

    // SUCCESS (NO POPUP)
    msg.textContent = "Signup successful! Redirecting...";
    msg.style.color = "green";

    setTimeout(() => {
        window.location.href = "../signIn/signin.html";
    }, 1000);
}

