type T = string | number | null;
export type NodeValue = T | Array<T> | Record<string, T> | null;

export class Node {
  value: NodeValue;
  nextNode: Node | null;
  constructor(value: NodeValue = null, nextNode: Node | null = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
