const token = new URLSearchParams(window.location.search).get("token");
console.log("TOKEN FROM URL:", token);

function resetPassword() {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const msg = document.getElementById("message");

  if (!token) {
    msg.style.color = "red";
    msg.innerText = "Reset link is invalid";
    return;
  }

  if (newPassword !== confirmPassword) {
    msg.style.color = "red";
    msg.innerText = "Passwords do not match";
    return;
  }

  const API_BASE =
    location.hostname === "sivar05.github.io"
      ? "https://signup-api.up.railway.app"
      : "http://127.0.0.1:3000";

  fetch(`${API_BASE}/api/resetpassword`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, newPassword })
  })
    .then(res => {
      if (!res.ok) throw new Error("Invalid or expired token");
      return res.json();
    })
   .then(data => {
     msg.style.color = "green";
     msg.innerText = data.message || "Password updated successfully";
  
     // Show confirmation alert
     alert("Password updated successfully! This window will now close.");
  
    // Close the current tab/window after 1 second
     setTimeout(() => {
     window.close();
     }, 1000);
    })
    .catch(err => {
      msg.style.color = "red";
      msg.innerText = err.message;
    });
}

function goTo(path) {
  const base = location.hostname === "sivar05.github.io" ? "../" : "/test/";
  window.location.href = base + path;
}
