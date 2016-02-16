$(document).on('ready', function() {

  $('#boardForm').on('submit', function(event) {
    // Set the game Board size
    var gameBoard = parseInt( $('#boardSize').val() );

    populateGameBoard(gameBoard);

    // Count the turns taken
    var turn = 0;
    // Calculate the minimum number of turns needed to win
    var minWinningTurn = ( gameBoard * 2 ) - 1;

    // When someone clicks a cell, define the function when the click event occurs
    // .one() only allows the event function to be performed once
    $('td').one('click', function(event) {
      event.stopPropagation();
      // Store the jQuery function $(this) in a variable
      var self = $(this)

      // How to alternate between X and O?
      // Assign X or O depending on whether the turn is even or odd
        // i.e. 0 % 2 = 0;
        //      1 % 2 = 1;
        //      2 % 2 = 0;
        //      3 % 2 = 1;
        //      4 % 2 = 0;
      // 0 is false-y
      // 1 is truth-y

      // Place X or O in a clicked cell, depending on the turn
      if (turn % 2) {
        self.html('<span class="glyphicon glyphicon-heart" aria-hidden="true"></span>').addClass('o');
      } else {
        self.html('<span class="glyphicon glyphicon-star" aria-hidden="true"></span>').addClass('x');
      }

      // Figure out whether the turn was a winning one
      if (turn >= minWinningTurn ) {
        checkWinningTurn(gameBoard);
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

    function checkWinningTurn(gameBoard) {

      var gameBoard = gameBoard;

      // Retrieve all id values for Player O
      var oPlayerIds = getIds('.o');
      // Strip out coordinates from Player O's id values
      var oPlayerCoords = getCoords(oPlayerIds);
      // Create an object that counts how often Player O appears in each row of the board ( key = row, value = appearance )
      var oPlayerRows = countRow(oPlayerCoords);
      // Create an object that counts how often Player O appears in each column of the board ( key = column, value = appearance )
      var oPlayerCols = countCol(oPlayerCoords);
      // Create an array of all the 'true' occurences when Player O's coordinate matches the descending diagonal
      var oPlayerDescDiagonal = countDescDiagonal(oPlayerCoords);
      // Create an array of all the 'true' occurences when Player O's coordinate matches the ascending diagonal
      var oPlayerAscDiagonal = countAscDiagonal(oPlayerCoords);

      // Check for Player O wins
      var oPlayerWin = checkForWinLine(oPlayerRows, oPlayerCols, oPlayerDescDiagonal, oPlayerAscDiagonal);

      // Retrieve all id values for Player X
      var xPlayerIds = getIds('.x');
      // Strip out coordinates from Player X's id values
      var xPlayerCoords = getCoords(xPlayerIds);
      // Create an object that counts how often Player X appears in each row of the board ( key = row, value = appearance )
      var xPlayerRows = countRow(xPlayerCoords);
      // Create an object that counts how often Player X appears in each column of the board ( key = column, value = appearance )
      var xPlayerCols = countCol(xPlayerCoords);
      // Create an array of all the 'true' occurences when Player X's coordinate matches the descending diagonal
      var xPlayerDescDiagonal = countDescDiagonal(xPlayerCoords);
      // Create an array of all the 'true' occurences when Player X's coordinate matches the ascending diagonal
      var xPlayerAscDiagonal = countAscDiagonal(xPlayerCoords);

      // Check for Player X wins
      var xPlayerWin = checkForWinLine(xPlayerRows, xPlayerCols, xPlayerDescDiagonal, xPlayerAscDiagonal);

      // If Player O wins, alert that Player O is winner.
      if ( oPlayerWin ) {
        alert( "Heart is the winner! Play again?" );
        location.reload();
      // If Player X wins, alert that Player O is winner.
      } else if ( xPlayerWin ) {
        alert( "Star is the winner! Play again?" );
        location.reload();
      // If all squares have been filled and no one has one, declare a tie.
      } else if ( $('td:empty').length === 0 ) {
        alert( "It's a tie, so everyone's a winner! Play again?" );
        location.reload();
      }
    }

    // Prevent the "click" default action
    event.preventDefault();

  });

  // Create a game board based on the given gameBoard size
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

})
