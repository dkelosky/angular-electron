import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-indeterminate-loading',
  templateUrl: './indeterminate-loading.component.html',
  styleUrls: ['./indeterminate-loading.component.scss']
})
export class IndeterminateLoadingComponent implements OnInit {

  @Input() error: string;
  constructor() { }

  ngOnInit() {
  }

}
