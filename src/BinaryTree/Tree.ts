import { mergeSort } from '../mergeSort/merge-sort';
import { NodeValue } from '../types';
import { Node } from './Node';
type TraverseCallback = (node: Node) => void;

interface TraverseOptions {
  node?: Node | null;
  callback?: TraverseCallback;
  arr: NodeValue[];
}
export class Tree {
  root: Node | null;
  originalArr: number[];
  constructor(arr: number[]) {
    this.root = this.setTree(arr);
    this.originalArr = arr;
  }

  setTree(arr: number[]): Node | null {
    const filtered = [...new Set(arr)];
    const sorted = mergeSort(filtered);
    return this.buildTree(sorted);
  }

  buildTree(arr: number[]): Node | null {
    if (arr.length < 1) {
      return null;
    }
    const len = arr.length;
    const mid = Math.floor((len - 1) / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid + 1);

    return new Node(arr[mid], this.buildTree(left), this.buildTree(right));
  }

  prettyPrint(node: Node | null = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return null;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insert(value: number, node: Node | null = this.root) {
    if (!node) {
      return new Node(value);
    }
    else if (node.value === value) {
      return node;
    }

    if (value < (node.value as number)) {
      node.left = this.insert(value, node.left);
    }
    else {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  deleteItem(value: number) {
    const deletionParent = this.#findForDelete(value);

    if (!deletionParent) {
      if (value === this.root!.value) {
        const target = this.root;
        const successor = this.#inorderSuccessor(target!.right!);
        const successorParent = this.#findForDelete(successor.value as number);

        if (successor.right) {
          successorParent!.left = successor.right;
        }
        else {
          successorParent!.left = null;
        }
        target!.value = successor.value;
      }
      return null;
    }

    if (deletionParent.left && value === deletionParent.left.value) {
      const target = deletionParent.left;
      if (!target.left && !target.right) {
        deletionParent.left = null;
      }
      else if (target.left && !target.right) {
        deletionParent.left = target.left;
      }
      else if (!target.left && target.right) {
        deletionParent.left = target.right;
      }
      else {
        const successor = this.#inorderSuccessor(target.right!);
        const successorParent = this.#findForDelete(successor.value as number);

        if (successor.right) {
          successorParent!.right = successor.right;
        }
        else {
          successorParent!.left = null;
        }
        target.value = successor.value;
      }
    }
    else if (deletionParent.right && value === deletionParent.right.value) {
      const target = deletionParent.right;
      if (!target.left && !target.right) {
        deletionParent.right = null;
      }
      else if (target.left && !target.right) {
        deletionParent.right = target.left;
      }
      else if (!target.left && target.right) {
        deletionParent.right = target.right;
      }
      else {
        const successor = this.#inorderSuccessor(target.right!);
        const successorParent = this.#findForDelete(successor.value as number);

        if (successor.right) {
          successorParent!.right = successor.right;
        }
        else {
          successorParent!.left = null;
        }
        target.value = successor.value;
      }
    }
  }

  #findForDelete(value: number, node: Node | null = this.root): Node | null {
    if (!node) {
      return null;
    }

    if (value === node.left?.value || value === node.right?.value) {
      return node;
    }

    if (value < (node.value as number)) {
      return this.#findForDelete(value, node.left);
    }
    else {
      return this.#findForDelete(value, node.right);
    }
  }

  #inorderSuccessor(node: Node): Node {
    if (!node.left) {
      return node;
    }

    return this.#inorderSuccessor(node.left);
  }
  find(value: number, node: Node | null = this.root): Node | null {
    if (!node) {
      return null;
    }

    if (value === node.value) {
      return node;
    }

    if (value < (node.value as number)) {
      return this.find(value, node.left);
    }
    else {
      return this.find(value, node.right);
    }
  }

  levelOrder(callback?: TraverseCallback | undefined) {
    if (!this.root) return;
    const queue: Node[] = [this.root];
    const levelOrderArray: number[] = [];

    while (queue.length) {
      const current = queue.shift();
      if (current?.left) queue.push(current.left);
      if (current?.right) queue.push(current.right);
      if (callback) {
        callback(current!);
      }
      else {
        levelOrderArray.push(current?.value!);
      }
    }

    if (!callback) {
      return levelOrderArray;
    }
  }

  preOrder(callback?: TraverseCallback): NodeValue[] | undefined {
    const arr: NodeValue[] = [];

    this.#preOrderHelper({ callback: callback, arr: arr });

    return arr;
  }

  #preOrderHelper({ node = this.root, callback, arr }: TraverseOptions) {
    if (!node) return;

    if (callback) {
      callback(node);
    }

    arr.push(node.value);
    this.#preOrderHelper({ node: node.left, arr: arr });
    this.#preOrderHelper({ node: node.right, arr: arr });
  }

  inOrder(callback?: TraverseCallback): NodeValue[] | undefined {
    const arr: NodeValue[] = [];

    this.#inOrderHelper({ callback: callback, arr: arr });

    return arr;
  }

  #inOrderHelper({ node = this.root, callback, arr }: TraverseOptions) {
    if (!node) return;

    if (callback) {
      callback(node);
    }

    this.#inOrderHelper({ node: node.left, arr: arr });
    arr.push(node.value);
    this.#inOrderHelper({ node: node.right, arr: arr });
  }

  postOrder(callback?: TraverseCallback): NodeValue[] | undefined {
    const arr: NodeValue[] = [];

    this.#postOrderHelper({ callback: callback, arr: arr });

    return arr;
  }

  #postOrderHelper({ node = this.root, callback, arr }: TraverseOptions) {
    if (!node) return;

    if (callback) {
      callback(node);
    }

    this.#postOrderHelper({ node: node.left, arr: arr });
    this.#postOrderHelper({ node: node.right, arr: arr });
    arr.push(node.value);
  }

  height(node = this.root, counter = 0): number {
    if (!node) return counter;
    const maxLeft = this.height(node.left, ++counter);
    counter--;
    const maxRight = this.height(node.right, ++counter);

    return maxLeft > maxRight ? maxLeft : maxRight;
  }
}
