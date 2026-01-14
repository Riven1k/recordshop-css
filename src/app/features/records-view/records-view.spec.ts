import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsViewComponent } from './records-view';

describe('RecordsViewComponent', () => {
  let component: RecordsViewComponent;
  let fixture: ComponentFixture<RecordsViewComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
