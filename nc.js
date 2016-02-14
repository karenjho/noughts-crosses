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
    if (turn > 2) {
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

  // Strip the id numbers from the id values array
  function getIdNums(idArray) {
    return $(idArray)
      .map(function(index) {
        return parseInt(this.substring(5));
      })
      .get();
  }

  // Sum the id numbers
  function sumIds(idNums) {
    return idNums.reduce(function(a, b) {
      return a + b;
    });
  }

  function checkWinningTurn() {
    // Sum all id numbers for objects of 'o' class
    var oIds = getIds('.o');
    var oIdNums = getIdNums(oIds);
    var oSum = sumIds(oIdNums);

    // Sum all id numbers for objects of 'x' class
    var xIds = getIds('.x');
    var xIdNums = getIdNums(xIds);
    var xSum = sumIds(xIdNums);

    // Compare oSum and xSum to the winning sum
    if ( oSum === 15 ) {
      alert("O is the winner!");
    } else if ( xSum === 15 ) {
      alert("X is the winner!");
    }
  }

})

// Magic Square (3 x 3)
// Sum of any row, column, or diagonal: 15

// 4  3  8
// 9  5  1
// 2  7  6
