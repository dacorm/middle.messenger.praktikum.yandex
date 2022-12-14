import Block from '../../core/Block';

function removeAllChildrens(parent: Element) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function renderInDom(query: string | undefined, block: Block) {
  // @ts-ignore
  const root = document.querySelector(query);
  if (root) {
    removeAllChildrens(root);
    root.appendChild(block.content);
  }
  return root;
}
