import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { JsonEditorConfig } from 'ng2-json-editor';
import 'rxjs/add/observable/zip';
import { environment } from '../../environments/environment';
import { InvenioConfigService } from '../shared/services/invenio-config/invenio-config.service';
import { RecordService } from '../shared/services/record.service';

@Component({
  selector: 'app-editor',
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'editor.component.html',
  providers: [],
})
export class EditorComponent implements OnInit {
  record: object;
  schema: object;
  config: JsonEditorConfig = environment.editorConfig;

  constructor(
    private route: ActivatedRoute,
    public recordService: RecordService,
    public invenioConfigService: InvenioConfigService
  ) {
    this.config = { ...this.config, ...this.invenioConfigService.data.editor_config };
  }

  saveRecord(event) {
    this.recordService.save(this.record);
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.record = cloneDeep(data.editorData.record);
      this.schema = data.editorData.schema;
      // this.patches = data.editorData.patches;
      // this.problemMap = data.editorData.problemMap;
    });
  }
}
