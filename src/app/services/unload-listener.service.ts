import { HostListener, Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { Observable } from "rxjs";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UnloadListenerService {
  private unloadEventSubject = new Subject<void>();
  private renderer : Renderer2;
  isDesktop :boolean;

  constructor(private deviceDetectorService : DeviceDetectorService, renderer2Factor : RendererFactory2) {
    this.renderer = renderer2Factor.createRenderer(null, null);
    this.initialise();
  }

  private initialise() {
    this.isDesktop = this.deviceDetectorService.isDesktop();
    if (this.isDesktop) {
      this.renderer.listen('window', 'beforeunload', () => this.unloadEventSubject.next());
    } else {
      this.renderer.listen('document', 'visibilityChanged', () => {
        if (this.renderer.data['visibilityState'] === 'hidden')
        {
          this.unloadEventSubject.next();
        }
      });
    }
  }

  get onShouldUnload() : Observable<void> {
    return this.unloadEventSubject.asObservable();
  }
}

