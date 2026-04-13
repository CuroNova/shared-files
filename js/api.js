const username = "CuroNova";
const repo = "shared-files";

export async function fetchFiles(path) {
  const url = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;
  const res = await fetch(url);
  return await res.json();
}