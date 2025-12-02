function resetPassword() {
    let newPassword = document.getElementById("newPassword").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (newPassword === "" || confirmPassword === "") {
        showPopup("Please enter New Password and Confirm Password!");
        return;
    }

    if (newPassword !== confirmPassword) {
        showPopup("Passwords do not match!");
        return;
    }

    // Success → popup shows → auto redirect
    showPopup("Password reset successful!", true);
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
