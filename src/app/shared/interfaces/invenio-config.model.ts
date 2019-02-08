import { JsonEditorConfig } from 'ng2-json-editor';

export interface InvenioRecordConfig {
  apiUrl: string;
  schema: string;
}

// NOTE: Maybe should be renamed to ILS config since its specific
export interface InvenioConfig {
  editorConfig: JsonEditorConfig;
  recordConfig: InvenioRecordConfig;
}
