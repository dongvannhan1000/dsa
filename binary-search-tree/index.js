// Node class
class Node {
  constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
  }
}

// Tree class
class Tree {
  constructor(array) {
      this.root = this.buildTree(array);
  }

  buildTree(array) {
      // Remove duplicates and sort the array
      const sortedArray = [...new Set(array)].sort((a, b) => a - b);
      
      const build = (start, end) => {
          if (start > end) return null;
          
          const mid = Math.floor((start + end) / 2);
          const node = new Node(sortedArray[mid]);
          
          node.left = build(start, mid - 1);
          node.right = build(mid + 1, end);
          
          return node;
      };

      return build(0, sortedArray.length - 1);
  }

  insert(value) {
      const insertNode = (node, value) => {
          if (node === null) return new Node(value);
          
          if (value < node.data) {
              node.left = insertNode(node.left, value);
          } else if (value > node.data) {
              node.right = insertNode(node.right, value);
          }
          
          return node;
      };

      this.root = insertNode(this.root, value);
  }

  deleteItem(value) {
      const deleteNode = (node, value) => {
          if (node === null) return null;
          
          if (value < node.data) {
              node.left = deleteNode(node.left, value);
          } else if (value > node.data) {
              node.right = deleteNode(node.right, value);
          } else {
              // Node with only one child or no child
              if (node.left === null) return node.right;
              if (node.right === null) return node.left;
              
              // Node with two children
              let minNode = this.findMin(node.right);
              node.data = minNode.data;
              node.right = deleteNode(node.right, minNode.data);
          }
          
          return node;
      };

      this.root = deleteNode(this.root, value);
  }

  findMin(node) {
      while (node.left !== null) node = node.left;
      return node;
  }

  find(value) {
      let current = this.root;
      while (current !== null) {
          if (value === current.data) return current;
          if (value < current.data) current = current.left;
          else current = current.right;
      }
      return null;
  }

  levelOrder(callback) {
      if (!callback) throw new Error("Callback is required for levelOrder");
      
      const queue = [this.root];
      while (queue.length > 0) {
          const node = queue.shift();
          callback(node);
          if (node.left) queue.push(node.left);
          if (node.right) queue.push(node.right);
      }
  }

  inOrder(callback) {
      if (!callback) throw new Error("Callback is required for inOrder");
      
      const traverse = (node) => {
          if (node !== null) {
              traverse(node.left);
              callback(node);
              traverse(node.right);
          }
      };
      
      traverse(this.root);
  }

  preOrder(callback) {
      if (!callback) throw new Error("Callback is required for preOrder");
      
      const traverse = (node) => {
          if (node !== null) {
              callback(node);
              traverse(node.left);
              traverse(node.right);
          }
      };
      
      traverse(this.root);
  }

  postOrder(callback) {
      if (!callback) throw new Error("Callback is required for postOrder");
      
      const traverse = (node) => {
          if (node !== null) {
              traverse(node.left);
              traverse(node.right);
              callback(node);
          }
      };
      
      traverse(this.root);
  }

  height(node) {
      if (node === null) return -1;
      const leftHeight = this.height(node.left);
      const rightHeight = this.height(node.right);
      return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
      let depth = 0;
      let current = this.root;
      while (current !== null) {
          if (node.data === current.data) return depth;
          if (node.data < current.data) current = current.left;
          else current = current.right;
          depth++;
      }
      return -1; // Node not found
  }

  isBalanced() {
      const checkBalance = (node) => {
          if (node === null) return true;
          
          const leftHeight = this.height(node.left);
          const rightHeight = this.height(node.right);
          
          if (Math.abs(leftHeight - rightHeight) <= 1 &&
              checkBalance(node.left) &&
              checkBalance(node.right)) {
              return true;
          }
          
          return false;
      };
      
      return checkBalance(this.root);
  }

  rebalance() {
      const nodes = [];
      this.inOrder((node) => nodes.push(node.data));
      this.root = this.buildTree(nodes);
  }
}

// Helper function to generate an array of random numbers
function generateRandomArray(size, max) {
  return Array.from({length: size}, () => Math.floor(Math.random() * max));
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
      return;
  }
  if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
}

// Driver script
console.log("Starting the binary search tree operations:");

// 1. Create a binary search tree from an array of random numbers < 100
const randomArray = generateRandomArray(15, 100);
console.log("Random array:", randomArray);
const tree = new Tree(randomArray);

console.log("Initial tree structure:");
prettyPrint(tree.root);

// 2. Confirm that the tree is balanced
console.log("Is the tree balanced?", tree.isBalanced());

// 3. Print out all elements in level, pre, post, and in order
console.log("Level Order:");
tree.levelOrder((node) => console.log(node.data));

console.log("Pre Order:");
tree.preOrder((node) => console.log(node.data));

console.log("Post Order:");
tree.postOrder((node) => console.log(node.data));

console.log("In Order:");
tree.inOrder((node) => console.log(node.data));

// 4. Unbalance the tree by adding several numbers > 100
console.log("Adding numbers > 100 to unbalance the tree");
tree.insert(120);
tree.insert(130);
tree.insert(140);

console.log("Tree structure after adding numbers > 100:");
prettyPrint(tree.root);

// 5. Confirm that the tree is unbalanced
console.log("Is the tree balanced after adding numbers > 100?", tree.isBalanced());

// 6. Balance the tree
console.log("Rebalancing the tree");
tree.rebalance();

console.log("Tree structure after rebalancing:");
prettyPrint(tree.root);

// 7. Confirm that the tree is balanced
console.log("Is the tree balanced after rebalancing?", tree.isBalanced());

// 8. Print out all elements in level, pre, post, and in order
console.log("Level Order after rebalancing:");
tree.levelOrder((node) => console.log(node.data));

console.log("Pre Order after rebalancing:");
tree.preOrder((node) => console.log(node.data));

console.log("Post Order after rebalancing:");
tree.postOrder((node) => console.log(node.data));

console.log("In Order after rebalancing:");
tree.inOrder((node) => console.log(node.data));

console.log("Binary search tree operations completed.");