$(document).on('ready', function() {

  // Count the turns taken
  var turn = 0;

  // Place X or O in a clicked cell, depending on the turn
  $('td').one('click', function() {

    // We will need to perform multiples functions on the clicked td
    // So we will store the jQuery function $(this) in a variable
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

    if (turn % 2) {
      self.html('O').addClass('o');
    } else {
      self.html('X').addClass('x');
    }

    turn++ // Increment the turn counter
  });

})

// Magic Square (5 x 5)
// Sum of any row, column, or diagonal: 65

// 11  18  25   2   9
// 10  12  19  21   3
//  4   6  13  20  22
// 23   5   7  14  16
// 17  24   1   8  15
