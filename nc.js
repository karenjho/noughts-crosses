$(document).on('ready', function() {

  // Count the turns taken
  var turn = 0;

  // Declare the size of the game board
  var gameBoard = 5;

  // Place X or O in a clicked cell, depending on the turn
  $('td').one('click', function() {

    // We will need to perform multiples functions on the clicked td
    // So we will store the jQuery function $(this) in a variable
    var self = $(this);

    // How to alternate between X and O?
    // Assign X or O depending on whether the turn is even or odd
      // i.e. 0 % 2 = 0;
      //      1 % 2 = 1;
      //      2 % 2 = 0;
      //      3 % 2 = 1;
      //      4 % 2 = 0;
    // 0 is false-y
    // 1 is truth-y

    if (turn % 2) {
      self.html('O').addClass('o');
    } else {
      self.html('X').addClass('x');
    }

    // Figure out whether the turn was a winning one
    if (turn > 3 ) {
      checkWinningTurn();
    }

    turn++; // Increment the turn counter
  });

  // Get all id values for all objects of a specific class
  function getIds(cellClass) {
    return $(cellClass).map(function(index) {
      return $(this).attr('id');
    });
  }

  // Get the x-y coordinates from the id values array
  function getCoords(arrayOfIds) {
    var arrayOfCoordinates = [];
    $(arrayOfIds)
      .map(function(index) {
        arrayOfCoordinates.push( [ parseInt(this.substr(3, 1)), parseInt(this.substr(5, 1)) ] );
      })
      .get();

    return arrayOfCoordinates;
  }

  // Count the number of times a coordinate appears in the coordinates array
  function countDuplicates(coordinates) {
    var count = {};
    var countValues = [];

    coordinates.forEach( function(i) {
      count[i] = ( count[i] || 0 ) + 1 ;
    });

    countValues = Object.keys(count)
                        .map(function (key) {
                          return count[key];
                        });

    return countValues;
  }

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

  // Function to check if values are true
  function isTrue(value) {
    return value === true;
  }

  // Check for a descending diagonal win
  function countDescDiagonal(playerCoords) {
    var descDiagonal = [];

    for ( var i = 0; i < playerCoords.length; i++ ) {
      descDiagonal.push ( playerCoords[i][0] === playerCoords[i][1] );
    }

    return descDiagonal.filter(isTrue);
  }

  // Check for a ascending diagonal win
  function countAscDiagonal(playerCoords) {
    var ascDiagonal = [];

    for ( var i = 0; i < playerCoords.length; i++ ) {
      ascDiagonal.push ( playerCoords[i][0] === ( gameBoard - playerCoords[i][1] + 1 ) );
    }

    return ascDiagonal.filter(isTrue);
  }

  // Check if a player has a winning line
  function checkForWinLine(rowCount, colCount, descDiagCount, ascDiagCount) {
    return  ( rowCount.includes(gameBoard) ||
              colCount.includes(gameBoard) ||
              ( descDiagCount.length === gameBoard ) ||
              ( ascDiagCount.length === gameBoard )
            );
  }

  function checkWinningTurn() {

    // Retrieve all id values for Player O
    var oPlayerIds = getIds('.o');
    // Strip out coordinates from Player O's id values
    var oPlayerCoords = getCoords(oPlayerIds);

    var oPlayerRows = countRow(oPlayerCoords);
    var oPlayerCols = countCol(oPlayerCoords);
    var oPlayerDescDiagonal = countDescDiagonal(oPlayerCoords);
    var oPlayerAscDiagonal = countAscDiagonal(oPlayerCoords);

    // Check for Player O wins
    var oPlayerWin = checkForWinLine(oPlayerRows, oPlayerCols, oPlayerDescDiagonal, oPlayerAscDiagonal);

    // Retrieve all id values for Player X
    var xPlayerIds = getIds('.x');
    // Strip out coordinates from Player X's id values
    var xPlayerCoords = getCoords(xPlayerIds);

    var xPlayerRows = countRow(xPlayerCoords);
    var xPlayerCols = countCol(xPlayerCoords);
    var xPlayerDescDiagonal = countDescDiagonal(xPlayerCoords);
    var xPlayerAscDiagonal = countAscDiagonal(xPlayerCoords);

    // Check for Player X wins
    var xPlayerWin = checkForWinLine(xPlayerRows, xPlayerCols, xPlayerDescDiagonal, xPlayerAscDiagonal);

    // If Player O wins, alert that Player O is winner.
    // If Player X wins, alert that Player O is winner.
    if ( oPlayerWin ) {
      alert( "O is the winner!" );
    } else if ( xPlayerWin ) {
      alert( "X is the winner!" );
    }
  }

})
