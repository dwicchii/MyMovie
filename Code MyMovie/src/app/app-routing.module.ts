import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then(m => m.SearchPageModule)
  },
  {
    path: 'film',
    loadChildren: () => import('./film/film.module').then(m => m.FilmPageModule)
  },
  {
    path: 'trending-film',
    loadChildren: () => import('./trending-film/trending-film.module').then(m => m.TrendingFilmPageModule)
  },
  {
    path: 'detail-film/:id',
    loadChildren: () => import('./detail-film/detail-film.module').then( m => m.DetailFilmPageModule)
  },
  {
    path: 'series-populer',
    loadChildren: () => import('./series-populer/series-populer.module').then( m => m.SeriesPopulerPageModule)
  },
  {
    path: 'anime',
    loadChildren: () => import('./anime/anime.module').then( m => m.AnimePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
