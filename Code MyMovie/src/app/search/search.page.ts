import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false,
})
export class SearchPage implements OnInit {
  searchResults: any[] = [];
  recommendedMovies: any[] = [];
  isSearching: boolean = false;
  private searchSubject = new Subject<string>();

  constructor(
    private tmdbService: TmdbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.searchAll(query);
    });
  }

  ionViewWillEnter() {
    this.loadRecommendations();
  }

  onSearch(event: any) {
    this.searchSubject.next(event.target.value);
  }

  searchAll(query: string) {
    this.isSearching = !!query.trim();

    if (!query.trim()) {
      this.searchResults = [];
      return;
    }

    this.tmdbService.searchAll(query).subscribe((res: any) => {
      this.searchResults = res.results.filter((item: any) => item.media_type !== 'person');
    });
  }

  loadRecommendations() {
    const liked = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    const watched = JSON.parse(localStorage.getItem('watchedMovies') || '[]');
    const watchlist = JSON.parse(localStorage.getItem('watchlistMovies') || '[]');
    
    const allUserMovies = [...liked, ...watched, ...watchlist];
    
    if (allUserMovies.length > 0) {
      const targetMovie = allUserMovies[allUserMovies.length - 1]; // Use latest
      const type = targetMovie.title ? 'movie' : 'tv';
      
      this.tmdbService.getRecommendations(targetMovie.id, type).subscribe((res: any) => {
        this.recommendedMovies = res.results.slice(0, 10);
        
        // Fallback if recommendations are empty
        if (this.recommendedMovies.length === 0) {
          this.loadFallbackRecommendations();
        }
      });
    } else {
      this.loadFallbackRecommendations();
    }
  }

  loadFallbackRecommendations() {
    this.tmdbService.getTrendingMovies().subscribe((res: any) => {
      this.recommendedMovies = res.results.slice(0, 10);
    });
  }

  getImage(path: string): string {
    return this.tmdbService.getImageUrl(path);
  }

  goToDetail(id: number, mediaType: string = 'movie') {
    this.router.navigate(['/detail-film', id], { queryParams: { type: mediaType } });
  }

  handleRefresh(event: any) {
    this.loadRecommendations();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
