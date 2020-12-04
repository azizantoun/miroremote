import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
declare var SockJS;
declare var Stomp;

import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private code;
  private stompClient;
  constructor(
    
  ) {}

 
    connectToSocket(code) {
    // //If connected,return
    this.code=code;
    let _this=this;
    console.log("Connecting to socket");
    var socket = new SockJS('https://tf.testmiro.com/snowflakes');
    console.log('socket--->', socket);
   this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, function (frame) {
        console.log("connected");
        _this.stompClient.subscribe(`/topic/${code}/extension`, function (greeting) {
                console.log(greeting);
        });
    });
}

  sendSocketMessage(message){
    this.stompClient.send(`/topic/${this.code}/extension`, {}, message);
  }


}
