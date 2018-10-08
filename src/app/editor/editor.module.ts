import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { EditorComponent } from './editor.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RecordToolbarComponent } from './record-toolbar/record-toolbar.component';

@NgModule({
  imports: [SharedModule, TooltipModule.forRoot()],
  declarations: [EditorComponent, RecordToolbarComponent],
})
export class EditorModule {}
