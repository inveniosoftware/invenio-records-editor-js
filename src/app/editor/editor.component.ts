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
  providers: [],
})
export class EditorComponent implements OnInit {
  record: object;
  schema: object;
  readonly config: JsonEditorConfig = environment.editorConfig;

  constructor(private route: ActivatedRoute, public recordService: RecordService) {}

  saveRecord(event) {
    this.recordService.save(this.record);
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.record = data.editorData.record;
      this.schema = data.editorData.schema;
      // this.patches = data.editorData.patches;
      // this.problemMap = data.editorData.problemMap;
    });
  }
}
