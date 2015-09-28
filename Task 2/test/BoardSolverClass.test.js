/**
 * Created by mattiden on 27.09.15.
 */
import expect from 'expect.js'
import BoardSolver from './../BoardSolverClass.js';

describe('BoardSolver Unit tests', function () {

  it('Should format the raw textboard to a 2D array', (done) => {
    var boardSolver = new BoardSolver("A", "B", "#");
    boardSolver.openBoard("board-1-1.txt");
    expect(boardSolver.board[2][9].fill).to.be.eql("#");
    expect(boardSolver.board[3][11].fill).to.be.eql("A");
    expect(boardSolver.board[3][17].fill).to.be.eql("B");
    expect(boardSolver.board[3][11].x).to.be.eql(11);
    expect(boardSolver.board[3][11].parent).to.be.eql(null);
    done();
  });

  it('Should have correct width and height after opening board 2D array', (done) => {
    var boardSolver = new BoardSolver("A", "B", "#");
    boardSolver.openBoard("board-1-1.txt");
    expect(boardSolver.height).to.be(7);
    expect(boardSolver.width).to.be(20);
    done();
  });

  it('Cell should have correct H value', (done) => {
    var boardSolver = new BoardSolver("A", "B", "#");
    boardSolver.openBoard("board-1-1.txt");
    expect(boardSolver.board[3][11].HValue).to.be.eql(6);
    done();
  });

  it('Should get the marshall distance between two nodes on different columns but same row', (done) => {
    var boardSolver = new BoardSolver("A", "B", "#");
    boardSolver.openBoard("board-1-1.txt");
    var startNode = boardSolver.board[3][11];
    var goalNode = boardSolver.board[3][17];
    startNode.setHCost(goalNode);
    expect(startNode.HValue).to.be.eql(6);
    done();
  });

  it('Should get the marshall distance between two nodes on rows columns but same column', (done) => {
    var boardSolver = new BoardSolver("A", "B", "#");
    boardSolver.openBoard("board-1-1.txt")
    var startNode = boardSolver.board[0][17];
    var goalNode = boardSolver.board[3][17];
    startNode.setHCost(goalNode);
    expect(startNode.HValue).to.be.eql(3);
    done();
  });

  it('Should get the marshall distance between two nodes on different rows and columns', (done) => {
    var boardSolver = new BoardSolver("A", "B", "#");
    boardSolver.openBoard("board-1-1.txt")
    var startNode = boardSolver.board[2][9];
    var goalNode = boardSolver.board[3][17];
    startNode.setHCost(goalNode);
    expect(startNode.HValue).to.be.eql(9);
    done();

  });

  it('Should get correct goal node', function (done) {
    var boardSolver = new BoardSolver("A", "B", "#");
    boardSolver.openBoard("board-1-1.txt")
    var goalCell = boardSolver.getGoalCell();
    expect(goalCell.fill).to.be.eql("B");
    expect(goalCell.x).to.be.eql(17);
    expect(goalCell.y).to.be.eql(3);
    done();
  });

  it('Should get correct start node', function (done) {
    var boardSolver = new BoardSolver("A", "B", "#");
    boardSolver.openBoard("board-1-1.txt")
    var startCell = boardSolver.getStartCell();
    expect(startCell.fill).to.be.eql("A");
    expect(startCell.x).to.be.eql(11);
    expect(startCell.y).to.be.eql(3);
    done();

  });

  it('Should get correct node', function (done) {
    var boardSolver = new BoardSolver("A", "B", "#");
    boardSolver.openBoard("board-1-1.txt")
    var node = boardSolver.getCellByCoordinates(17, 3);
    expect(node.x).to.be.eql(17);
    expect(node.y).to.be.eql(3);
    expect(node.fill).to.be.eql("B");
    done();
  });

  it('Should get correct adjacent nodes', function (done) {
    var boardSolver = new BoardSolver("A", "B", "#");
    boardSolver.openBoard("board-1-1.txt");
    var cell = boardSolver.getCellByCoordinates(13, 3);
    var adjacentList = boardSolver.getNeighborCells(cell);
    var blockneighbor = 0;
    var freeCellneighbor = 0;
    for (var i = 0; i < adjacentList.length; i++) {
      if (adjacentList[i].fill == "#") {
        blockneighbor++;
      }
      if (adjacentList[i].fill == '.') {
        freeCellneighbor++;
      }
    }

    expect(adjacentList.length).to.be.eql(4);
    expect(blockneighbor).to.be(3);
    expect(freeCellneighbor).to.be(1);
    done();
  });

  it('Should solve board and return node path', function (done) {
    var boardSolver2 = new BoardSolver("A", "B", "#");
    boardSolver2.openBoard("board-1-1.txt");
    boardSolver2.solve();
    done();
  });


});