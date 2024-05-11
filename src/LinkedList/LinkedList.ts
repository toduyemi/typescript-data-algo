import { Node, NodeValue } from './Node.ts';

export class LinkedList {
  #tail: Node;
  #head: Node;
  constructor(firstValue: NodeValue) {
    this.#head = new Node(firstValue);
    this.#tail = this.#head;
  }

  append(value: NodeValue) {
    this.#tail.nextNode = new Node(value);
    this.#tail = this.#tail.nextNode;
  }

  prepend(value: NodeValue) {
    const ref = new Node(value, this.#head);
    this.#head = ref;
  }

  size() {
    if (this.#head.nextNode === null) return 1;
    let currNode: Node = this.#head;
    let count = 1;
    while (currNode.nextNode) {
      count++;
      currNode = currNode.nextNode;
    }
    return count;
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  at(index: number) {
    let currNode: Node = this.#head;
    let count = 0;
    if (index < 0) {
      throw new Error('Invalid index');
    }

    while (currNode) {
      if (count === index) {
        return currNode;
      }
      else if (!currNode.nextNode) {
        throw new Error('Invalid index');
      }
      count++;
      currNode = currNode.nextNode;
    }
  }

  pop() {
    if (this.#head.nextNode === null)
      throw new Error('Cannot delete head node');

    let currNode = this.#head;

    // iterate till nextNode property returns falsy
    while (currNode.nextNode?.nextNode) {
      currNode = currNode.nextNode;
    }

    currNode.nextNode = null;
    this.#tail = currNode;
  }

  contains(value: NodeValue) {
    let currNode: Node = this.#head;

    while (currNode) {
      if (value === currNode.value) {
        return true;
      }
      else if (!currNode.nextNode) {
        return false;
      }

      currNode = currNode.nextNode;
    }
  }

  find(value: NodeValue) {
    let currNode: Node = this.#head;
    let index = 0;

    while (currNode) {
      if (value === currNode.value) {
        return index;
      }
      else if (!currNode.nextNode) {
        return null;
      }
      index++;
      currNode = currNode.nextNode;
    }
  }

  toString() {
    let currNode: Node = this.#head;
    let output: string = '';

    while (currNode) {
      if (!currNode.nextNode) {
        output += `(${currNode.value} ) -> null`;
        return output;
      }
      else {
        output += `( ${currNode.value} ) -> `;
        currNode = currNode.nextNode;
      }
    }
  }

  insertAt(value: NodeValue, index: number) {
    if (index === 0) {
      this.prepend(value);
      return;
    }

    let prevNode = this.at(index - 1);

    if (prevNode instanceof Node && prevNode) {
      let newNode = new Node(value, prevNode.nextNode);

      prevNode.nextNode = newNode;
    }
  }

  removeAt(index: number) {
    if (index === 0 && this.#head.nextNode) {
      this.#head = this.#head.nextNode;
      return;
    }

    let prevNode = this.at(index - 1);

    if (prevNode instanceof Node) {
      if (prevNode.nextNode) {
        prevNode.nextNode = prevNode.nextNode.nextNode;
      }
      else if (!prevNode.nextNode) {
        this.pop();
      }
    }
  }
}
