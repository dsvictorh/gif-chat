export enum MessageTypes{
    Text = 1,
    Image
}

export class Message {
    
    text: string;
    type: MessageTypes

    constructor(text: string, type: MessageTypes) {
        this.text = text;
        this.type = type;
    }
}
  