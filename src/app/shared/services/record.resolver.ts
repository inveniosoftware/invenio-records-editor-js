import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RecordService } from './record.service';
import { RecordMockService } from './record.mock.service';
import { EditorData } from '../../shared/interfaces/editor-data.model';

@Injectable()
export class RecordResolver implements Resolve<any> {
  constructor(
    private recordService: RecordService,
    private recordMockService: RecordMockService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<EditorData> {
    if (!route.queryParams.url) {
      return this.recordMockService.getMockData();
    }
    return this.recordService.fetchData(route.queryParams.url);
  }
}
