import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDeviceComponent } from './media-device.component';

describe('MediaDeviceComponent', () => {
  let component: MediaDeviceComponent;
  let fixture: ComponentFixture<MediaDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediaDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
