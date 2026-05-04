import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbService } from '../services/tmdb.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-film',
  templateUrl: './detail-film.page.html',
  styleUrls: ['./detail-film.page.scss'],
  standalone: false,
})
export class DetailFilmPage {
  movie: any;
  series: any;
  anime: any;
  director: any;
  cast: any[] = [];
  review: string = '';
  userRating: number = 0;
  movieId!: number;
  mediaType: string = 'movie';
  isRatingModalOpen: boolean = false;

  constructor(
    private tmdbService: TmdbService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.mediaType = this.route.snapshot.queryParamMap.get('type') || 'movie';
    this.loadDetails();
    this.loadCredits(this.movieId);
    this.loadUserRating();
  }

  ionViewWillLeave() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  ionViewWillEnter() {
    this.userRating = 0; // Reset every time a new film is opened
    this.movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.mediaType = this.route.snapshot.queryParamMap.get('type') || 'movie';
    console.log(this.movieId, this.mediaType);
    this.loadDetails();
    this.loadCredits(this.movieId);
    this.loadUserRating();
  }

  // Refresh
  handleRefresh(event: any) {
    this.loadDetails();
    this.loadCredits(this.movieId);
    setTimeout(() => {
      event.target.complete(); 
    }, 1000);
  }

  // Load Details
  loadDetails() {
    this.movie = null;
    this.series = null;
    this.anime = null;
    if (this.mediaType === 'tv') {
      this.loadSeries();
    } else if (this.mediaType === 'anime') {
      this.loadAnime();
    } else {
      this.loadMovie();
    }
  }

  // Film
  loadMovie() {
    if (this.movieId) {
      this.tmdbService.getDetailMovie(this.movieId, 'en-US').subscribe(res => {
        this.movie = res;
        this.tmdbService.getDetailMovie(this.movieId, 'id-ID').subscribe(idRes => {
          if (idRes && idRes.overview) {
            this.movie.overview = idRes.overview;
          } else if (!this.movie.overview) {
            this.movie.overview = 'Overview tidak tersedia.';
          }
        });
      });
    }
  }

  loadSeries() {
    if (this.movieId) {
      this.tmdbService.getSeriesDetail(this.movieId, 'en-US').subscribe(res => {
        this.series = res;
        this.tmdbService.getSeriesDetail(this.movieId, 'id-ID').subscribe(idRes => {
          if (idRes && idRes.overview) {
            this.series.overview = idRes.overview;
          } else if (!this.series.overview) {
            this.series.overview = 'Overview tidak tersedia.';
          }
        });
      });
    }
  }

  loadAnime() {
    if (this.movieId) {
      this.tmdbService.getDetailMovie(this.movieId, 'en-US').subscribe(res => {
        this.anime = res;
        this.tmdbService.getDetailMovie(this.movieId, 'id-ID').subscribe(idRes => {
          if (idRes && idRes.overview) {
            this.anime.overview = idRes.overview;
          } else if (!this.anime.overview) {
            this.anime.overview = 'Overview tidak tersedia.';
          }
        });
      });
    }
  }

  getTitle(item: any): string {
    return (
      item?.title ||
      item?.name ||
      item?.original_title ||
      item?.original_name ||
      'No Title'
    );
  }

  getImage(path: string) {
    return this.tmdbService.getImageUrl(path);
  }

