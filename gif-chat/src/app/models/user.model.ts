export class User{
    username: string;
    displayName: string;
    profilePic: string;

    constructor(username: string, displayName: string, profilePic: string){
        this.username = username;
        this.displayName = displayName;
        this.profilePic = profilePic;
    }
}