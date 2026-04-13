window.onload = () => {
  if (checkSession()) {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
  }
};

function toggleTheme() {
  document.body.classList.toggle("light");
}