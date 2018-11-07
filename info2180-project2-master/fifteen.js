

var move = 0;



window.onload = function(e){

  //Initialization of the different elements used to modify html document
  var buttn= document.createElement("input");
  var puzzleArea = document.getElementById("puzzlearea");
  var tiles = puzzleArea.getElementsByTagName("div");
  var shuffleButton = document.getElementById("shufflebutton");

  var self = this;
  var setup = false;
  
  
  

  
  

  //Calls setup function is the playing area has not yet be set up
  if (!setup){
    var board = self.setup();
  }

  //Checks if any of the puzzle pieces have been clicked
  for( var i = 0; i < tiles.length; i++){

    tiles[i].onclick = function(element){

      //Checks if puzzle piece can be moved
      if ( element.target.className == "puzzlepiece movablepiece"){

        move++;
        boardboard = self.moveElement(board, element.target.innerHTML);
      }
    }
  }

  //Shuffles playing area whens shuffle button is pressed and starts timer
  shuffleButton.onclick = function(){

    board =  shuffleboard(board);
    
  }
   
	buttn.setAttribute("type","button");
	buttn.setAttribute("name","NEW IMAGE");
	buttn.setAttribute("value","NEW IMAGE");
	
	buttn.onclick = change;
	
	

  
}



/*
 *  This function is used for the initial set up of the playing area.
 *  The playing area starts in the completed arangement with the blank
 *  space at the bottom right.
 */
function setup(){

  //Initialization of the different elements used to modify html document
  var puzzleArea = document.getElementById("puzzlearea");
  var tiles = puzzleArea.getElementsByTagName("div");

  var y = 0;
  var x = 0;

  for( var i = 0; i < tiles.length; i++){

    tiles[i].setAttribute("class", "puzzlepiece");
    tiles[i].style.position = "relative";
    tiles[i].style.float = "left";
    tiles[i].style.backgroundPosition = x + "px " + y + "px";
    tiles[i].style.top = "0px";
    tiles[i].style.right = "0px";
    tiles[i].style.bottom = "0px";
    tiles[i].style.left = "0px";

    //Condition used to vary X & Y cordinates to properly display background picture
    if (x != -300 ){

      x -= 100;

    }
    else{

      x = 0;
      y -= 100;

     }
  }

  //Initializes movable pieces of the puzzle.
  tiles[11].setAttribute("class", "puzzlepiece movablepiece");
  tiles[14].setAttribute("class", "puzzlepiece movablepiece");

  
  //Returns initial layout of the playing Area, the relative positions of each Puzzle Piece
  return [  [null,2,5,null], [null,3,6,1], [null,4,7,2], [null,null,8,3], 
            [1,6,9,null], [2,7,10,5], [3,8,11,6], [4,null,12,7], 
            [5,10,13,null], [6,11,14,9], [7,12,15,10], [8,null,16,11], 
            [9,14,null,null], [10,15,null,13], [11,16,null,14], [12,null,null,15] 
          ];
}

/*
 *  Fuction used to move an element, accepts the Current playing area layout
 *  and the puzzle piece to be moved (the numer on the puzzle piece)
 *  returns the modified playing area.
 */
function moveElement(board, element) {

  //Initialization of the different elements used to modify html document
  var puzzleArea = document.getElementById("puzzlearea");
  var tiles = puzzleArea.getElementsByTagName("div");

  //Conditions that check the directions in which the puzzle piece can be moved
  if(board[element - 1][0] == 16){
      
   return movePieceUp(board, element, tiles);
  }
  else if(board[element - 1][1] == 16){
      
    return movePieceRight(board, element, tiles);
  }
  else if(board[element - 1][2] == 16){
      
    return movePieceDown(board, element, tiles);
  }
  else if(board[element - 1][3] == 16){

    return movePieceLeft(board, element, tiles);
  }
}

/*
 *  Function used to adjust the puzzle pieces that are movable.
 *  Adds class that makes them highlight on hover. 
 *  Accepts the array of the tiles surrounding the blank space.
 */
function fixMovability(blankCell){

  //Initialization of the different elements used to modify html document
  var puzzleArea = document.getElementById("puzzlearea");
  var tiles = puzzleArea.getElementsByTagName("div");

  //Makes all puzzle pieces regular pieces
  for(  var i = 0; i < tiles.length; i++){

    tiles[i].setAttribute("class", "puzzlepiece");
  }

  //Makes movable puzzle pieces movable
  for (var i = 0; i < blankCell.length; i++){

    if(blankCell[i] != null){
      tiles[blankCell[i]-1].setAttribute("class", "puzzlepiece movablepiece");
    }
  }
}

/*
 * Function used to move a Puzzle Piece Down. Accepts the Playing Area, Puzzle Piece Number
 * and array of puzzle pieces, return the new playing area. 
*/
function movePieceDown(board, element, tiles){

  // Retrives the offset value of piece from the top margin
  var topVal = parseInt(tiles[element - 1].style.top, 10);

  //Increases the distance from the margin by 100px
  tiles[element - 1].style.top = (topVal + 100) + "px"; 

  
  //Modifies layout of tiles in the Playing Area
  if ( board[element - 1][0] != null){ board[board[element - 1][0] -1][2] = 16 }

  if ( board[element - 1][1] != null){ board[board[element - 1][1] -1][3] = 16 }

  if ( board[element - 1][3] != null){ board[board[element - 1][3] -1][1] = 16 }

      
  if ( board[16 - 1][1] != null){ board[board[16 - 1][1] -1][3] = board[16 - 1][0] }

  if ( board[16 - 1][2] != null){ board[board[16 - 1][2] -1][0] = board[16 - 1][0] }

  if ( board[16 - 1][3] != null){ board[board[16 - 1][3] -1][1] = board[16 - 1][0] }      

  var swap = board[element - 1];

  board[element - 1] = board[15];

  board[element - 1][0] = 16;

  board[15] = swap; 

  board[15][2] = parseInt(element, 10);

  fixMovability(board[15]);

  return board;
}

