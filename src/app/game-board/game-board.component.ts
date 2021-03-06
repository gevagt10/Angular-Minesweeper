import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {GameBoardService} from './game-board.service';
import {Observable} from 'rxjs';
import {Cell} from '../objects/cell';
import {CellTypeEnum} from '../enums/cell-type.enum';
import {CellStateEnum} from '../enums/cell-state.enum';
import {GameStatusEnum} from '../enums/game-status.enum';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameBoardComponent implements OnInit {

  @Input() boardSize = 9;
  board$: Observable<Cell[][]>;
  status$: Observable<GameStatusEnum>;

  cellTypeEnum = CellTypeEnum;
  cellStateEnum = CellStateEnum;
  gameStatusEnum = GameStatusEnum;
  constructor(private gameBoardService: GameBoardService) {
  }

  ngOnInit(): void {
    this.board$ = this.gameBoardService.gameBoard;
    this.status$ = this.gameBoardService.gameStatus;

    this.gameBoardService.loadFirstTimeBoard();
  }

  trackByRow(index: number, element: Cell[]): number {
    return index;
  }
  trackByCell(index: number, element: Cell): number {
    return element.value;
  }
  onCellClick(cell: Cell): void {
    this.gameBoardService.cellClicked(cell);
  }
  onChangeStatusClick(): void {
    this.gameBoardService.gameStatusChanged();
  }
}

