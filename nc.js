$(document).on('ready', function() {

  // Count the turns taken
  var turn = 0;

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

  // Get the x-positions from the id values array
  function xPositions(idArray) {
    return $(idArray)
      .map(function(index) {
        return parseInt(this.substr(3, 1));
      })
      .get();
  }

  // Get the y-positions from the id values array
  function yPositions(idArray) {
    return $(idArray)
      .map(function(index) {
        return parseInt(this.substr(5, 1));
      })
      .get();
  }

  // Check for a horizontal row win
  function checkRow(yArray) {
    var winningRow = false;

    var row1 = $.grep(yArray, function(a) {
      return a === 1;
    });
    var row2 = $.grep(yArray, function(a) {
      return a === 2;
    });
    var row3 = $.grep(yArray, function(a) {
      return a === 3;
    });
    if ( $(row1).length === 3 || $(row2).length === 3 || $(row3).length === 3) {
      return winningRow = true;
    }
  }

  // Check for a vertical column win
  function checkColumn(xArray) {
    var winningColumn = false;

    var col1 = $.grep(xArray, function(a) {
      return a === 1;
    });
    var col2 = $.grep(xArray, function(a) {
      return a === 2;
    });
    var col3 = $.grep(xArray, function(a) {
      return a === 3;
    });
    if ( $(col1).length === 3 || $(col2).length === 3 || $(col3).length === 3) {
      return winningColumn = true;
    }
  }

  function checkWinningTurn() {
    // Sum all id numbers for objects of 'o' class
    var oIds = getIds('.o');
    var oXPositions = xPositions(oIds);
    var oYPositions = yPositions(oIds);
    var oWinningRow = checkRow(oYPositions);
    var oWinningColumn  = checkColumn(oXPositions);

    // Sum all id numbers for objects of 'x' class
    var xIds = getIds('.x');
    var xXPositions = xPositions(xIds);
    var xYPositions = yPositions(xIds);
    var xWinningRow = checkRow(xYPositions);
    var xWinningColumn  = checkColumn(xXPositions);

    // Compare oSum and xSum to the winning sum
    if ( xWinningRow || xWinningColumn ) {
      return alert( "X is the winner!" );
    } else if ( oWinningRow || oWinningColumn ) {
      return alert( "O is the winner!" );
    }
  }

})
