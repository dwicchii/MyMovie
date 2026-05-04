import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TrendingFilmPageRoutingModule } from './trending-film-routing.module';

import { TrendingFilmPage } from './trending-film.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrendingFilmPageRoutingModule
  ],
  declarations: [TrendingFilmPage]
})
export class TrendingFilmPageModule {}
