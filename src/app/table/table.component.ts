import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users.service';

export interface USER {
  ClientName: number,
  NoOfTransaction: number,
  TotalAmount: number,
  Currency: string,
  RiskIndicator: number,
  Anamoly: string,
  Variation: number
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  users: Array<USER> = [];
  displayedColumns: string[] = ['ClientName', 'NoOfTransaction', 'TotalAmount', 'Currency', 'RiskIndicator', 'Anamoly', 'Variation'];
  constructor(
    private $http: HttpClient,
    private usersService: UsersService
  ) { };

  ngOnInit() {
    this.fetchUsers();
  };

  fetchUsers() {
    const apiUrl = 'http://localhost:3000/users';
    this.$http.get<any[]>(apiUrl).subscribe(
      (data) => {
        this.users = data;
        this.usersService.selectedUser.next(this.users[0]);
      },
      (error) => {
        console.log('Error fetching users:', error);
      })
  };

  onRowClick(user: USER) {
    this.usersService.selectedUser.next(user);
  }
}
