import { LinkedList } from '../LinkedList/LinkedList';
import { Node } from '../LinkedList/Node';
import { NodeValue } from '../types';

export class HashMap {
  size: number;
  arr: Array<LinkedList>;
  constructor(length: number = 16) {
    this.size = length;
    this.arr = [];
  }

  hash(key: string) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.size;
    }

    return hashCode;
  }
  set(key: string, value: NodeValue) {
    if (this.has(key)) {
      //just remove for now, as I have no function retrieve the whole node
      this.remove(key);
    }
    const hashCode = this.hash(key);
    if (!this.arr[hashCode]) {
      this.arr[hashCode] = new LinkedList(value, key);
    }
    else {
      this.arr[hashCode].append(value, key);
    }
  }

  get(key: string) {
    const hashCode = this.hash(key);

    if (!this.has(key)) {
      return null;
    }

    const index = this.arr[hashCode].findByKey(key);

    let node = this.arr[hashCode].at(index!);
    return node?.value;
  }

  has(key: string) {
    const hashCode = this.hash(key);

    if (!this.arr[hashCode]) {
      return false;
    }
    else if (
      this.arr[hashCode].findByKey(key) ||
      this.arr[hashCode].findByKey(key) === 0
    ) {
      return true;
    }

    return false;
  }

  remove(key: string) {
    if (!this.has(key)) {
      return false;
    }

    const hashCode = this.hash(key);

    if (this.arr[hashCode].size() === 1) {
      this.arr[hashCode] = '' as unknown as LinkedList;
      return true;
    }
    const index = this.arr[hashCode].findByKey(key);

    this.arr[hashCode].removeAt(index!);
    return true;
  }

  length() {
    return this.arr.reduce((acc, curr) => {
      return acc + curr.size();
    }, 0);
  }
  clear() {
    this.arr = [];
  }
  keys() {
    return this.arr.reduce((acc: string[], curr) => {
      let currNode: Node | null = curr.head;

      while (currNode) {
        acc.push(currNode.key!);
        currNode = currNode.nextNode;
      }

      return acc;
    }, []);
  }
  values() {
    return this.arr.reduce((acc: NodeValue[], curr) => {
      let currNode: Node | null = curr.head;

      while (currNode) {
        acc.push(currNode.value!);
        currNode = currNode.nextNode;
      }

      return acc;
    }, []);
  }

  entries() {
    return this.arr.reduce((acc: NodeValue[], curr) => {
      let currNode: Node | null = curr.head;

      while (currNode) {
        let pair = [currNode.key, currNode.value];
        acc.push(pair);
        currNode = currNode.nextNode;
      }

      return acc;
    }, []);
  }
}
