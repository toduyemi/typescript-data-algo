import { LinkedList } from '../LinkedList/LinkedList';
import { NodeValue } from '../types';

export class HashMap {
  length: number;
  arr: Array<LinkedList>;
  constructor(length: number) {
    this.length = length;
    this.arr = [];
  }

  hash(key: string) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.length;
    }

    return hashCode;
  }
  set(key: string, value: NodeValue) {
    if (this.has(key)) {
      throw new Error('Key already exists in hash map.');
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

    if (!this.arr[hashCode]) {
      return null;
    }

    const index = this.arr[hashCode].findByKey(key);
    let node;
    if (index) {
      node = this.arr[hashCode].at(index);
      return node?.value;
    }

    return null;
  }

  has(key: string) {
    const hashCode = this.hash(key);

    if (!this.arr[hashCode]) {
      return false;
    }
    else if (this.arr[hashCode].findByKey(key)) {
      return true;
    }

    return false;
  }

  remove(key: string) {
    if (!this.has(key)) {
      return false;
    }

    const hashCode = this.hash(key);

    const index = this.arr[hashCode].findByKey(key);

    this.arr[hashCode].removeAt(index!);
    return true;
  }
}
