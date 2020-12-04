import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { interval } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { SocketService } from '../../../core/socket/socket.service';


export interface TimeSpan {
  hours: string;
  minutes: string;
  seconds: string;
}
export interface Entry {
  created: Date;
  id: string;
}

@Component({
  selector: 'anms-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PresentComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  gif;
  quote;
  activeSlide=1;
  presentationmode=false;
  gif_1 = require('../../../../assets/00.gif').default;
  gif_2 = require('../../../../assets/01.gif').default;
  gif_3 = require('../../../../assets/02.gif').default;
  gif_4 = require('../../../../assets/03.gif').default;
  quote1="As we look ahead into the next century, leaders will be those who empower others.";
  quote2="You can speak well if your tongue can deliver the message of your heart.” -John Ford";
  quote3="Be sincere, be brief, be seated.” -Franklin D. Roosevelt";
  quote4="If you're presenting yourself with confidence, you can pull off pretty much anything.";




  arrow_black=require('../../../../assets/arrow_black.png').default;
  arrow_white=require('../../../../assets/arrow_white.png').default;
  entries: Entry[] = [];
  newId: string;

  constructor(private changeDetector: ChangeDetectorRef,private socketService: SocketService) {

  }

  ngOnInit() {
    const val = Math.floor(Math.random() * 4) + 1 ;
    if(val===1){
      this.gif=this.gif_1;
      this.quote=this.quote1;
    }else if(val===2){
      this.gif=this.gif_2;
      this.quote=this.quote2;
    }else if(val===3){
      this.gif=this.gif_3;
      this.quote=this.quote3;
    }
    else{
      this.gif=this.gif_4;
      this.quote=this.quote4;
  }
  this.newId = 'first';

 }

  ngAfterViewInit() {
    }



    present(){  
      this.presentationmode=true;
      this.socketService.sendSocketMessage(JSON.stringify({'command': 'present'}));
      // this.socketService.sendSocketMessage(JSON.stringify({'command': 'getnotes'}));

      this.entries = [{ id: '', created: new Date(new Date().getTime()) }];
      interval(1000).subscribe(() => {
        if (!this.changeDetector['destroyed']) {
          this.changeDetector.detectChanges();
        }
      });
  
      this.changeDetector.detectChanges();
    }

    getElapsedTime(entry: Entry): TimeSpan {        
      let totalSeconds = Math.floor((new Date().getTime() - entry.created.getTime()) / 1000);
    
      let hours = 0;
      let minutes = 0;
      let seconds = 0;
    
      if (totalSeconds >= 3600) {
        hours = Math.floor(totalSeconds / 3600);      
        totalSeconds -= 3600 * hours;      
      }
    
      if (totalSeconds >= 60) {
        minutes = Math.floor(totalSeconds / 60);
        totalSeconds -= 60 * minutes;
      }
    
      seconds = totalSeconds;
    
      return {
        hours: ('0' + hours).slice(-2),
        minutes: ('0' + minutes).slice(-2),
        seconds: ('0' + seconds).slice(-2)
      };
    }

    next(){
      this.socketService.sendSocketMessage(JSON.stringify({'command': 'next'}));
      this.activeSlide++;
    }

    prev(){
      this.socketService.sendSocketMessage(JSON.stringify({'command': 'previous'}));
      if(this.activeSlide!==1){
        this.activeSlide--;
      }
    }

}
