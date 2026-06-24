import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrendingFilmPage } from './trending-film.page';

describe('TrendingFilmPage', () => {
  let component: TrendingFilmPage;
  let fixture: ComponentFixture<TrendingFilmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrendingFilmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
