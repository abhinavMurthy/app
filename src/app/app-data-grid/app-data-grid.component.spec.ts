import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDataGridComponent } from './app-data-grid.component';

describe('AppDataGridComponent', () => {
  let component: AppDataGridComponent;
  let fixture: ComponentFixture<AppDataGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppDataGridComponent]
    });
    fixture = TestBed.createComponent(AppDataGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
