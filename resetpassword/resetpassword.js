const token = new URLSearchParams(window.location.search).get("token");

function resetPassword() {
  const newPassword = document.getElementById("newPassword").value;
  const confirmPassword=document.getElementById("confirmPassword").value;
  const msg = document.getElementById("message");

  if (newPassword !== confirmPassword) {
  msg.innerText = "Passwords do not match";
  return;
}

const API_BASE =
  location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://signup-api.up.railway.app";


fetch(`${API_BASE}/api/reset-password`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ token, newPassword })
})

    .then(res => res.json())
    .then(data => {
      msg.style.color = data.success ? "green" : "red";
      msg.innerText = data.message;
    });
}

