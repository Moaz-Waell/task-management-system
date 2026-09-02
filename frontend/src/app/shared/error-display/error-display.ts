import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-display',
  standalone: false,
  templateUrl: './error-display.html',
  styleUrl: './error-display.css',
})
export class ErrorDisplay {

  @Input() message: string = '';

  @Input() show: boolean = false;

}
