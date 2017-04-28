import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  columns: any[] = [
    { displayName: 'ID', variable: '_id', filter: '_id' },
    { displayName: 'Name', variable: 'name', filter: 'name' },
    { displayName: 'Username', variable: 'username', filter: 'username' },
    { displayName: 'Email', variable: 'email', filter: 'email' }
  ];
  sort: any = {
    column: 'name',
    descending: false
  };
  users: any[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  changeSorting(columnName) {
    var sort = this.sort;
    if (sort.column == columnName) {
      sort.descending = !sort.descending;
    } else {
      sort.column = columnName;
      sort.descending = false;
    }
  }

  selectedClass(columnName) {
    return columnName == this.sort.column ? 'sort-' + this.sort.descending : false;
  }

  convertSorting() {
    return this.sort.descending ? '-' + this.sort.column : this.sort.column;
  }
}
