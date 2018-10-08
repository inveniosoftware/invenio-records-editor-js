import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonEditorModule } from 'ng2-json-editor';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  exports: [CommonModule, JsonEditorModule],
})
export class SharedModule {}
