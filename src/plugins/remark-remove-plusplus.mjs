import { visit } from 'unist-util-visit';

export default function remarkRemovePlusPlus() {
  return (tree) => {
    visit(tree, 'text', (node) => {
      // Remove ++ when it strictly wraps text, avoiding things like C++
      // Pattern: `++` followed by something non-empty that does not start/end with space, followed by `++`.
      node.value = node.value.replace(/(^|\s)\+\+(?!\s)(.*?)(?<!\s)\+\+(?=$|\s|[.,!?:;])/g, '$1$2');
    });

    visit(tree, (node) => {
      if (!node.children) return;
      const children = node.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (['link', 'strong', 'emphasis', 'inlineCode'].includes(child.type)) {
          const prev = children[i - 1];
          const next = children[i + 1];

          if (prev && prev.type === 'text' && /(^|\s)\+\+$/.test(prev.value) &&
              next && next.type === 'text' && /^\+\+(?=$|\s|[.,!?:;])/.test(next.value)) {
            prev.value = prev.value.replace(/\+\+$/, '');
            next.value = next.value.replace(/^\+\+/, '');
          }
        }
      }
    });
  };
}
