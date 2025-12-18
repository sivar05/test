console.log("forgotemail.js loaded");
function recoverEmail() {
  const mobile = document.getElementById("mobileNumber").value.trim();
  const msg = document.getElementById("message");



document
  .getElementById("resetEmailButton")
  .addEventListener("click", recoverEmail);


  if (!/^\d{10}$/.test(mobile)) {
    msg.innerText = "Enter a valid 10-digit mobile number";
    return;
  }

  const API_BASE =
    location.hostname === "sivar05.github.io"
      ? "https://signup-api.up.railway.app"
      : "http://localhost:3000";

 fetch(`${API_BASE}/api/forgotemail/recover-email`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ mobilenumber: mobile })
})

    .then(res => res.json())
    .then(data => {
      if (!data.success) throw data;
      msg.style.color = "green";
      msg.innerText = `Your registered email: ${data.maskedEmail}`;
    })
    .catch(err => {
      msg.style.color = "red";
      msg.innerText = err.message || "Mobile number not found";
    });

   console.log("Recover email clicked");


}
