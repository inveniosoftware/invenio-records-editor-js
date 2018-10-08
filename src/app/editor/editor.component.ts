import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/zip';

import { RecordService } from '../shared/services/record.service';
import { JsonEditorConfig } from 'ng2-json-editor';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-editor',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'editor.component.html',
  providers: []
})
export class EditorComponent implements OnInit {
  record: object;
  schema: object;
  readonly config: JsonEditorConfig = environment.editorConfig;

  constructor(
    private route: ActivatedRoute,
    public recordService: RecordService
  ) {}

  /**
   * Removes properties whose name starts with underscore. Usually these
   * are auto generated and we don't want to edit them. They might also
   * NOT be explicitly defined in the schema.
   * @param editorData The record and the schema
   */
  fixSchema(editorData: any): void {
    const { record, schema } = editorData;

    delete record.internal_categories;
    delete schema.properties.internal_categories;

    Object.keys(record).forEach((key: string) => {
      if (key.startsWith('_cds')) {
        delete record[key].extracted_metadata;
        delete schema.properties[key].properties.extracted_metadata;
      }

      if (key.startsWith('_') && !key.startsWith('_cds')) {
        delete record[key];
        delete schema.properties[key];
      }
    });
    this.record = record;
    this.schema = schema;
  }

  saveRecord(event) {
    this.recordService.save(this.record);
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (!this.route.snapshot.queryParams.hasOwnProperty('url')) {
        // Using the mock data
        this.record = data.editorData.record;
        this.schema = data.editorData.schema;
        // this.patches = data.editorData.patches;
        // this.problemMap = data.editorData.problemMap;
      } else {
        this.fixSchema(data.editorData);
      }
    });
  }
}
