import { LinkedList } from './LinkedList.ts';
import { Node } from './Node.ts';
const test = new LinkedList(5);

test.append(6);
test.append(3);
test.append(3343);
test.insertAt(9, 4);

test.insertAt(43, 4);
console.log(test.toString());
console.log(test.size());
test.removeAt(2);
console.log(test.toString());

test.prepend(10000);

console.log(test.toString());

console.log(test.find(9));
console.log(test.find('aea'));

console.log(test.find(3343));

test.pop();
console.log(test.toString());
console.log(test.contains(9));

console.log(test.contains('aea'));

console.log(test.contains(3343));

if (module && module.hot) {
  module.hot.accept();
}
