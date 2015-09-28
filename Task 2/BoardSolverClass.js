import fileSystem from 'fs';
import Cell from './CellClass.js';

class BoardSolver {

  constructor(startCellCharacter, goalCellCharacter, blockerFill){
    this.goalCellFill = goalCellCharacter;
    this.startCellFill = startCellCharacter;
    this.blockerFill = blockerFill;
    this.width = 0;
    this.height = 0;
  }

  openBoard(filename){
    // Open raw text file
    var rawImportedBoard = fileSystem.readFileSync("boards/" + filename, "utf8");

    // Make a 2D array and fill it with our cells. This converts the 1D rawBoard to a 2D boardArray containing
    // cells objects.
    var boardArray = [];
    var row = [];

    // Treat the raw board like a long string. Newlines are identified by \n
    var x = 0;
    var y = 0;
    for(var character of rawImportedBoard){
      if(character == "\n"){
        this.width = x;
        y += 1;
        x = 0;
        boardArray.push(row);
       row = [];
      }
      else {
        row.push(new Cell(x, y, character));
        x += 1;
      }
    }
    // Set board, height and width of board
    this.board = boardArray;
    this.height = y;

    // Calculate H Value for every cell
    var goalCell = this.getGoalCell();
    this.board.forEach((cellRow) => {
      cellRow.forEach((cell) => {
          if(cell.fill !== this.blockerFill){
            cell.setHCost(goalCell)
          }
      })
    });
  };

  getGoalCell(){
    this._checkIfBoardHasBeenImported();
    return this._getCellByFill(this.goalCellFill);
  }

  getStartCell(){
    this._checkIfBoardHasBeenImported();
    return this._getCellByFill(this.startCellFill);
  }

  getCellByCoordinates(x, y){
    this._checkIfBoardHasBeenImported();
    try{
      return this.board[y][x];
    }
    catch(err){
      return null;
    }
  }

  getNeighborCells(cell){
    let x = cell.x;
    let y = cell.y;
    var neighborCellList = [];
    neighborCellList.push(this.getCellByCoordinates(x+1, y));
    neighborCellList.push(this.getCellByCoordinates(x-1, y));
    neighborCellList.push(this.getCellByCoordinates(x, y+1));
    neighborCellList.push(this.getCellByCoordinates(x, y-1));
    return neighborCellList;
  }

  solve(){
    this._checkIfBoardHasBeenImported();

    // Begin A* algorithm
    var OpenList = [];
    var ClosedList = [];
    var startCell = this.getStartCell();
    var goalCell = this.getGoalCell();

    // We begin our search at the startCell
    OpenList.push(startCell);

    while(OpenList.length > 0){
      // Get cell with lowest F-value from OpenList. Remove it from OpenList and add to ClosedList.
      OpenList.sort(BoardSolver._sortByLowestFValue);
      var currentCell = OpenList[0];
      OpenList.splice(0, 1);
      ClosedList.push(currentCell);

      // Get every neighbor cell and iterate through them.
      var neighborCellList = this.getNeighborCells(currentCell);
      for(var neighborCell of neighborCellList){

        // Make sure we don't go out of bounds of the map.
        if(neighborCell !== null && neighborCell !== undefined){

          // Make sure we don't add block cells.
          if(neighborCell.fill !== this.blockerFill){

            // Check if we have found the goalCell
            if(currentCell === goalCell){
              // We found the path to the goalCell. Now we traverse the path in reverse and mark the path-cells  with an identifier.
              return this._printReversePath(goalCell);
            }

            // If the cell is already discovered we see if the new G-cost including this currentCell is better.
            if(OpenList.indexOf(neighborCell) > -1){
              // Compare the new, tentative path G-Cost with the existing cost. If lower, replace it.
              var tentativeCost = currentCell.GCost + neighborCell.moveCost;
              if(tentativeCost < neighborCell.GCost){
                neighborCell.parent = currentCell;
              }
            }
            // If the cell hasn't been discovered we add it to our OpenList and calculate the G-cost.
            else if(ClosedList.indexOf(neighborCell) === -1){
              neighborCell.parent = currentCell;
              neighborCell.setGCost(currentCell.GCost + neighborCell.moveCost);
              OpenList.push(neighborCell);
            }
          }
        }
      }
    }
  }

  _checkIfBoardHasBeenImported(){
    if(!this.board){
      throw "You need to import a board first";
    }
  }

  _getCellByFill(fill){
    var cellWeWantToFind;
    this.board.forEach((cellRow) => {
      cellRow.forEach((cell) => {
        if(cell.fill == fill){
          cellWeWantToFind = cell;
        }
      })
    });
    return cellWeWantToFind;
  }

  _printReversePath(goalCell){
    this._checkIfBoardHasBeenImported();
    var currentCell = goalCell.parent;

    // Change the fill of the all the cells we want to go through
    while(currentCell.parent !== null){
      currentCell.fill = "O";
      currentCell = currentCell.parent;
    }

    this.board.forEach((cellRow) => {
      var row = "";
      cellRow.forEach((cell)=>{
        row += cell.fill + "  "
      });
      console.log(row);
    });
  };

  static _sortByLowestFValue(a , b) {
    return a.FValue - b.FValue;
  }

}
export default BoardSolver;