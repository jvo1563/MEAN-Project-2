import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserAuthService } from '../services/user-auth.service';
import { UserInfo } from '../models/user-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  login: {username:string, password:string} = {username:'', password:''};

  usersOauth = [
    {username: 'user1', password:'12ab3c', token:'1234'},
    {username: 'user2', password:'12ab3c', token:'4445'}
  ];

  usersDB = [
    {id: 1, username: 'user1', role:'handler'},
    {id: 2, username: 'user2', role:'admin'}
  ];

  constructor(private userAuthService: UserAuthService, private router: Router){
    
  }

  submitLogin(){//will reach out to Oauth for token(oauth service will do the work of figuring out username/password validity), 
                //then save token to service for use on other pages
    //for now just going to mock check login info and redirect if user exists, with minor info service for user cred level
    let user:UserInfo = new UserInfo(0,'','','');
    try{
      let oauth = this.mockOauth(this.login.username, this.login.password);
      user.username = oauth.username;
      user.userToken = oauth.token;
    }
    catch(err){
      console.error(err);
    }

    if(user.username){
      try{
        let db = this.mockDB(user.username);
        user.userId = db.userId;
        user.userRole = db.role;
      }
      catch(err){
        console.error(err);
      }
    }

    if(user.userId){
      this.userAuthService.updateUserInfo(user);
      this.router.navigate(['userLanding']);
    }
  }

  mockOauth(username:string, password:string){
    let match = {username: '', token: ''};
    for(let user of this.usersOauth){
      if(user.password === password && user.username === username){
        match.username = user.username;
        match.token = user.token;
      }
    }

    if(match.token !== ''){
      return match;
    }
    else{
      throw new Error('User DNE: Access Denied');
    }
  }

  mockDB(username:string){
    let match = {userId: 0, username: '', role:''};
    for(let user of this.usersDB){
      if(user.username === username){
        match.userId = user.id;
        match.role = user.role;
      }
    }

    if(match.userId !== 0){
      return match;
    }
    else{
      throw new Error('No record: 500 Error in OAuth vs DB records');
    }
  }
}
