import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZamowioneComponent } from './zamowione.component';

describe('ZamowioneComponent', () => {
  let component: ZamowioneComponent;
  let fixture: ComponentFixture<ZamowioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZamowioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZamowioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
