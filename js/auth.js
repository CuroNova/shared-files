const PASSWORD = "1024";

let failLock = false;

function login() {
  if (failLock) return;

  const nick = document.getElementById("nickname").value;
  const pw = document.getElementById("password").value;

  if (pw !== PASSWORD) {
    document.getElementById("error").innerText = "비밀번호 오류";
    failLock = true;

    setTimeout(() => {
      failLock = false;
    }, 5000);

    return;
  }

  // session 5 min
  const session = {
    nick,
    time: Date.now()
  };

  localStorage.setItem("session", JSON.stringify(session));

  logEnter(nick);

  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
}

function checkSession() {
  const s = JSON.parse(localStorage.getItem("session"));
  if (!s) return false;

  const expired = Date.now() - s.time > 5 * 60 * 1000;
  return !expired;
}

function logEnter(nick) {
  // GitHub Pages는 서버 write 불가 → fetch hook (GitHub Action / webhook 필요)
  fetch("https://example.com/log", {
    method: "POST",
    body: JSON.stringify({
      nickname: nick,
      time: new Date().toISOString()
    })
  }).catch(()=>{});
}