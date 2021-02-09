import { Component, OnInit } from '@angular/core';
import { DBService } from './db.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(public DBService: DBService) { }

  ngOnInit(): void {
  }

}
