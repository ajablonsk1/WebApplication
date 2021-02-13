import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZarzadzanieComponent } from './zarzadzanie.component';

describe('ZarzadzanieComponent', () => {
  let component: ZarzadzanieComponent;
  let fixture: ComponentFixture<ZarzadzanieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZarzadzanieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZarzadzanieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
