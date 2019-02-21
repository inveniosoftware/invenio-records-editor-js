import { JsonEditorConfig } from 'ng2-json-editor';

export interface InvenioRecordConfig {
  apiUrl: string;
  schema: string;
}

export interface InvenioConfig {
  editorConfig: JsonEditorConfig;
  recordConfig: InvenioRecordConfig;
}
