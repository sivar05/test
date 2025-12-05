
//reset Password
function forgotpassword() {
   
    let email = document.getElementById("email").value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if (!emailPattern.test(email)) {
    alert("Please enter a valid Email!");
    return;
}
    alert("Password reset link has been sent to your email!", "Success");
    // Redirect to login page after successful password reset
    window.location.href = "../index.html";
}
function forgotPassword() {
    popup("Redirecting to Password Recovery Page...", () => {
        goTo("forgotpassword/forgotpassword.html");
    });
}


