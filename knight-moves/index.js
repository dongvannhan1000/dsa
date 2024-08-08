function knightMoves(start, end) {
  console.log(`Finding the shortest path from [${start}] to [${end}]`);

  const moves = [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1]
  ];

  const isValidMove = ([x, y]) => x >= 0 && x < 8 && y >= 0 && y < 8;
  const posToString = (pos) => pos.join(',');

  // Hàm vẽ bàn cờ
  function drawBoard(currentPos, endPos, path) {
      const board = Array(8).fill().map(() => Array(8).fill('.'));
      board[currentPos[0]][currentPos[1]] = 'N';
      board[endPos[0]][endPos[1]] = 'E';
      path.forEach((pos, index) => {
          if (index > 0 && index < path.length - 1) {
              board[pos[0]][pos[1]] = index.toString();
          }
      });
      console.log('Current board state:');
      console.log('   0 1 2 3 4 5 6 7');
      board.forEach((row, index) => {
          console.log(`${index}  ${row.join(' ')}`);
      });
      console.log('N: Knight, E: End position, Numbers: Path');
  }

  const bfs = () => {
      const queue = [[start]];
      const visited = new Set([posToString(start)]);
      let iteration = 0;

      while (queue.length > 0) {
          const path = queue.shift();
          const [x, y] = path[path.length - 1];

          console.log(`\nIteration ${++iteration}:`);
          console.log(`Current position: [${x}, ${y}]`);
          drawBoard([x, y], end, path);

          if (x === end[0] && y === end[1]) {
              console.log('\nTarget reached!');
              return path;
          }

          for (const [dx, dy] of moves) {
              const nextPos = [x + dx, y + dy];
              const posString = posToString(nextPos);

              if (isValidMove(nextPos) && !visited.has(posString)) {
                  visited.add(posString);
                  queue.push([...path, nextPos]);
                  console.log(`Added new position to queue: [${nextPos}]`);
              }
          }

          console.log(`Positions in queue: ${queue.length}`);
      }
  };

  const path = bfs();
  
  console.log(`\nYou made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach(pos => console.log(pos));
  
  return path;
}

// Ví dụ sử dụng:
console.log(knightMoves([0,0],[7,7]));