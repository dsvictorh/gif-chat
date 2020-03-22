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
    this.user = this.globalService.currentUser;
    this.userService.getUser().subscribe((res) => {
      this.globalService.currentUser = res;
      this.user = res;
    });
  }

  
}
