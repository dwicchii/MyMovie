import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-anime',
  templateUrl: './anime.page.html',
  styleUrls: ['./anime.page.scss'],
  standalone: false,
})
export class AnimePage implements OnInit {
  animeMovies: any[] = [];
  currentPage: number = 1;

  constructor(private tmdbService: TmdbService) { }

  ngOnInit() {
    this.loadAnime();
  }

  ionViewWillLeave() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  loadAnime(event?: any) {
    this.tmdbService.getAnime(this.currentPage).subscribe(res => {
      this.animeMovies = [...this.animeMovies, ...res.results];
      if (this.currentPage === 1) {
        this.currentPage++;
        this.loadAnime();
      }
      if (event) {
        event.target.complete();
      }
    });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadAnime(event);
  }

  getImage(path: string) {
    return this.tmdbService.getImageUrl(path);
  }

  handleRefresh(event: any) {
    this.currentPage = 1;
    this.animeMovies = [];
    this.loadAnime();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
