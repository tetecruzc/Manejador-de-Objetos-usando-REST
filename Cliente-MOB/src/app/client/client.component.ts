import { Component, OnInit } from '@angular/core';
import { DBService } from './db.service';
import { faSearch , faPlus, faTrashAlt, faReplyAll} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  searchIcon = faSearch;
  plusIcon = faPlus;
  trashIcon = faTrashAlt;
  replyIcon = faReplyAll;
  constructor(public DBService: DBService) { }

  ngOnInit(): void {
  }

}
