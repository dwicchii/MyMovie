import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  trendingMovies: any[] = [];
  terbaruMovies: any[] = [];
  seriesMovies: any[] = [];
  animeMovies: any[] = [];
  heroMovies: any[] = [];
  movie: any;

  constructor(private tmdbService: TmdbService, private router: Router) {}

  ngOnInit() {
    this.loadHeroMovie();
    this.loadMovies();
    this.loadSeries();
    this.loadAnime();
  }

  ionViewWillLeave() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  loadHeroMovie() {
    this.tmdbService.getTrending().subscribe((res: any) => {
      this.movie = res.results[0];
    });
  }

  loadMovies() {
    this.tmdbService.getTrendingMovies().subscribe(res => {
      this.trendingMovies = res.results;
      this.updateHero();
    });

    this.tmdbService.getNowPlayingMovies().subscribe(res => {
      this.terbaruMovies = res.results;
    });
  }

  loadSeries() {
    this.tmdbService.getSeries().subscribe(res => {
      this.seriesMovies = res.results;
      this.updateHero();
    });
  }

  loadAnime() {
    this.tmdbService.getAnime().subscribe(res => {
      this.animeMovies = res.results;
      this.updateHero();
    });
  }

  updateHero() {
    if (this.trendingMovies.length && this.seriesMovies.length && this.animeMovies.length) {
      const topTrending = [...this.trendingMovies]
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 2)
        .map(m => ({ ...m, media_type: m.media_type || 'movie' }));

      const topSeries = [...this.seriesMovies]
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 2)
        .map(m => ({ ...m, media_type: 'tv' }));

      const topAnime = [...this.animeMovies]
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 2)
        .map(m => ({ ...m, media_type: 'movie' }));

      this.heroMovies = [...topTrending, ...topSeries, ...topAnime];
    }
  }

  getImage(path: string) {
    return this.tmdbService.getImageUrl(path);
  }

  goToTrending() {
    this.router.navigate(['/trending-film']);
  }

  goToSeries() {
    this.router.navigate(['/series-populer']);
  }

  goToAnime() {
    this.router.navigate(['/anime']);
  }

  handleRefresh(event: any) {
    this.loadHeroMovie();
    this.loadMovies();
    this.loadSeries();
    this.loadAnime();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
