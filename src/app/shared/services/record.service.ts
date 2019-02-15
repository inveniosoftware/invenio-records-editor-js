import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { isEqual } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { EditorData, InvenioRecordConfig, PatchRequest, Record } from '../interfaces/';

@Injectable()
export class RecordService {
  record: Record = {};
  config: InvenioRecordConfig;
  recordId: number;
  schema: object;
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

  getOptions(): RequestOptions {
    // TODO: Headers are ils specific load them from this.config
    let token = '';
    const auth_elem = document.getElementsByName('authorized_token')[0]
    if (auth_elem) {
      token = auth_elem['value'];
    }
    const headers = new Headers({
      Accept: 'application/vnd.ils.refs+json',
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json-patch+json',
    });
    const options: RequestOptions = new RequestOptions({ headers: headers });
    return options;
  }

  public save(new_record) {
    const body = this.createPatch(new_record);
    this.http
      .patch(`${this.config.apiUrl}${this.recordId}`, body, this.getOptions())
      .subscribe(
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

  editorData(): EditorData {
    return {
      schema: this.schema,
      record: this.record,
      problemMap: {},
      patches: [],
    };
  }

  public getRecord(
    recordId: number,
    config: InvenioRecordConfig
  ): Observable<EditorData> {
    this.config = config;
    this.recordId = recordId;

    return Observable.forkJoin([
      this.http.get(config.schema, this.getOptions()),
      this.http.get(`${config.apiUrl}${recordId}`, this.getOptions()),
    ]).map(([schema, record]) => {
      this.record = record.json().metadata;
      this.schema = schema.json();
      return this.editorData();
    });
  }

  public getNewRecord(config: InvenioRecordConfig): Observable<EditorData> {
    this.config = config;
    return this.http.get(config.schema, this.getOptions()).map(schema => {
      this.schema = schema.json();
      return this.editorData();
    });
  }

  public create(new_record) {
    return this.http
      .post(`${this.config.apiUrl}`, new_record, this.getOptions())
      .subscribe(
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
}
