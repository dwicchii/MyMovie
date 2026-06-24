import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-trending-film',
  templateUrl: './trending-film.page.html',
  styleUrls: ['./trending-film.page.scss'],
  standalone: false,
})
export class TrendingFilmPage implements OnInit {
  trendingMovies: any[] = [];
  isModalOpen = false;
  selectedMovie: any = null;
  
  constructor(private tmdbService: TmdbService) { }

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.tmdbService.getTrendingMovies().subscribe(res => {
      this.trendingMovies = res.results;
    });
  }

  loadTrending() {
    this.tmdbService.getTrending().subscribe(res => {
      this.trendingMovies = res.results;
    });
  }

  getImage(path: string) {
    return this.tmdbService.getImageUrl(path);
  }

  handleRefresh(event: any) {
    this.loadMovies();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
