const username = "CuroNova";
const repo = "shared-files";

let allFiles = [];

// ⭐ Base64 비밀번호
const PASSWORD = "bm92YTEwMjQ="; // nova1024

// ⭐ 설정값
const LOCK_TIME = 5000; // 5초
const SESSION_TIME = 5 * 60 * 1000; // 5분

let isLocked = false;

// ⭐ 로그인 체크
function checkPassword() {
  if (isLocked) return;

  const input = document.getElementById("password").value;

  if (btoa(input) === PASSWORD) {
    // 세션 저장
    localStorage.setItem("authTime", Date.now());

    document.getElementById("lock").style.display = "none";
    document.getElementById("app").style.display = "block";
    load();

  } else {
    alert("비밀번호가 틀렸습니다.");

    // ⭐ 5초 잠금
    isLocked = true;
    const btn = document.querySelector("#lock button");
    btn.disabled = true;
    btn.textContent = "5초 후 다시 시도";

    setTimeout(() => {
      isLocked = false;
      btn.disabled = false;
      btn.textContent = "확인";
    }, LOCK_TIME);
  }
}

// ⭐ Enter 로그인
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("password");

  if (input) {
    input.addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        checkPassword();
      }
    });
  }

  // ⭐ 세션 체크 (자동 로그인)
  const authTime = localStorage.getItem("authTime");

  if (authTime && (Date.now() - authTime < SESSION_TIME)) {
    document.getElementById("lock").style.display = "none";
    document.getElementById("app").style.display = "block";
    load();
  }
});

async function fetchFiles(path) {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;
  const res = await fetch(url);
  return await res.json();
}

function openParents(element) {
  let parent = element.parentElement;

  while (parent) {
    if (parent.classList.contains("children")) {
      parent.style.display = "block";

      const folder = parent.previousElementSibling;
      if (folder && folder.classList.contains("folder")) {
        folder.classList.add("open");
      }
    }
    parent = parent.parentElement;
  }
}

function closeAllFolders() {
  document.querySelectorAll(".children").forEach(el => {
    el.style.display = "none";
  });
  document.querySelectorAll(".folder").forEach(el => {
    el.classList.remove("open");
  });
}

async function renderFolder(path, container) {
  const items = await fetchFiles(path);

  const folders = items.filter(item => item.type === "dir");
  const files = items.filter(item => item.type === "file");

  folders.sort((a, b) => a.name.localeCompare(b.name));
  files.sort((a, b) => a.name.localeCompare(b.name));

  for (const item of folders) {
    const folder = document.createElement("div");
    folder.className = "folder";
    folder.textContent = "📂 " + item.name;

    const children = document.createElement("div");
    children.className = "children";

    folder.onclick = () => {
      const isOpen = children.style.display === "block";
      children.style.display = isOpen ? "none" : "block";
      folder.classList.toggle("open");
    };

    container.appendChild(folder);
    container.appendChild(children);

    await renderFolder(item.path, children);
  }

  for (const item of files) {
    const fileDiv = document.createElement("div");
    fileDiv.className = "file";

    const link = document.createElement("a");
    link.href = item.download_url;
    link.textContent = "📄 " + item.name;

    fileDiv.appendChild(link);
    container.appendChild(fileDiv);

    allFiles.push({
      name: item.name.toLowerCase(),
      element: fileDiv
    });
  }
}

function setupSearch() {
  const input = document.getElementById("search");

  input.addEventListener("input", () => {
    const keyword = input.value.toLowerCase();

    closeAllFolders();

    allFiles.forEach(file => {
      if (file.name.includes(keyword)) {
        file.element.style.display = "block";
        openParents(file.element);
      } else {
        file.element.style.display = "none";
      }
    });

    if (keyword === "") {
      allFiles.forEach(file => {
        file.element.style.display = "block";
      });
    }
  });
}

async function load() {
  const container = document.getElementById("content");
  await renderFolder("files", container);
  setupSearch();
}