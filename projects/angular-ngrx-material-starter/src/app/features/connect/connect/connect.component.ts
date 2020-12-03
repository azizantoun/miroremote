import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Router} from '@angular/router';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import { SocketService } from '../../../core/socket/socket.service';
@Component({
  selector: 'anms-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConnectComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  public input1;
  public input2;
  public input3;
  public input4;
  public input5;
  public input6;
  @ViewChild('firstInput') firstInput: ElementRef;
  constructor(private router: Router, private socketService:SocketService) {}


  ngOnInit() {
console.log(this.firstInput);
  }


  ngAfterViewInit() {
    this.firstInput.nativeElement.focus();
    }

  keytab(e){
    e.preventDefault();
    if(e.keyCode==8 || e.keyCode==46){

      let prevControl:any = e.srcElement.previousElementSibling;

      while (true)
      {
          if (prevControl)
          {
              if (prevControl.type === e.srcElement.type)
              {
                prevControl.focus();
                prevControl.value="";
                  return;
              }
              else
              {
                prevControl = prevControl.previousElementSibling;
              }
          }
          else
          {
              return;
          }
      }
    }else{

    if (e.srcElement.maxLength === e.srcElement.value.length) {
      
      let nextControl: any = e.srcElement.nextElementSibling;
     // Searching for next similar control to set it focus
      while (true)
      {
          if (nextControl)
          {
              if (nextControl.type === e.srcElement.type)
              {
                  nextControl.focus();
                  return;
              }
              else
              {
                  nextControl = nextControl.nextElementSibling;
              }
          }
          else
          {
              return;
          }
      }
  }
    }


  }

  connect(){
    if(this.input1 && this.input2 && this.input3 && this.input4 && this.input5 && this.input6){
      const code = `${this.input1}${this.input2}${this.input3}${this.input4}${this.input5}${this.input6}`;
      this.socketService.connectToSocket(code);
    
      alert('connecting...');
      this.router.navigateByUrl('/present');
    }else{
      alert('Wooops, please enter the 6 digits');
    }
  }




}
