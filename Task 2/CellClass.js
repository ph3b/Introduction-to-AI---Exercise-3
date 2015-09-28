/**
 * Created by mattiden on 27.09.15.
 */
class Cell {
  constructor(x, y, fill, moveCost){
    this.HValue = 0;
    this.GCost = 0;
    this.FValue = 0;
    this.x = x;
    this.y = y;
    this.parent = null;
    this.fill = fill;
    this.moveCost = moveCost || 10;
  }

  setHCost(goalCell){
    this.HValue = Math.abs(this.x - goalCell.x) + Math.abs(this.y - goalCell.y);
    return this._setFValue();
  }
  setGCost(value){
    this.GCost = value;
    return this._setFValue();
  }
  _setFValue(){
    this.FValue =  this.HValue + this.GCost;
  }
}

export default Cell;