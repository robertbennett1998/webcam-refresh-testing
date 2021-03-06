import { Injectable } from '@angular/core';
import 'webrtc-adapter';
import { CallError } from '../errors/call-error.error';
import { UserMediaDevice } from '../models/user-media-device';
import { LoggerService } from './logger.service';

@Injectable({
    providedIn: 'root'
})
export class UserMediaStreamService {
    readonly permissionConstraints = {
        audio: true,
        video: true
    };

    navigator = <any>navigator;
    private readonly loggerPrefix = '[UserMediaStreamService] -';

    private requestStream: MediaStream;

    constructor(private logger: LoggerService) {
        this.navigator.getUserMedia = this.navigator.getUserMedia || this.navigator.webkitGetUserMedia || this.navigator.msGetUserMedia;
    }

    async requestAccess(): Promise<boolean> {
        try {
            /*
            If a user grants access a stream is returned, which needs to be closed
            rather than being returned to the client.
            */
            await this.getStream();
            this.stopRequestStream();
            return true;
        } catch (exception) {
            this.logger.error(`${this.loggerPrefix} Could not get cam and mic access`, exception);
            return false;
        }
    }

    private stopRequestStream() {
        this.stopStream(this.requestStream);
    }

    private async getStream(): Promise<MediaStream | null> {
        if (this.requestStream) {
            this.stopStream(this.requestStream);
        }
        try {
            this.requestStream = await this.navigator.mediaDevices.getUserMedia(this.permissionConstraints);
            return this.requestStream;
        } catch (error) {
            this.logger.error(`${this.loggerPrefix} Could not get media stream`, error);
            this.logger.error(error.name, new CallError(error.name), null);
        }

        return null;
    }

    async getStreamForMic(device: UserMediaDevice): Promise<MediaStream | null> {
      console.log("getStreamForMic - ", device);
        try {
            if (device) {
                return await this.navigator.mediaDevices.getUserMedia({ audio: { deviceId: { exact: device.deviceId } } });
            } else {
                return this.getDefaultMicStream();
            }
        } catch (error) {
            this.logger.error(`${this.loggerPrefix} Could not get audio stream for microphone`, error);
            this.logger.error(error.name, new CallError(error.name), null);
        }

        return null;
    }

    async getStreamForCam(device: UserMediaDevice): Promise<MediaStream | null> {
      console.log("getStreamForCam - ", device);

        try {
            if (device) {
                return await this.navigator.mediaDevices.getUserMedia({ video: { deviceId: { exact: device.deviceId } } });
            } else {
                return this.getDefaultCamStream();
            }
        } catch (error) {
            this.logger.error(`${this.loggerPrefix} Could not get video stream for camera`, error);
            this.logger.error(error.name, new CallError(error.name), null);
        }

        return null;
    }

    private async getDefaultCamStream(): Promise<MediaStream> {
        return this.navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        });
    }

    private async getDefaultMicStream(): Promise<MediaStream> {
        return await this.navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
    }

    stopStream(stream: MediaStream) {
        if (!stream) {
            return;
        }

        stream.getTracks().forEach(track => {
            track.stop();
        });
    }
}