  formatRuntime(minutes: number): string {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  formatVotes(votes: number): string {
    if (votes >= 1000) {
      return (votes / 1000).toFixed(0) + 'K';
    }
    return votes.toString();
  }

  loadCredits(id: number) {
    if (this.mediaType === 'tv') {
      this.tmdbService.getSeriesCredits(id).subscribe((res: any) => {
        this.director = res.crew
          .filter((c: any) => c.job === 'Director' || c.job === 'Creator' || c.department === 'Directing')
          .slice(0, 3)
          .map((c: any) => c.name)
          .join(' · ');

        this.cast = res.cast
          .filter((c: any) => c.known_for_department === 'Acting')
          .slice(0, 5)
          .map((c: any) => c.name)
          .join(' · ');
      });
    } else {
      this.tmdbService.getMovieCredits(id).subscribe((res: any) => {
        this.director = res.crew
          .filter((c: any) => c.job === 'Director' || c.department === 'Directing')
          .slice(0, 3)
          .map((c: any) => c.name)
          .join(' · ');

        this.cast = res.cast
          .filter((c: any) => c.known_for_department === 'Acting')
          .slice(0, 5)
          .map((c: any) => c.name)
          .join(' · ');
      });
    }
  }

  // Modal Rating
  onDragMove(event: any) {
    console.log('Dragging:', event.detail.deltaY);
  }

  onDragEnd(event: any) {
    console.log('Drag ended:', event.detail.deltaY);
  }

  // Rating
  isWatched(): boolean {
    const list = JSON.parse(localStorage.getItem('watchedMovies') || '[]');
    return list.some((m: any) => m.id === this.movieId);
  }

  toggleWatch() {
    let list = JSON.parse(localStorage.getItem('watchedMovies') || '[]');
    if (this.isWatched()) {
      list = list.filter((m: any) => m.id !== this.movieId);
    } else {
      list.push(this.movie || this.series || this.anime);
    }
    localStorage.setItem('watchedMovies', JSON.stringify(list));
  }

  isLiked(): boolean {
    const list = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    return list.some((m: any) => m.id === this.movieId);
  }

  toggleLike() {
    let list = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    if (this.isLiked()) {
      list = list.filter((m: any) => m.id !== this.movieId);
    } else {
      list.push(this.movie || this.series || this.anime);
    }
    localStorage.setItem('likedMovies', JSON.stringify(list));
  }

  isWatchlist(): boolean {
    const list = JSON.parse(localStorage.getItem('watchlistMovies') || '[]');
    return list.some((m: any) => m.id === this.movieId);
  }

  toggleWatchlist() {
    let list = JSON.parse(localStorage.getItem('watchlistMovies') || '[]');
    if (this.isWatchlist()) {
      list = list.filter((m: any) => m.id !== this.movieId);
    } else {
      list.push(this.movie || this.series || this.anime);
    }
    localStorage.setItem('watchlistMovies', JSON.stringify(list));
  }

  addReview() {
    let list = JSON.parse(localStorage.getItem('reviews') || '[]');
    const currentMedia = this.movie || this.series || this.anime;
    
    const newReviewItem = {
      movieId: this.movieId,
      review: this.review,
      title: currentMedia?.title || currentMedia?.name || 'Unknown Title',
      poster_path: currentMedia?.poster_path,
      type: this.mediaType,
      date: new Date().toISOString()
    };
    
    const existingIndex = list.findIndex((r: any) => r.movieId === this.movieId);
    if (existingIndex > -1) {
      list[existingIndex] = newReviewItem;
    } else {
      list.unshift(newReviewItem);
    }

    localStorage.setItem('reviews', JSON.stringify(list));
    this.review = '';
  }

  saveRating() {
    localStorage.setItem('rating_' + this.movieId, this.userRating.toString());
    if (this.review && this.review.trim() !== '') {
      this.addReview();
    }
    this.isRatingModalOpen = false;
  }

  deleteRating() {
    localStorage.removeItem('rating_' + this.movieId);
    this.userRating = 0;
    this.isRatingModalOpen = false;
  }

  rateMovie(rating: number) {
    this.userRating = rating;
    localStorage.setItem('rating_' + this.movieId, rating.toString());

    if (!this.isWatched()) {
      let list = JSON.parse(localStorage.getItem('watchedMovies') || '[]');
      list.push(this.movie || this.series || this.anime);
      localStorage.setItem('watchedMovies', JSON.stringify(list));
    }
  }

  loadUserRating() {
    const saved = localStorage.getItem('rating_' + this.movieId);
    if (saved) {
      this.userRating = Number(saved);
    }
  }

  // Navigate to detail page
  goToDetail(id: number, type: string) {
    this.router.navigate(['/detail-film', id, { type }]);
  }

  goBack() {
    this.location.back();
  }
}


