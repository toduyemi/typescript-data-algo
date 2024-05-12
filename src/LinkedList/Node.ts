import { NodeValue } from '../types';

export class Node {
  value: NodeValue;
  nextNode: Node | null;
  key?: string;
  constructor(
    value: NodeValue = null,
    nextNode: Node | null = null,
    key?: string,
  ) {
    if (key) {
      this.key = key;
    }
    this.value = value;
    this.nextNode = nextNode;
  }
}
