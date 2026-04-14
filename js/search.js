function searchTree(node, keyword, results = []) {
  if (node.type === "file") {
    if (
      node.name.includes(keyword) ||
      node.path.includes(keyword)
    ) {
      results.push(node);
    }
  }

  if (node.children) {
    node.children.forEach(child => searchTree(child, keyword, results));
  }

  return results;
}