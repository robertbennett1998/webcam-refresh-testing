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
      this.userMediaService.getPreferredCamera().then(async (cameraDevice) => {
        this.selectedVideoDevice = cameraDevice;
        this.videoStream = await this.userMediaStreamService.getStreamForCam(this.selectedVideoDevice);
      });
    });

    this.userMediaService.getListOfMicrophoneDevices().then(async devices => {
      this.audioDevices = devices;
      this.userMediaService.getPreferredMicrophone().then(async (microphoneDevice) => {
        this.selectedAudioDevice = microphoneDevice;
        this.audioStream = await this.userMediaStreamService.getStreamForMic(this.selectedAudioDevice);
      });
    });
  }

  async videoDeviceSelected(device : UserMediaDevice) {
    this.selectedVideoDevice = device;
    this.userMediaService.updatePreferredCamera(this.selectedVideoDevice);
    this.videoStream = await this.userMediaStreamService.getStreamForCam(this.selectedVideoDevice);
  }

  async audioDeviceSelected(device : UserMediaDevice) {
    this.selectedAudioDevice = device;
    this.userMediaService.updatePreferredMicrophone(this.selectedAudioDevice);
    this.audioStream = await this.userMediaStreamService.getStreamForMic(this.selectedAudioDevice);
  }

}
