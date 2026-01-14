import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsAdd } from './records-add';

describe('RecordsAdd', () => {
  let component: RecordsAdd;
  let fixture: ComponentFixture<RecordsAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordsAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordsAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
