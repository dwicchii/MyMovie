import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeriesPopulerPage } from './series-populer.page';

const routes: Routes = [
  {
    path: '',
    component: SeriesPopulerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriesPopulerPageRoutingModule {}
