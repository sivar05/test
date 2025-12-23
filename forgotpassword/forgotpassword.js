// PATH HANDLER
/*--function redirectTo(path) {
    // Remove any leading/trailing slashes and combine
    const base = window.location.origin;
    const cleanPath = path.replace(/^\/+/, '');  // Remove leading slashes
    window.location.href = `${base}/${cleanPath}`;
}*/

// PATH HANDLER
function goTo(path) {
  let base = (location.hostname === "sivar05.github.io") ? "/test/" : "../";
  window.location.href = base + path;
}

// Get API base URL
function getApiBase() {
  return location.hostname === "sivar05.github.io"
    ? "https://signup-api.up.railway.app"
    : "http://localhost:3000";
}

// Store email globally for use in step 2
let userEmail = '';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners
    const emailInput = document.getElementById('email');
    const sendBtn = document.getElementById('sendLinkBtn');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const resetBtn = document.getElementById('resetBtn');
    
    if (emailInput) {
        emailInput.addEventListener('input', handleEmailInput);
    }
    
    if (sendBtn) {
        sendBtn.addEventListener('click', sendResetLink);
    }
    
    if (newPasswordInput) {
        newPasswordInput.addEventListener('input', validatePasswords);
        newPasswordInput.addEventListener('input', checkPasswordStrength);
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validatePasswords);
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetPassword);
    }
    
    // Check if token is present in URL
    checkForTokenInURL();
});

function handleEmailInput() {
    const emailInput = document.getElementById('email');
    const sendBtn = document.getElementById('sendLinkBtn');
    const email = emailInput.value.trim();
    
    // Basic email validation
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (email && isValidEmail) {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send Reset Link";
    } else {
        sendBtn.disabled = true;
    }
}

