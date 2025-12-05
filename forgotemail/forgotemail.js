// Correct version
function resetEmail() {
    let mobile = document.getElementById("mobileNumber").value.trim();
     

     if(mobile === "" || !/^\d{10}$/.test(mobile)) {
        document.getElementById("mobile-error").innerText = "Enter a 10-digit mobile number";
        return
    }

   // Mask first 6 digits
    let masked = "******" + mobile.slice(6, 10);

    alert("A reset link has been sent to: " + masked);
   document.getElementById("mobileNumber").value = "";
   document.getElementById("mobile-error").innerText = "";
    popup("Redirecting to Home Page...", () => {
        goTo("index.html");
    });
}



