import { Component, OnInit } from '@angular/core';
import { remove } from '../../../util/storage';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    remove("token");
  }

}
