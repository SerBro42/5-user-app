import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html'
})
export class PaginatorComponent {

  @Input() url: string = '';
  @Input() paginator: any = {};
}
