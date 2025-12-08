// UNIVERSAL PATH HANDLER (LOCAL + GITHUB PAGES)
function goTo(path) {
    let base = "";

    if (location.hostname === "sivar05.github.io") {
        base = "/test/";  // GitHub Pages
    } else {
        base = "../";     // Local system
    }

    window.location.href = base + path;
}

// Attach event AFTER DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("resetPasswordBtn").addEventListener("click", resetPassword);
});

function resetPassword() {
    let newPassword = document.getElementById("newPassword").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();

    // Validation
    if (newPassword === "" || confirmPassword === "") {
        alert("Please enter New Password and Confirm Password!");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Clear errors
    document.getElementById("password-error").innerText = "";
    document.getElementById("confirm-error").innerText = "";

    // Success message
    alert("Password reset successful!");

    // Redirect to homepage
    setTimeout(() => {
        goTo("index.html");
    }, 1000);
}
