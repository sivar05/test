function handleEmailInput() {
  const email = document.getElementById("email").value.trim();
  const btn = document.getElementById("sendLinkBtn");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  btn.style.display = emailRegex.test(email) ? "block" : "none";
}

function sendResetLink() {
  
  const email = document.getElementById("email").value.trim();
  const msg = document.getElementById("message");
 console.log("📩 Sending reset link to:", email);
 

 const API_BASE =
    location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://signup-api.up.railway.app";


 fetch(`${API_BASE}/api/send-reset-link`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email })
  })
    .then(res => res.json())
    .then(data => {
      msg.style.color = data.success ? "green" : "red";
      msg.innerText = data.message;
    });   
}
