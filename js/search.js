document.getElementById("search").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const items = document.querySelectorAll(".file, .folder");

  items.forEach(el => {
    if (el.innerText.toLowerCase().includes(value)) {
      el.classList.add("highlight");
    } else {
      el.classList.remove("highlight");
    }
  });
});