import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RefreshDetailsModel } from './models/refresh-details.model';
import { SessionStorage } from './models/session-storage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'webcam-refresh-testing';

  refreshDetails : RefreshDetailsModel;
  private refreshDetailsSessionStorage : SessionStorage<RefreshDetailsModel>;
  private refreshDetailsSessionStorageKey: string = 'refresh-details';

  ngOnInit(): void {
    this.refreshDetailsSessionStorage = new SessionStorage<RefreshDetailsModel>(this.refreshDetailsSessionStorageKey)
    this.refreshDetails = this.refreshDetailsSessionStorage.get() ?? new RefreshDetailsModel();
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.refreshDetails.count++;
    this.refreshDetailsSessionStorage.set(this.refreshDetails);
  }
}
