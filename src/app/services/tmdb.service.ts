import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface TmdbResult {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private baseUrl = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) { }

  getTrending(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/trending/all/day?api_key=${this.apiKey}&language=en-US`);
  }

  getMovie(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`);
  }

  getDetailMovie(id: number, lang: string = 'id-ID'): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=${lang}`);
  }

  getTrendingMovies(page: number = 1): Observable<TmdbResult> {
    return this.http.get<TmdbResult>(`${this.baseUrl}/trending/movie/day?api_key=${this.apiKey}&language=en-US&page=${page}`);
  }

  getNowPlayingMovies(page: number = 1): Observable<TmdbResult> {
    return this.http.get<TmdbResult>(`${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=${page}`);
  }

  getImageUrl(path: string, size: string = 'w500'): string {
    return path ? `https://image.tmdb.org/t/p/${size}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
  }

  getMovieCredits(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}&language=en-US`);
  }

  getSeries(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tv/popular?api_key=${this.apiKey}&language=en-US&page=${page}`);
  }

  getSeriesDetail(id: number, lang: string = 'id-ID'): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tv/${id}?api_key=${this.apiKey}&language=${lang}`);
  }

  getSeriesCredits(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/tv/${id}/credits?api_key=${this.apiKey}&language=en-US`);
  }

  getAnime(page: number = 1): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&with_genres=16&with_original_language=ja&page=${page}`);
  }

  getAnimeDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=id-ID`);
  }

  getAnimeCredits(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${id}/credits?api_key=${this.apiKey}&language=en-US`);
  }

  searchAll(query: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search/multi?api_key=${this.apiKey}&language=en-US&query=${query}`);
  }

  getRecommendations(id: number, type: string = 'movie'): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${type}/${id}/recommendations?api_key=${this.apiKey}&language=en-US&page=1`);
  }

}
