// Merge function to combine two sorted arrays
function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
      } else {
          result.push(right[rightIndex]);
          rightIndex++;
      }
  }

  return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Recursive Merge Sort function
function mergeSort(arr) {
  // Base case: if the array has 1 or fewer elements, it's already sorted
  if (arr.length <= 1) {
      return arr;
  }

  // Find the middle point to divide the array into two halves
  const middle = Math.floor(arr.length / 2);

  // Recursively sort the two halves
  const left = mergeSort(arr.slice(0, middle));
  const right = mergeSort(arr.slice(middle));

  // Merge the sorted halves
  return merge(left, right);
}

// Test cases
console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));
console.log(mergeSort([105, 79, 100, 110]));