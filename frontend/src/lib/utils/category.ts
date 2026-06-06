export interface CategoryNode {
  id: number;
  parent_id: number | null;
  code: string;
  name: string;
  slug: string;
  children: CategoryNode[];
}

export function buildCategoryTree(categories: any[]): CategoryNode[] {
  const categoryMap = new Map<number, CategoryNode>();
  const tree: CategoryNode[] = [];

  // Initialize all nodes
  categories.forEach((cat) => {
    categoryMap.set(cat.id, {
      id: cat.id,
      parent_id: cat.parent_id,
      code: cat.code,
      name: cat.name,
      slug: cat.slug,
      children: [],
    });
  });

  // Build tree
  categories.forEach((cat) => {
    const node = categoryMap.get(cat.id);
    if (node) {
      if (cat.parent_id === null) {
        // Root node
        tree.push(node);
      } else {
        // Child node
        const parent = categoryMap.get(cat.parent_id);
        if (parent) {
          parent.children.push(node);
        } else {
          // If parent is not found in the dataset, treat as root to avoid orphan nodes
          tree.push(node);
        }
      }
    }
  });

  return tree;
}

export function getCategoryAndDescendantIds(node: CategoryNode): number[] {
  let ids = [node.id];
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      ids = ids.concat(getCategoryAndDescendantIds(child));
    });
  }
  return ids;
}

export function findCategoryNodeBySlug(nodes: CategoryNode[], slug: string): CategoryNode | null {
  for (const node of nodes) {
    if (node.slug === slug) return node;
    if (node.children && node.children.length > 0) {
      const found = findCategoryNodeBySlug(node.children, slug);
      if (found) return found;
    }
  }
  return null;
}
