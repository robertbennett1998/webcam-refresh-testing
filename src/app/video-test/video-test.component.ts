import { Component, OnInit } from '@angular/core';
import { UserMediaDevice } from '../models/user-media-device';
import { UserMediaStreamService } from '../services/user-media-stream.service';
import { UserMediaService } from '../services/user-media.service';

@Component({
  selector: 'app-video-test',
  templateUrl: './video-test.component.html',
  styleUrls: ['./video-test.component.scss']
})
export class VideoTestComponent implements OnInit {

  videoDevices : UserMediaDevice[];
  selectedVideoDevice : UserMediaDevice;
  videoStream : MediaStream;

  audioDevices : UserMediaDevice[];
  selectedAudioDevice : UserMediaDevice;
  audioStream : MediaStream;

  constructor(private userMediaService: UserMediaService, private userMediaStreamService : UserMediaStreamService) { }

  ngOnInit(): void {
    this.userMediaService.getListOfVideoDevices().then(async devices => {
      this.videoDevices = devices;
      this.selectedVideoDevice = this.videoDevices[0];
      this.videoStream = await this.userMediaStreamService.getStreamForCam(this.selectedVideoDevice);
    });

    this.userMediaService.getListOfMicrophoneDevices().then(async devices => {
      this.audioDevices = devices;
      this.selectedAudioDevice = this.audioDevices[0];
      this.audioStream = await this.userMediaStreamService.getStreamForMic(this.selectedAudioDevice);
    });
  }

  async videoDeviceSelected(device : UserMediaDevice) {
    this.selectedVideoDevice = device;
    this.videoStream = await this.userMediaStreamService.getStreamForCam(this.selectedVideoDevice);
  }

  async audioDeviceSelected(device : UserMediaDevice) {
    this.selectedAudioDevice = device;
    this.audioStream = await this.userMediaStreamService.getStreamForMic(this.selectedAudioDevice);
  }

}
