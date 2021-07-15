import { Component, Input, OnInit } from '@angular/core';
import { UserMediaDevice } from '../models/user-media-device';

@Component({
  selector: 'app-media-device',
  templateUrl: './media-device.component.html',
  styleUrls: ['./media-device.component.scss']
})
export class MediaDeviceComponent implements OnInit {

  @Input() device: UserMediaDevice;

  constructor() { }

  ngOnInit(): void {
  }

}
