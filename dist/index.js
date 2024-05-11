import { LinkedList } from './LinkedList.ts';
const test = new LinkedList(5);
test.append(6);
test.append(3);
console.log(test.toString());
if (module && module.hot) {
  module.hot.accept();
}
//# sourceMappingURL=index.js.map
