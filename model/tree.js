export async function loadTree() {
  const res = await fetch("/shared-files/json/tree.json");
  return await res.json();
}