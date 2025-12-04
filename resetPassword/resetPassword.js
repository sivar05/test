function resetPassword() {
    let newPassword = document.getElementById("newPassword").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (newPassword === "" || confirmPassword === "") {
        alert("Please enter New Password and Confirm Password!");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    document.getElementById("password-error").value = "";
    document.getElementById("confirm-error").value = "";

    // Success → popup shows → auto redirect
    alert("Password reset successful!", true);
    window.location.href = "../signIn/signin.html";
}

function showPopup(message, redirect = false) {
    document.getElementById("popupText").textContent = message;

    // show popup
    document.getElementById("popup").style.display = "flex";

    // auto close after 1 second
    setTimeout(() => {
        document.getElementById("popup").style.display = "none";

        if (redirect) {
            window.location.href = "../signIn/signin.html";
        }

    }, 1000);
}

// Button listener
document.getElementById("resetPasswordBtn").addEventListener("click", resetPassword);
