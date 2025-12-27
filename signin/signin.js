/* =========================
   SIMPLE PATH HANDLER
========================= */
function goTo(path) {
    const base =
        location.hostname === "sivar05.github.io"
            ? "/test/"
            : "../";

    window.location.href = base + path;
}

/* =========================
   POPUP
========================= */
let popupCallback = null;

function popup(message, callback) {
    document.getElementById("popupText").innerText = message;
    popupCallback = callback || null;
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    if (popupCallback) popupCallback();
    popupCallback = null;
}

/* =========================
   PASSWORD TOGGLE
========================= */
function handlePasswordInput() {
    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (password.value.length > 0) {
        eyeIcon.style.display = "block";
    } else {
        eyeIcon.style.display = "none";
        password.type = "password";
        eyeIcon.src = getEyeIcon("close");
    }
}

function togglePassword() {
    const password = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (password.type === "password") {
        password.type = "text";
        eyeIcon.src = getEyeIcon("open");
    } else {
        password.type = "password";
        eyeIcon.src = getEyeIcon("close");
    }
}

function getEyeIcon(type) {
    const base =
        location.hostname === "sivar05.github.io"
            ? "/test/image/symbol/"
            : "../image/symbol/";

    return base + (type === "open" ? "eye_open.png" : "eye_close.png");
}

/* =========================
   ERROR HANDLING
========================= */
function clearError(id) {
    const el = document.getElementById(id);
    if (el) el.innerText = "";
}

/* =========================
   LOGIN
========================= */
function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("message");

    clearError("email-error");
    clearError("password-error");
    if (msg) msg.innerText = "";

    const emailPattern =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(email)) {
        document.getElementById("email-error").innerText =
            "Please enter valid email";
        return;
    }

    if (!password) {
        document.getElementById("password-error").innerText =
            "Enter your password";
        return;
    }

    const API_BASE =
        location.hostname === "sivar05.github.io"
            ? "https://signup-api.up.railway.app"
            : "http://localhost:3000";

            fetch(`${API_BASE}/api/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
        .then(res => res.ok ? res.json() : res.text().then(t => { throw new Error(t); }))
        .then(data => {
        if (data.success) {
            localStorage.setItem("userName", data.username); 
            popup("Login Successful!", () => {
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            goTo("homepage/home.html");
       });
      }
     })
    .catch(err => {
      if (msg) msg.innerText = err.message || "Login failed";
 });
 }

/* =========================
   REDIRECTS
========================= */
function redirectToSignUp() {
    goTo("signup/signup.html");
}

function forgotPassword() {
    goTo("forgotpassword/forgotpassword.html");
}

function forgotEmail() {
    goTo("forgotemail/forgotemail.html");
}

if ('WebSocket' in window) {
		(function () {
			function refreshCSS() {
				var sheets = [].slice.call(document.getElementsByTagName("link"));
				var head = document.getElementsByTagName("head")[0];
				for (var i = 0; i < sheets.length; ++i) {
					var elem = sheets[i];
					var parent = elem.parentElement || head;
					parent.removeChild(elem);
					var rel = elem.rel;
					if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
						var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
						elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
					}
					parent.appendChild(elem);
				}
			}
			var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
			var address = protocol + window.location.host + window.location.pathname + '/ws';
			var socket = new WebSocket(address);
			socket.onmessage = function (msg) {
				if (msg.data == 'reload') window.location.reload();
				else if (msg.data == 'refreshcss') refreshCSS();
			};
			if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
				console.log('Live reload enabled.');
				sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
			}
		})();
	}
	else {
		console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
	}

