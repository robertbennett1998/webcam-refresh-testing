import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalStorage } from '../models/local-storage';
import { RefreshDetailsModel } from '../models/refresh-details.model';
import { SessionStorage } from '../models/session-storage';

@Component({
  selector: 'app-destroy-demo',
  templateUrl: './destroy-demo.component.html',
  styleUrls: ['./destroy-demo.component.scss']
})
export class DestroyDemoComponent implements OnInit, OnDestroy {

  refreshDetails : RefreshDetailsModel;
  private refreshDetailsStorage : SessionStorage<RefreshDetailsModel> | LocalStorage<RefreshDetailsModel>;
  private refreshDetailsStorageKey: string = 'refresh-details-destroy-component';

  constructor() { }

  ngOnInit(): void {
    this.refreshDetailsStorage = new LocalStorage<RefreshDetailsModel>(this.refreshDetailsStorageKey)

    this.refreshDetails = this.refreshDetailsStorage.get() ?? new RefreshDetailsModel();

    this.refreshDetails.initCount = this.refreshDetails.initCount ?? 0;
    this.refreshDetails.destroyCount = this.refreshDetails.destroyCount ?? 0;

    this.refreshDetails.initCount++;
    this.refreshDetailsStorage.set(this.refreshDetails)
  }

  ngOnDestroy(): void {
    this.refreshDetails.destroyCount++;
    this.refreshDetailsStorage.set(this.refreshDetails);
  }

}
