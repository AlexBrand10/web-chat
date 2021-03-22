import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {io} from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:3000';
const inputTag = document.getElementById('message-list') as HTMLInputElement;
@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
  socket: any;
  message: string= "";
  @ViewChild('messageList', { static: true })
  messageList!: ElementRef;
  
  constructor() { }

  ngOnInit() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
      if (data) {
       this.messageList.nativeElement.insertAdjacentHTML('beforeend', '<li style="background: white; padding: 15px 30px; margin: 10px; border-radius: 40px;">'+ data +'</li>');
       }
     });
  }

  SendMessage() {
    this.socket.emit('message', this.message);
    this.messageList.nativeElement.insertAdjacentHTML('beforeend', '<li style="background: white; padding: 15px 30px; margin: 10px; text-align: right; border-radius: 40px;">'+ this.message +'</li>');
    this.message = '';
  }

}
