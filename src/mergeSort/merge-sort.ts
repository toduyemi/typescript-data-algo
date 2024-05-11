const samp = [3, 2, 1, 13, 8, 5, 0, 1];
const samp2 = [105, 79, 100, 110];

function mergeSort(arr: Array<number>) {
  const len = arr.length;
  const half = len / 2;
  let output = [];

  if (len <= 1) {
    return arr;
  }

  const left = arr.slice(0, half);
  const right = arr.slice(half);

  const leftSort: Array<number> = mergeSort(left);
  const rightSort: Array<number> = mergeSort(right);

  for (let i = 0, j = 0, k = 0; i < len; ) {
    if (j >= rightSort.length) {
      for (; i < len; i++, k++) {
        output[i] = leftSort[k];
      }
    } else if (k >= leftSort.length) {
      for (; i < len; i++, j++) {
        output[i] = rightSort[j];
      }
    } else if (leftSort[k] > rightSort[j]) {
      output[i] = rightSort[j];
      i++;
      j++;
    } else {
      output[i] = leftSort[k];
      i++;
      k++;
    }
  }
  return output;
}

function merge(leftSort:number[], rightSort:number[]){


}
console.log(mergeSort(samp));
console.log(mergeSort(samp2));
