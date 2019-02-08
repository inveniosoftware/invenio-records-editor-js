import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { isEqual } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { EditorData, InvenioRecordConfig, PatchRequest, Record } from '../interfaces/';

@Injectable()
export class RecordService {
  record: Record;
  record_id: number;
  config: InvenioRecordConfig;
  constructor(private http: Http, private toaster: ToastrService) {}

  private createPatch(new_record): Array<PatchRequest> {
    const operations = [];
    for (const prop of Object.keys(new_record)) {
      if (!this.record.hasOwnProperty(prop)) {
        operations.push({ op: 'add', path: `/${prop}`, value: new_record[prop] });
        continue;
      }
      if (!isEqual(this.record[prop], new_record[prop])) {
        operations.push({ op: 'replace', path: `/${prop}`, value: new_record[prop] });
        continue;
      }
    }
    return operations;
  }

  public save(new_record) {
    const token = document.getElementsByName('authorized_token')[0]['value'];
    const headers = new Headers({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json-patch+json',
    });
    const options: RequestOptions = new RequestOptions({ headers: headers });
    const body = this.createPatch(new_record);
    this.http.patch(`${this.config.apiUrl}${this.record_id}`, body, options).subscribe(
      res => {
        this.record = <Record>res.json();
        this.toaster.success('Record saved successfully!');
      },
      err => {
        console.error('Error: ', err);
        this.toaster.error(err, 'Failed to save the record!');
      }
    );
  }

  public fetchData(
    record_id: number,
    config: InvenioRecordConfig
  ): Observable<EditorData> {
    this.config = config;
    this.record_id = record_id;
    const headers = new Headers({
      Accept: 'application/vnd.ils.refs+json',
    });
    const options: RequestOptions = new RequestOptions({ headers: headers });
    return Observable.forkJoin([
      this.http.get(config.schema, options),
      this.http.get(`${config.apiUrl}${record_id}`, options),
    ]).pipe(
      map(([schema, record]) => {
        this.record = record.json().metadata;
        return {
          schema: schema.json(),
          record: this.record,
          problemMap: {},
          patches: [],
        };
      })
    );
  }
}
