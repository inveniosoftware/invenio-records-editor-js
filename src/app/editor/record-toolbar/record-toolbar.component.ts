import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-record-toolbar',
  templateUrl: './record-toolbar.component.html',
  styleUrls: ['./record-toolbar.component.scss'],
})
export class RecordToolbarComponent {
  @Input()
  name: string;

  @Output()
  broadcast = new EventEmitter();

  constructor() {}
}
