import { JsonEditorConfig } from 'ng2-json-editor';

export interface InvenioRecordConfig {
  apiUrl: string;
  schema: string;
}

// NOTE: Maybe should be renamed to ILS config since its specific
export interface InvenioConfig {
  editor_config: JsonEditorConfig;
  record_config: InvenioRecordConfig;
}
