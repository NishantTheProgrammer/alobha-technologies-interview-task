import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService, User } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  users: User[] = [];

  
  sortingBy: 'name' | 'email' | 'phone_number' = 'name';
  isAscending: boolean = true;

  filterForm: FormGroup;
  
  constructor(private userService: UserService, private fb: FormBuilder) {

    this.filterForm = this.fb.group({
      name: "",
      email: "",
      phone_number: ""
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.get().subscribe(users => {
      this.users = users;
    }, err => {
      alert("Could not load users please check apiBaseURL in user service");
    });
  }

  sort(by: 'name' | 'email' | 'phone_number') {
    if(by == this.sortingBy) {
      this.isAscending = !this.isAscending;
    } else {
      this.sortingBy = by;
    }
    this.users.sort((a, b) => {
      return a[by] > b[by] && this.isAscending ? 1 : -1
    });
  }

  get filterdUsers() {
    return this.users.filter(user => {
      return (this.filterForm.value.name == '' || +user.name.toLocaleLowerCase().includes(this.filterForm.value.name.toLocaleLowerCase())) &&
        (this.filterForm.value.phone_number == '' || +user.phone_number.toLocaleLowerCase().includes(this.filterForm.value.phone_number.toLocaleLowerCase())) &&
        (this.filterForm.value.email == '' || +user.name.toLocaleLowerCase().includes(this.filterForm.value.email.toLocaleLowerCase()))
    });
  }
}