/*
 * Function used to move a Puzzle Piece Up. Accepts the Playing Area, Puzzle Piece Number
 * and array of puzzle pieces, return the new playing area. 
*/
function movePieceUp(board, element, tiles){

  // Retrives the offset value of piece from the top margin
  var topVal = parseInt(tiles[element - 1].style.top, 10);
  
  //Decreases the distance from the margin by 100px
  tiles[element - 1].style.top = (topVal - 100) + "px"; 

  //Modifies layout of tiles in the Playing Area
  if ( board[element - 1][2] != null){ board[board[element - 1][2] -1][0] = 16 }

  if ( board[element - 1][1] != null){ board[board[element - 1][1] -1][3] = 16 }

  if ( board[element - 1][3] != null){ board[board[element - 1][3] -1][1] = 16 }

      
  if ( board[16 - 1][1] != null){ board[board[16 - 1][1] -1][3] = board[16 - 1][2] }

  if ( board[16 - 1][0] != null){ board[board[16 - 1][0] -1][2] = board[16 - 1][2] }

  if ( board[16 - 1][3] != null){ board[board[16 - 1][3] -1][1] = board[16 - 1][2] }  


  var swap = board[element -1];

  board[element - 1] = board[15];

  board[element - 1][2] = 16;

  board[15] = swap; 

  board[15][0] = parseInt(element, 10);

  fixMovability(board[15]);

  return board;
}

/*
 * Function used to move a Puzzle Piece to the Right. Accepts the Playing Area, Puzzle Piece Number
 * and array of puzzle pieces, return the new playing area. 
*/
function movePieceRight(board, element, tiles){

  //Retrives the offset value of piece from the left margin
  var leftVal = parseInt(tiles[element - 1].style.left, 10);
  
  //Increases the distance from the margin by 100px
  tiles[element - 1].style.left = (leftVal + 100) + "px"; 

  
  //Modifies layout of tiles in the Playing Area
  if ( board[element - 1][0] != null){ board[board[element - 1][0] -1][2] = 16 }

  if ( board[element - 1][2] != null){ board[board[element - 1][2] -1][0] = 16 }

  if ( board[element - 1][3] != null){ board[board[element - 1][3] -1][1] = 16 }

      
  if ( board[16 - 1][0] != null){ board[board[16 - 1][0] -1][2] = board[16 - 1][3] }

  if ( board[16 - 1][1] != null){ board[board[16 - 1][1] -1][3] = board[16 - 1][3] }

  if ( board[16 - 1][2] != null){ board[board[16 - 1][2] -1][0] = board[16 - 1][3] } 
  

  var swap = board[element - 1];
  
  board[element - 1] = board[15];

  board[element - 1][3] = 16;

  board[15] = swap; 

  board[15][1] = parseInt(element, 10);

  self.fixMovability(board[15]);

  return board;
}

/*
 * Function used to move a Puzzle Piece to the Left. Accepts the Playing Area, Puzzle Piece Number
 * and array of puzzle pieces, return the new playing area. 
*/
function movePieceLeft(board, element, tiles){

  //Retrives the offset value of piece from the left margin
  var leftVal = parseInt(tiles[element - 1].style.left, 10);
  
  //Increases the distance from the margin by 100px
  tiles[element - 1].style.left = (leftVal - 100) + "px"; 


  //Modifies layout of tiles in the Playing Area
  if ( board[element - 1][0] != null){ board[board[element - 1][0] -1][2] = 16 }

  if ( board[element - 1][1] != null){ board[board[element - 1][1] -1][3] = 16 }

  if ( board[element - 1][2] != null){ board[board[element - 1][2] -1][0] = 16 }

      
  if ( board[16 - 1][0] != null){ board[board[16 - 1][0] -1][2] = board[16 - 1][1] }

  if ( board[16 - 1][2] != null){ board[board[16 - 1][2] -1][0] = board[16 - 1][1] }

  if ( board[16 - 1][3] != null){ board[board[16 - 1][3] -1][1] = board[16 - 1][1] } 
  
  var swap = board[element - 1];
  
  board[element - 1] = board[15];

  board[element - 1][1] = 16;

  board[15] = swap; 

  board[15][3] = parseInt(element, 10);

  fixMovability(board[15]);

  return board;
}

/*
 *  Function used to suffle the Playing Area. Accepts playing area
 *  and returns the modifies Playing Area.
 */
function shuffleboard(board){

  //Generates a random integer
  var randomInt = Math.floor((Math.random() * 4));

  //Uses Fifty moves to shuffle the board
  for ( var i = 0; i < 50; i++){

    /*
     *  Loops until a movable piece is selected, for efficiency pieces are selected from the sides
     *  of the blank tile.
    */
    while(board[15][randomInt] == null){ randomInt = Math.floor((Math.random() * 4))}

    board = moveElement(board, board[15][randomInt]);

    randomInt = Math.floor((Math.random() * 4));

  }

  

  return board;
}

