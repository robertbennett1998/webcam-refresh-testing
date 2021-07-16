import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocalStorage } from './models/local-storage';
import { RefreshDetailsModel } from './models/refresh-details.model';
import { SessionStorage } from './models/session-storage';
import { UnloadListenerService } from './services/unload-listener.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'webcam-refresh-testing';

  private destroyedSubject = new Subject();

  refreshDetails : RefreshDetailsModel;
  showDestroyDetails : boolean;

  private refreshDetailsStorage : SessionStorage<RefreshDetailsModel> | LocalStorage<RefreshDetailsModel>;
  private refreshDetailsStorageKey: string = 'refresh-details';

  constructor(public unloadListenerService: UnloadListenerService) {
  }

  ngOnInit(): void {
    this.unloadListenerService.onShouldUnload.pipe(takeUntil(this.destroyedSubject)).subscribe(() => this.cleanUp());

    this.showDestroyDetails = false;
    this.refreshDetailsStorage = new LocalStorage<RefreshDetailsModel>(this.refreshDetailsStorageKey)

    this.refreshDetails = this.refreshDetailsStorage.get() ?? new RefreshDetailsModel();

    this.refreshDetails.initCount = this.refreshDetails.initCount ?? 0;
    this.refreshDetails.destroyCount = this.refreshDetails.destroyCount ?? 0;

    this.refreshDetails.initCount++;
    this.refreshDetailsStorage.set(this.refreshDetails)
  }

  ngOnDestroy(): void {
    this.cleanUp();
  }

  cleanUp() {
    this.refreshDetails.destroyCount++;
    this.refreshDetailsStorage.set(this.refreshDetails);
    this.destroyedSubject.next();
    this.destroyedSubject.complete();
  }

  clearLocalStorage() {
    this.refreshDetailsStorage.clear();
    this.refreshDetails = new RefreshDetailsModel(1);
  }

  toggleDestroyDetails() {
    this.showDestroyDetails = !this.showDestroyDetails;
  }
}
