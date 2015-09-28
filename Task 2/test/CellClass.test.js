/**
 * Created by mattiden on 27.09.15.
 */
import expect from 'expect.js'
import BoardSolver from './../BoardSolverClass.js';
import Cell from './../CellClass.js';

describe('NodeClass Unit tests', () => {

  it('Should set G Cost',(done) => {
    var cell = new Cell();
    cell.x = 10;
    cell.y = 10;
    cell.setGCost(10);
    expect(cell.GCost).to.be.eql(10);
    expect(cell.FValue).to.be.eql(10);
    done();
  });

  it('Should set H value',(done) => {
    var goalCell = new Cell();
    var startCell = new Cell();
    startCell.x = 10;
    startCell.y = 10;
    goalCell.x = 15;
    goalCell.y = 10;
    startCell.setHCost(goalCell);
    expect(startCell.HValue).to.be.eql(5);
    expect(startCell.FValue).to.be.eql(5);
    done();
  })

});