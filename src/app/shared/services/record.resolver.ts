import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { EditorData } from '../../shared/interfaces';
import { InvenioConfigService } from './invenio-config/invenio-config.service';
import { RecordMockService } from './record.mock.service';
import { RecordService } from './record.service';


@Injectable()
export class RecordResolver implements Resolve<any> {
  constructor(
    private recordService: RecordService,
    private recordMockService: RecordMockService,
    private invenioConfigService: InvenioConfigService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EditorData> {
    if (route.params.type === 'demo') {
      return this.recordMockService.getMockData();
    }
    if ('rec_id' in route.params) {
      return this.recordService.getRecord(
        route.params.rec_id,
        this.invenioConfigService.data.recordConfig
      );
    }
    return this.recordService.getNewRecord(
      this.invenioConfigService.data.recordConfig
    );
  }
}
