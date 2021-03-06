import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GameBoardComponent} from './game-board/game-board.component';
import {GameBoardService} from './game-board/game-board.service';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [GameBoardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
