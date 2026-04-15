export function search(tree, q) {
  const query = q.toLowerCase();

  const scored = tree.index.map(item => {
    let score = 0;

    if (item.name.toLowerCase().includes(query)) score += 3;
    if (item.path.toLowerCase().includes(query)) score += 2;
    if ((item.keywords || []).join(" ").toLowerCase().includes(query)) score += 1;

    return { ...item, score };
  });

  return scored
    .filter(i => i.score > 0)
    .sort((a, b) =>
      b.score - a.score ||
      a.path.localeCompare(b.path)
    )
    .slice(0, 50);
}