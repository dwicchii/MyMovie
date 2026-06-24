import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrendingFilmPage } from './trending-film.page';

const routes: Routes = [
  {
    path: '',
    component: TrendingFilmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrendingFilmPageRoutingModule {}
