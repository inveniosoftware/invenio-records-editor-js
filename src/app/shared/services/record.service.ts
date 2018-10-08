import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RecordService {
  record_url: string;
  constructor(private http: Http, private toaster: ToastrService) {}

  /** Switching schema url to api  */
  private convertToApi(url: string): string {
    const separator = 'schemas/';
    const urlParts = url.split(separator);
    return `${urlParts[0]}api/${separator}${urlParts[1]}`;
  }

  public save(record) {
    const token = document.getElementsByName('authorized_token');
    const options = {
      headers: new Headers({
        Authorization: 'Bearer ' + token[0]['value'],
        'Content-Type': 'application/json',
      }),
    };
    this.http.put(this.record_url, record, options).subscribe(
      res => {
        console.log(res);
        this.toaster.success('Record saved successfully!');
      },
      err => {
        console.error('Error: ', err);
        this.toaster.error(err, 'Failed to save the record!');
      }
    );
  }

  public fetchData(url: string): Observable<any> {
    this.record_url = url;
    return this.http
      .get(url)
      .map((recordRes: any) => recordRes.json())
      .flatMap((record: any) => {
        return this.http
          .get(this.convertToApi(record.metadata.$schema))
          .map((schemaRes: any) => ({
            record: record.metadata,
            schema: schemaRes.json(),
            problemMap: [],
            patches: {},
          }));
      });
  }
}
