import { User } from './user.model';

export enum MessageTypes{
    Text = 1,
    Image
}

export class Message {
    
    user: User;
    text: string;
    type: MessageTypes

    constructor(user: User, text: string, type: MessageTypes) {
        this.user = user;
        this.text = text;
        this.type = type;
    }
}
  