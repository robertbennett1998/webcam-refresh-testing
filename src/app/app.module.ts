import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MediaDeviceComponent } from './media-device/media-device.component';
import { DestroyDemoComponent } from './destroy-demo/destroy-demo.component';

@NgModule({
  declarations: [
    AppComponent,
    MediaDeviceComponent,
    DestroyDemoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
