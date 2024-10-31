export class UserInfo {
  userId: number;
  username: string;
  userRole: string;
  userToken: string;
  userFirstName: string;
  userLastName: string;
  userPicture: string;

  constructor(
    userId: number = 0,
    username: string = '',
    userRole: string = '',
    userToken: string = '',
    userFirstName: string = '',
    userLastName: string = '',
    userPicture: string = ''
  ) {
    this.userId = userId;
    this.username = username;
    this.userRole = userRole;
    this.userToken = userToken;
    this.userFirstName = userFirstName;
    this.userLastName = userLastName;
    this.userPicture = userPicture;
  }
}
