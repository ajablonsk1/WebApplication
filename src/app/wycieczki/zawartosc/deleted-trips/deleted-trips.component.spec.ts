import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedTripsComponent } from './deleted-trips.component';

describe('DeletedTripsComponent', () => {
  let component: DeletedTripsComponent;
  let fixture: ComponentFixture<DeletedTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeletedTripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
