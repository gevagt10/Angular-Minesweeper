import {CellStateEnum} from '../enums/cell-state.enum';

export class Cell {
  x: number;
  y: number;
  value: number;
  state?: CellStateEnum = CellStateEnum.closed;
  constructor(cell?: Cell) {
    if (!cell) { return; }
    this.x = cell.x;
    this.y = cell.y;
    this.value = cell.value;
    if (cell.state) { this.state = cell.state; }
  }

}
