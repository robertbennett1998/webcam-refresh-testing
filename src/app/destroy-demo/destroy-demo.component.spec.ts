import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DestroyDemoComponent } from './destroy-demo.component';

describe('DestroyDemoComponent', () => {
  let component: DestroyDemoComponent;
  let fixture: ComponentFixture<DestroyDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DestroyDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestroyDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
