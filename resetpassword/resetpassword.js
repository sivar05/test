const token = new URLSearchParams(window.location.search).get("token");

function resetPassword() {
  const newPassword = document.getElementById("newPassword").value;
  const msg = document.getElementById("message");

  fetch("http://localhost:3000/api/resetpassword", {
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
