import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAgendaComponent } from './header-agenda.component';

describe('HeaderAgendaComponent', () => {
  let component: HeaderAgendaComponent;
  let fixture: ComponentFixture<HeaderAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
