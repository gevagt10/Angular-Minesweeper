import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {AROUND_CELL_OPERATORS, randomNumber} from '../utils/utils';
import {CellTypeEnum} from '../enums/cell-type.enum';
import {Cell} from '../objects/cell';
import {CellStateEnum} from '../enums/cell-state.enum';

@Injectable()
export class GameBoardService {
  private board: BehaviorSubject<Cell[][]> = new BehaviorSubject<Cell[][]>([]);
  private minesPosition: Cell[] = [];

  constructor() {
  }

  generateEmptyBoard(boardSize: number = 9): void {
    const gameBoard: Cell[][] = [];
    for (let x = 0; x < boardSize; x++) {
      gameBoard[x] = [];
      for (let y = 0; y < boardSize; y++) {
        gameBoard[x][y] = new Cell({x, y, value: 0});
      }
    }
    this.board.next(gameBoard);
  }

  generateMinesPosition(): void {
    const board: Cell[][] = this.board.value;
    let mines = 0;
    while (mines < 10) {
      const randomX: number = randomNumber(0, 9);
      const randomY: number = randomNumber(0, 9);
      if (board[randomX][randomY].value !== CellTypeEnum.mine) {
        board[randomX][randomY].value = CellTypeEnum.mine;
        // Update list of mines
        this.minesPosition.push(new Cell(board[randomX][randomY]));
        mines += 1;
      }
    }
  }

  generateNumbers(): void {
    const board: Cell[][] = this.board.value;
    this.minesPosition.forEach((mine: Cell) => {
      AROUND_CELL_OPERATORS.forEach((cell: number[]) => {
        const positionX: number = mine.x + cell[0];
        const positionY: number = mine.y + cell[1];
        // Check coordinate and add +1 to cell over the mine
        if (positionX >= 0 && positionX < 9 && positionY >= 0 && positionY < 9) {
          if (board[positionX][positionY].value !== CellTypeEnum.mine) {
            board[positionX][positionY].value++;
          }
        }
      });
    });
  }

  cellClicked(cell: Cell): void {
    const boardValue: Cell[][] = this.board.value.slice();
    const boardCell: Cell = boardValue[cell.x][cell.y];

    // Check if cell in close mode
    if (boardCell.state === CellStateEnum.open) {
      return;
    }
    // User click on mine
    if (boardCell.value === CellTypeEnum.mine) {
      this.minesPosition.forEach((mine: Cell) => {
        boardValue[mine.x][mine.y].state = CellStateEnum.open;
      });
      return;
    }

    // User click on floor
    if (boardCell.value === CellTypeEnum.floor) {
      this.openZeroCells(boardCell);
      return;
    }

    // Regular number
    boardCell.state = CellStateEnum.open;
  }

  private openZeroCells(cell: Cell): void {
    const boardValue: Cell[][] = this.board.value;
    // Change state to open
    boardValue[cell.x][cell.y].state = CellStateEnum.open;

    AROUND_CELL_OPERATORS.forEach((aroundCell: number[]) => {
      const positionX: number = cell.x + aroundCell[0];
      const positionY: number = cell.y + aroundCell[1];

      // Check coordinate and add +1 to cell over the mine
      if (positionX >= 0 && positionX < 9 && positionY >= 0 && positionY < 9) {
        // Check if value iz zero
        if (boardValue[positionX][positionY].value === CellTypeEnum.floor) {
          this.cellClicked(boardValue[positionX][positionY]);
        }
      }
    });
  }

  get gameBoard(): Observable<Cell[][]> {
    return this.board.asObservable();
  }
}
