import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  logInfo:Boolean=false;
  constructor() { }


  updateLogInfo(val:Boolean){
    this.logInfo=val;
  }


}
