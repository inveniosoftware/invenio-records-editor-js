import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { EditorData } from '../interfaces';

import { environment } from '../../../environments/environment';

@Injectable()
export class RecordMockService {
  constructor(private http: Http) {}

  public getMockData(): Observable<EditorData> {
    return Observable.zip(
      this.http.get(`./${environment.mockDataFolder}/record.json`),
      this.http.get(`./${environment.mockDataFolder}/schema.json`),
      this.http.get(`./${environment.mockDataFolder}/patches.json`),
      this.http.get(`./${environment.mockDataFolder}/problem-map.json`),
      (recordRes, schemaRes, patchesRes, problemMapRes) => {
        return {
          record: recordRes.json(),
          schema: schemaRes.json(),
          patches: patchesRes.json(),
          problemMap: problemMapRes.json(),
        };
      }
    );
  }
}
