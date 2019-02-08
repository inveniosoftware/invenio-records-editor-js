import { Injectable } from '@angular/core';
import { InvenioConfig } from '../../interfaces';

@Injectable()
export class InvenioConfigService {
  public data: InvenioConfig;
  constructor() {
    this.init();
  }

  init() {
    const element = document.getElementById('invenio-records-editor');
    if (element) {
      this.data = JSON.parse(element.dataset.config);
    }
  }
}
