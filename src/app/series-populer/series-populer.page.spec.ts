import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeriesPopulerPage } from './series-populer.page';

describe('SeriesPopulerPage', () => {
  let component: SeriesPopulerPage;
  let fixture: ComponentFixture<SeriesPopulerPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesPopulerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
