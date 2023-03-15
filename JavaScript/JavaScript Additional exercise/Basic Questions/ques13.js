let rows =+ prompt("Enter number of Rows: ");
let cols =+ prompt("Enter number of Columns: ");

const arr = new Array(rows).fill().map(() => new Array(cols).fill(0));

function print_spiral(arr, row, col, direction, counter) {
    if (counter > rows * cols) {
      return;
    }
    if (direction === 'right') {
      if (col < cols && arr[row][col] === 0) {
        arr[row][col] = counter;
        print_spiral(arr, row, col + 1, direction, counter + 1);
      } else {
        print_spiral(arr, row + 1, col - 1, 'down', counter);
      }
    } else if (direction === 'down') {
      if (row < rows && arr[row][col] === 0) {
        arr[row][col] = counter;
        print_spiral(arr, row + 1, col, direction, counter + 1);
      } else {
        print_spiral(arr, row - 1, col - 1, 'left', counter);
      }
    } else if (direction === 'left') {
      if (col >= 0 && arr[row][col] === 0) {
        arr[row][col] = counter;
        print_spiral(arr, row, col - 1, direction, counter + 1);
      } else {
        print_spiral(arr, row - 1, col + 1, 'up', counter);
      }
    } else if (direction === 'up') {
      if (row >= 0 && arr[row][col] === 0) {
        arr[row][col] = counter;
        print_spiral(arr, row - 1, col, direction, counter + 1);
      } else {
        print_spiral(arr, row + 1, col + 1, 'right', counter);
      }
    }
}
//Strat prinitng first row from left to right
print_spiral(arr, 0, 0, 'right', 1);

for (let i = 0; i < rows; i++) {
    console.log(arr[i]," ");
  }
  
      