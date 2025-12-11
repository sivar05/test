// UNIVERSAL PATH HANDLER
function goTo(path) {
    let base = (location.hostname === "sivar05.github.io") ? "/test/" : "../";
    window.location.href = base + path;
}

// Attach event after load
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("resetPasswordBtn").addEventListener("click", resetPassword);
});

function resetPassword() {
    let oldPassword = document.getElementById("oldPassword").value.trim();
    let newPassword = document.getElementById("newPassword").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Validation
    if (oldPassword === "") {
        document.getElementById("old-error").innerText = "Please enter Old Password!";
        return;
    }

    if (newPassword === "") {
        document.getElementById("password-error").innerText = "Please enter New Password!";
        return;
    }

    if (confirmPassword === "") {
        document.getElementById("confirm-error").innerText = "Please enter Confirm Password!";
        return;
    }

    if (newPassword !== confirmPassword) {
        document.getElementById("check-error").innerText = "Passwords do not match!";
        return;
    }

    // Clear errors
    clearError('old-error');
    clearError('password-error');
    clearError('confirm-error');
    clearError('check-error');

    alert("Password reset successful!");

    setTimeout(() => { goTo("index.html"); }, 1000);
}


//Password show/hide
function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);

    if (!input) {
        console.error("Input not found: " + inputId);
        return;
    }

    if (input.type === "password") {
        input.type = "text";
        icon.src = "../image/symbol/view.png";
    } else {
        input.type = "password";
        icon.src = "../image/symbol/hide.png";
    }
}



// Clear error text
function clearError(errorId) {
    document.getElementById(errorId).innerText = "";
}
