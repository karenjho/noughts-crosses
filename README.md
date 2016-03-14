# Connect!
Scalable tic-tac-toe game written in Javascript &amp; jQuery

[Play Connect!](http://karenjho.github.io/connect/index.html)

![alt tag](http://g.recordit.co/b6YGSv6Ul2.gif)

## Code Samples
See [nc.js](https://github.com/karenjho/noughts-crosses/blob/master/nc.js) for JavaScript/jQuery code.

Connect! treats the game board like a grid of coordinates. It builds the board and assigns a pair of coordinates to each cell on the board:

```javascript
function populateGameBoard(boardSize) {

  $('#gameGrid').empty();

  // Inside the game grid (table), create as many rows as specified by gameBoard
  for (var i = 0; i < boardSize; i++) {
    var newRow = "<tr></tr>";
    $('#gameGrid').append(newRow);
    $('tr').addClass('gameRow');
  }

  // In each row, create as many cells as specified by gameBoard
  for (var i = 0; i < boardSize; i++) {
    var newCell = "<td></td>";
    $('.gameRow').append(newCell);
  }

  // Assign the appropriate id value with xy coordinates to each cell
  for (var i = 0; i < boardSize; i++) {
    var row = i + 1;
    $('.gameRow').eq(i).find('td').each( function(n) {
      var col = n + 1;
      var cellId = "xy-" + row + "-" + col
      $(this).attr('id', cellId);
    });
  }
}
```
### Winning patterns

For each turn, it gathers the coordinates for each player's cells, and analyses them to see if they match one of the winning patterns.

#### Row
```javascript
// Check for a horizontal row win
function countRow(playerCoords) {
  var yCoords = [];

  // Retrieve the y coordinates of the player coordinates
  for ( var i = 0; i < playerCoords.length; i++ ) {
    yCoords.push ( playerCoords[i][1] );
  }

  // Count the number of times a y-coordinate appears in the y-coordinates array
  return countDuplicates(yCoords);
}
```

#### Column
```javascript
// Check for a vertical column win
function countCol(playerCoords) {
  var xCoords = [];

  // Retrieve the x coordinates of the player coordinates
  for ( var i = 0; i < playerCoords.length; i++ ) {
    xCoords.push ( playerCoords[i][0] );
  }

  // Count the number of times a y-coordinate appears in the y-coordinates array
  return countDuplicates(xCoords);
}
```

#### Descending Diagonal
```javascript
// Check for a descending diagonal win
function countDescDiagonal(playerCoords) {
  var descDiagonal = [];

  for ( var i = 0; i < playerCoords.length; i++ ) {
    descDiagonal.push ( playerCoords[i][0] === playerCoords[i][1] );
  }

  return descDiagonal.filter(isTrue);
}
```

#### Ascending Diagonal
```javascript
// Check for a ascending diagonal win
function countAscDiagonal(playerCoords) {
  var ascDiagonal = [];

  for ( var i = 0; i < playerCoords.length; i++ ) {
    ascDiagonal.push ( playerCoords[i][0] === ( gameBoard - playerCoords[i][1] + 1 ) );
  }

  return ascDiagonal.filter(isTrue);
}
```

### Check for a Win

Then it checks if a player has a winning pattern:

```javascript
// Check if a player has a winning line
function checkForWinLine(rowCount, colCount, descDiagCount, ascDiagCount) {
            // First check if any of the player rows is as wide as the game board
  return  ( rowCount.includes(gameBoard) ||
            // Then check if any of the player columns is as tall as the game board
            colCount.includes(gameBoard) ||
            // Next check if the player has enough descending diagonal cells (equal to the game board)
            ( descDiagCount.length === gameBoard ) ||
            // Finally check if the player has enough ascending diagonal cells (equal to the game board)
            ( ascDiagCount.length === gameBoard )
          );
}
```
See [nc.js](https://github.com/karenjho/noughts-crosses/blob/master/nc.js) for the detailed JavaScript/jQuery code.

## Contact
Karen Ho – [@karenjho](https://twitter.com/karenjho) – [https://github.com/karenjho](https://github.com/karenjho)
