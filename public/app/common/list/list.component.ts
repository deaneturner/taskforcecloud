import { Component, ViewEncapsulation } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: '[list]',
  templateUrl: './list.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list.style.scss']
})
export class ListComponent {

  ngOnInit(): void {

  }
}
