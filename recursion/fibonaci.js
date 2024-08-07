// Fibonacci function using iteration
function fibs(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  let result = [0, 1];
  for (let i = 2; i < n; i++) {
      result.push(result[i-1] + result[i-2]);
  }
  return result;
}

// Fibonacci function using recursion
function fibsRec(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  
  let prev = fibsRec(n - 1);
  return [...prev, prev[prev.length - 1] + prev[prev.length - 2]];
}

// Testing the functions
console.log("Using iteration:");
console.log(fibs(8));
console.log(fibs(10));
console.log(fibs(15));

console.log("\nUsing recursion:");
console.log(fibsRec(8));
console.log(fibsRec(10));
console.log(fibsRec(15));