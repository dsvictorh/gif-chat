import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;

  constructor(
    private userService: UserService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.globalService.currentUser = user;
      this.user = user;
    });
  }

  
}
