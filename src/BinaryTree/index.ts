import { Tree } from './Tree';

const data = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree(data);

tree.prettyPrint();
tree.insert(5);
tree.prettyPrint();
tree.insert(29);
tree.insert(45);

tree.insert(3564);
tree.insert(6);
tree.insert(90);
tree.insert(8.5);
tree.prettyPrint();

console.log(tree.find(45));

tree.deleteItem(4);

tree.prettyPrint();

// console.log(tree.levelOrder());

// tree.levelOrder((node) => {
//   node.value = node.value! * 3;
// });
// console.log(tree.levelOrder());

// console.log(tree.preOrder());

// tree.preOrder((node) => {
//   node.value = node.value! * 3;
// }),
//   console.log(tree.preOrder());

// console.log(tree.inOrder());

// tree.inOrder((node) => {
//   node.value = node.value! * 3;
// }),
//   console.log(tree.inOrder());
console.log(tree.postOrder());

tree.postOrder((node) => {
  node.value = node.value! * 3;
}),
  console.log(tree.postOrder());

console.log(tree.height(tree.find(3)));
