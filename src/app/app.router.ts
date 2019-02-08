import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { RecordResolver } from './shared/services/record.resolver';

const appRoutes: Routes = [
  {
    path: ':type/:rec_id',
    component: EditorComponent,
    resolve: { editorData: RecordResolver },
  },
  {
    path: ':type',
    component: EditorComponent,
    resolve: { editorData: RecordResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRouter {}
