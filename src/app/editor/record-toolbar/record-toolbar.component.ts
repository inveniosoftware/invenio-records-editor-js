import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-record-toolbar',
  templateUrl: './record-toolbar.component.html',
  styleUrls: ['./record-toolbar.component.scss'],
})
export class RecordToolbarComponent {
  @Output()
  broadcast = new EventEmitter();

  constructor() {}
}
