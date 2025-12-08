
// UNIVERSAL PATH HANDLER (LOCAL + GITHUB PAGES)
function goTo(path) {
    let base = "";  
    // Detect GitHub Pages domain
    if (location.hostname === "sivar05.github.io") {
        base = "/test/"; // Your repository name
    }else {
        base = "../"; 
    }   
    window.location.href = base + path;
}  

//reset Password
function forgotpassword() {
   
    let email = document.getElementById("email").value.trim();
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

if (!emailPattern.test(email)) {
    alert("Please enter a valid Email!");
    return;
}
    alert("A reset link has been sent to: " + email);

    document.getElementById("email").value = "";    
     
    // DIRECT REDIRECT
    setTimeout(() => {  
        alert("Redirecting to Home Page...");        
           goTo("index.html"); 
        }, 1000);
}

// POPUP FUNCTION
function popup(message, callback) {
    alert(message);
    if (callback) callback();
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

