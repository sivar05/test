// UNIVERSAL PATH HANDLER (LOCAL + GITHUB PAGES)
function goTo(path) {
    let base = "";

    if (location.hostname === "sivar05.github.io") {
        base = "/test/";  
    } else {
        base = "../";     
    }

    window.location.href = base + path;
}

// Attach event AFTER DOM is loaded
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
        document.getElementById("check-error").innerText ="Please check password and confirm password!";
        document.getElementById("confirmPassword").classList.add("error");
        return;
    }

    // Clear errors
    document.getElementById("old-error").innerText = "";
    document.getElementById("password-error").innerText = "";
    document.getElementById("confirm-error").innerText = "";
    document.getElementById("check-error").innerText = "";

    // Success message
    alert("Password reset successful!");

    // Redirect to homepage
    setTimeout(() => {
        goTo("index.html");
    }, 1000);
}

function clearError(inputId, errorId) {
    //document.getElementById(id).classList.remove("error");
    document.getElementById(errorId).innerText = "";
}
