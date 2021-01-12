import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  sendInfoMessage(message: any) {
    console.log("Info message: " + JSON.stringify(message));
  }

  constructor() { }
  sendError(error:any){
    console.log(error);
    
  }
}
