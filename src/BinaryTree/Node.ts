type NodeValue = number | null;
export class Node {
  value: NodeValue;
  left: Node | null;
  right: Node | null;
  constructor(
    value: NodeValue = null,
    leftNode: Node | null = null,
    rightNode: Node | null = null,
  ) {
    this.value = value;
    this.left = leftNode;
    this.right = rightNode;
  }
}
