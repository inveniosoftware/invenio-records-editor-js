// ALWAYS access config through `environment`, DO NOT import from here

import { JsonEditorConfig } from 'ng2-json-editor';

export const defaultEditorConfig: JsonEditorConfig = {
  schemaOptions: {
    properties: {
      $schema: {
        hidden: true,
      },
    },
  },
};
