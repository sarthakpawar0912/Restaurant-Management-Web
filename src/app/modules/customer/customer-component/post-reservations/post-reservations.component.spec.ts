import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReservationsComponent } from './post-reservations.component';

describe('PostReservationsComponent', () => {
  let component: PostReservationsComponent;
  let fixture: ComponentFixture<PostReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostReservationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
