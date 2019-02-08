import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRouter } from './app.router';
import { EditorModule } from './editor/editor.module';
import { SharedModule } from './shared';
import { SHARED_SERVICES } from './shared/services';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule,
    AppRouter,
    SharedModule,
    EditorModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-center' }),
  ],
  providers: SHARED_SERVICES,
  bootstrap: [AppComponent],
})
export class AppModule {}
