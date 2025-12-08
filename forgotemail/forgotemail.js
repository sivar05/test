//UNIVERSAL FUNCTION TO HANDLE PATHS
function goTo(path) {
    if (location.hostname === "sivar05.github.io") {
        window.location.href = "/test/" + path; 
    } else {
        window.location.href = "../" + path; 
    }
}


// CLICK EVENT FOR RESET EMAIL BUTTON
document.getElementById("resetEmailButton").addEventListener("click", resetEmail);

function resetEmail() {
    let mobile = document.getElementById("mobileNumber").value.trim();

    // Validate 10-digit number
    if (mobile === "" || !/^\d{10}$/.test(mobile)) {
        document.getElementById("mobile-error").innerText = "Enter a 10-digit mobile number";
        return;
    }

    // Mask first 6 digits
    let masked = "******" + mobile.slice(6);

    alert("A reset link has been sent to: " + masked);

    // Clear input and error
    document.getElementById("mobileNumber").value = "";
    document.getElementById("mobile-error").innerText = "";

    // Popup → Redirect
    popup("Redirecting to Home Page...", () => {
        goTo("index.html");
    });
}
 