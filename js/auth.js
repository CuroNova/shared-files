export const PASSWORD = "bm92YTEwMjQ=";
export const LOCK_TIME = 5000;
export const SESSION_TIME = 5 * 60 * 1000;

let isLocked = false;

export function checkPassword(load) {
  if (isLocked) return;

  const input = document.getElementById("password").value;

  if (btoa(input) === PASSWORD) {
    localStorage.setItem("authTime", Date.now());
    document.getElementById("lock").style.display = "none";
    document.getElementById("app").style.display = "block";
    load();
  } else {
    alert("비밀번호가 틀렸습니다.");

    localStorage.setItem("lastFail", Date.now());

    isLocked = true;
    const btn = document.querySelector("#lock button");
    btn.disabled = true;

    setTimeout(() => {
      isLocked = false;
      btn.disabled = false;
    }, LOCK_TIME);
  }
}

export function initAuth(load) {
  const input = document.getElementById("password");

  input?.addEventListener("keypress", e => {
    if (e.key === "Enter") checkPassword(load);
  });

  const authTime = localStorage.getItem("authTime");
  if (authTime && Date.now() - authTime < SESSION_TIME) {
    document.getElementById("lock").style.display = "none";
    document.getElementById("app").style.display = "block";
    load();
    return;
  }

  const lastFail = localStorage.getItem("lastFail");
  if (lastFail && Date.now() - lastFail < LOCK_TIME) {
    isLocked = true;
  }
}