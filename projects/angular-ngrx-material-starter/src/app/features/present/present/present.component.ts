import { ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { interval } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';


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
  presentationmode=false;
  gif_1 = require('../../../../assets/00.gif').default;
  gif_2 = require('../../../../assets/01.gif').default;
  gif_3 = require('../../../../assets/02.gif').default;
  gif_4 = require('../../../../assets/03.gif').default;
  arrow_black=require('../../../../assets/arrow_black.png').default;
  arrow_white=require('../../../../assets/arrow_white.png').default;
  entries: Entry[] = [
    { id: '', created: new Date(new Date().getTime()) }
  ];
  newId: string;

  constructor(private changeDetector: ChangeDetectorRef) {

  }

  ngOnInit() {
    const val = Math.floor(Math.random() * 4) + 1 ;
    if(val===1){
      this.gif=this.gif_1;
    }else if(val===2){
      this.gif=this.gif_2;
    }else if(val===3){
      this.gif=this.gif_3;
    }
    else{
      this.gif=this.gif_4;
  }
  this.newId = 'first';
    
    interval(1000).subscribe(() => {
      if (!this.changeDetector['destroyed']) {
        this.changeDetector.detectChanges();
      }
    });

    this.changeDetector.detectChanges();
 }

  ngAfterViewInit() {
    }



    present(){  
      this.presentationmode=true;
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
      alert("next")
    }


    prev(){
      alert("prev")
    }


}