function sendResetLink() {
    const emailInput = document.getElementById('email');
    const messageElement = document.getElementById('messageStep1');
    const sendBtn = document.getElementById('sendLinkBtn');
    
    userEmail = emailInput.value.trim();
    
    // Validation
    if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
        showMessage(messageElement, "Please enter a valid email address", "red");
        return;
    }
    
    // Disable button and show loading
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";
    showMessage(messageElement, "Sending reset link...", "blue");
    
    // Make API call with proper headers and error handling
    fetch(`${getApiBase()}/api/forgotpassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail })
    })
    .then(response => {
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error(errData.message || `HTTP ${response.status}`);
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("Response data:", data);
        
        if (data.success) {
            showMessage(messageElement, data.message, "green");
            
            // Switch to step 2 after 2 seconds
            setTimeout(() => {
               // showPasswordResetStep();
               alert("If the email exists, a reset link has been sent. Please check your inbox.");
               window.close();
            }, 2000);
        } else {
            showMessage(messageElement, data.message || "Failed to send reset link", "red");
            sendBtn.disabled = false;
            sendBtn.textContent = "Send Reset Link";
        }
    })
    .catch(error => {
        console.error('API Error details:', error);
        showMessage(messageElement, `Error: ${error.message}`, "red");
        sendBtn.disabled = false;
        sendBtn.textContent = "Send Reset Link";
    });
}

function showMessage(element, message, color) {
    if (element) {
        element.style.color = color;
        element.textContent = message;
    }
}

function showPasswordResetStep() {
    // Hide step 1
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step2Message = document.getElementById('step2Message');
    
    if (step1) step1.classList.add('hidden');
    if (step2) step2.classList.remove('hidden');
    
    // Update message with user email
    if (step2Message && userEmail) {
        step2Message.textContent = `Enter new password for ${userEmail}`;
    }
    
    // Focus on first password field
    const newPasswordInput = document.getElementById('newPassword');
    if (newPasswordInput) newPasswordInput.focus();
}

function checkPasswordStrength() {
    const password = document.getElementById('newPassword').value;
    const strengthElement = document.getElementById('passwordStrength');
    
    if (!strengthElement) return;
    
    if (!password) {
        strengthElement.textContent = '';
        strengthElement.className = 'password-strength';
        return;
    }
    
    let strength = 0;
    let message = '';
    let className = '';
    
    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // Complexity checks
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    // Determine strength level
    if (strength <= 2) {
        message = 'Weak password';
        className = 'strength-weak';
    } else if (strength <= 4) {
        message = 'Medium strength';
        className = 'strength-medium';
    } else {
        message = 'Strong password';
        className = 'strength-strong';
    }
    
    strengthElement.textContent = message;
    strengthElement.className = `password-strength ${className}`;
}

function validatePasswords() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const resetBtn = document.getElementById('resetBtn');
    const messageElement = document.getElementById('messageStep2');
    
    // Clear previous messages
    if (messageElement) {
        messageElement.textContent = '';
    }
    
    // Enable button only if both fields are filled and passwords match
    if (newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
            if (resetBtn) {
                resetBtn.disabled = false;
                resetBtn.textContent = "Reset Password";
            }
        } else {
            if (resetBtn) resetBtn.disabled = true;
            if (messageElement) {
                showMessage(messageElement, "Passwords do not match!", "red");
            }
        }
    } else {
        if (resetBtn) resetBtn.disabled = true;
    }
}

function resetPassword() {
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const resetBtn = document.getElementById('resetBtn');
    const messageElement = document.getElementById('messageStep2');
    const token = getTokenFromURL();
    
    // Validation
    if (newPassword !== confirmPassword) {
        showMessage(messageElement, "Passwords do not match!", "red");
        return;
    }
    
    if (newPassword.length < 8) {
        showMessage(messageElement, "Password must be at least 8 characters!", "red");
        return;
    }
    
    // If token is not in URL, use the email from step 1
    if (!token && !userEmail) {
        showMessage(messageElement, "Invalid reset link. Please request a new one.", "red");
        return;
    }
    
    // Disable button and show loading
    if (resetBtn) {
        resetBtn.disabled = true;
        resetBtn.textContent = "Processing...";
    }
    
    showMessage(messageElement, "Updating password...", "blue");
    
    // Prepare request data
    const requestData = {
        newPassword: newPassword
    };
    
    // Include token if present in URL
    if (token) {
        requestData.token = token;
    } else {
        // If no token, use email from step 1
        requestData.email = userEmail;
    }
    
    // Make API call
    fetch(`${getApiBase()}/api/forgotpassword/resetpassword`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage(messageElement, data.message, "green");
            
            // Show success alert and redirect
            setTimeout(() => {
                alert("Password updated successfully! Redirecting to login page...");
                goTo("signin/signin.html");
            }, 1500);
        } else {
            showMessage(messageElement, data.message || "Failed to update password", "red");
            if (resetBtn) {
                resetBtn.disabled = false;
                resetBtn.textContent = "Reset Password";
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage(messageElement, "Network error. Please try again.", "red");
        if (resetBtn) {
            resetBtn.disabled = false;
            resetBtn.textContent = "Reset Password";
        }
    });
}

function getTokenFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
}

function checkForTokenInURL() {
    const token = getTokenFromURL();
    if (token) {
        // If token is in URL, skip step 1 and show step 2 directly
        const step1 = document.getElementById('step1');
        const step2 = document.getElementById('step2');
        const step2Message = document.getElementById('step2Message');
        
        if (step1) step1.classList.add('hidden');
        if (step2) step2.classList.remove('hidden');
        if (step2Message) {
            step2Message.textContent = "Enter your new password";
        }
        
        // Try to extract email from token or URL parameters
        const emailFromURL = new URLSearchParams(window.location.search).get('email');
        if (emailFromURL) {
            userEmail = decodeURIComponent(emailFromURL);
            step2Message.textContent = `Enter new password for ${userEmail}`;
        }
    }
}