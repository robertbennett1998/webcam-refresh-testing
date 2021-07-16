import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MediaDeviceComponent } from './media-device/media-device.component';
import { DestroyDemoComponent } from './destroy-demo/destroy-demo.component';
import { MicVisualiserComponent } from './mic-visualiser/mic-visualiser.component';
import { VideoTestComponent } from './video-test/video-test.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    MediaDeviceComponent,
    DestroyDemoComponent,
    MicVisualiserComponent,
    VideoTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
