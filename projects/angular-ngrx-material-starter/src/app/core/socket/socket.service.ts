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
  constructor(
    
  ) {}

 
    connectToSocket(code) {
    // //If connected,return
    console.log("Connecting to socket");
    var socket = new SockJS('http://194.37.81.135:8080/snowflakes');
    console.log('socket--->', socket);
   const  stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log("connected");
        stompClient.subscribe(`/topic/${code}/mobile`, function (greeting) {
                console.log(greeting);
        });
    });

}
}
