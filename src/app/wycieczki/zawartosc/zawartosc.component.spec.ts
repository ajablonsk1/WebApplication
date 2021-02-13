import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZawartoscComponent } from './zawartosc.component';

describe('ZawartoscComponent', () => {
  let component: ZawartoscComponent;
  let fixture: ComponentFixture<ZawartoscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZawartoscComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZawartoscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
