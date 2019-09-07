import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookviewComponent } from './bookview.component';

describe('BookviewComponent', () => {
  let component: BookviewComponent;
  let fixture: ComponentFixture<BookviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
