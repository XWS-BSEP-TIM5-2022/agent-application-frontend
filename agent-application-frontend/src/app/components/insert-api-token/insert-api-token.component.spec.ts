import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertApiTokenComponent } from './insert-api-token.component';

describe('InsertApiTokenComponent', () => {
  let component: InsertApiTokenComponent;
  let fixture: ComponentFixture<InsertApiTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertApiTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertApiTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
