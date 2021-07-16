import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserMediaDevice } from '../models/user-media-device';

@Component({
  selector: 'app-media-device',
  templateUrl: './media-device.component.html',
  styleUrls: ['./media-device.component.scss']
})
export class MediaDeviceComponent implements OnInit {

  @Input() device: UserMediaDevice;
  @Output() onSelected: EventEmitter<UserMediaDevice> = new EventEmitter<UserMediaDevice>();

  constructor() { }

  ngOnInit(): void {
  }

  selected() {
    this.onSelected.emit(this.device);
  }

}
