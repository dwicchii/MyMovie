import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-series-populer',
  templateUrl: './series-populer.page.html',
  styleUrls: ['./series-populer.page.scss'],
  standalone: false,
})
export class SeriesPopulerPage implements OnInit {
  series: any[] = [];
  currentPage: number = 1;

  constructor(private tmdbService: TmdbService) { }

  ngOnInit() {
    this.loadSeries();
  }

  ionViewWillLeave() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  loadSeries(event?: any) {
    this.tmdbService.getSeries(this.currentPage).subscribe(res => {
      this.series = [...this.series, ...res.results];
      if (this.currentPage === 1) {
        this.currentPage++;
        this.loadSeries();
      }
      if (event) {
        event.target.complete();
      }
    });
  }

  loadMore(event: any) {
    this.currentPage++;
    this.loadSeries(event);
  }

  getImage(path: string) {
    return this.tmdbService.getImageUrl(path);
  }

  handleRefresh(event: any) {
    this.currentPage = 1;
    this.series = [];
    this.loadSeries();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
