import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from './models/local-storage';
import { RefreshDetailsModel } from './models/refresh-details.model';
import { SessionStorage } from './models/session-storage';
import { UserMediaDevice } from './models/user-media-device';
import { UserMediaService } from './services/user-media.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'webcam-refresh-testing';

  refreshDetails : RefreshDetailsModel;
  videoDevices : UserMediaDevice[];
  audioDevices : UserMediaDevice[];
  showDestroyDetails : boolean;

  private refreshDetailsStorage : SessionStorage<RefreshDetailsModel> | LocalStorage<RefreshDetailsModel>;
  private refreshDetailsStorageKey: string = 'refresh-details';

  constructor(private userMediaService: UserMediaService) {
  }

  ngOnInit(): void {
    this.showDestroyDetails = false;
    this.refreshDetailsStorage = new LocalStorage<RefreshDetailsModel>(this.refreshDetailsStorageKey)

    this.refreshDetails = this.refreshDetailsStorage.get() ?? new RefreshDetailsModel();

    this.refreshDetails.initCount = this.refreshDetails.initCount ?? 0;
    this.refreshDetails.destroyCount = this.refreshDetails.destroyCount ?? 0;

    this.refreshDetails.initCount++;
    this.refreshDetailsStorage.set(this.refreshDetails)
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.refreshDetails.destroyCount++;
    this.refreshDetailsStorage.set(this.refreshDetails);
  }

  onToggleDestroyDetailsButtonClick() {
    this.showDestroyDetails = !this.showDestroyDetails;
  }
}
