import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-paginator',
  imports: [RouterLink],
  templateUrl: './paginator.html'
})
export class PaginatorComponent {

  @Input() url: string = '';
  @Input() paginator: any = {};
}
