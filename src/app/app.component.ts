import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of }         from 'rxjs/observable/of';

import { ToDoAppService } from './toDoApp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ToDo-App';
  data = {};
  searchBoxVal: string;

  constructor(  
    private toDoAppService: ToDoAppService
  ) {}

  clear(): void {
  this.data = {}
  this.addData = {}
 }

 getToDoList(): void {
    console.log("inside getToDoList")
    this.data = {};
    this.toDoAppService.getAllToDoList().subscribe(data => this.data = data);
 }

 addToDoItem(toDoList: string):void {
   console.log("inside addToDo")
   this.toDoAppService.addToDoItem(toDoList).subscribe(data => this.addData = data);
   this.sleepFor(2000);
   this.getToDoList();
   this.searchBoxVal = "";
 }

 sleepFor( sleepDuration : int ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}

 updateToDoItem(updateId : string , subject : string):void {
   console.log("update to do list, value of id to update is:"+updateId);
   this.toDoAppService.updateToDoItem(updateId,subject).subscribe(data => this.addData = data);
   this.sleepFor(2000);
   this.getToDoList();
 }

 
reOpenToDoItem(updateId : string , subject : string):void {
   console.log("reopen to do list, value of id to update is:"+updateId);
   this.toDoAppService.reOpenToDoItem(updateId,subject).subscribe(data => this.addData = data);
   this.sleepFor(2000);
   this.getToDoList();
 }

 
deleteToDoItem(updateId : string , subject : string):void {
   console.log("reopen to do list, value of id to delete is:"+updateId);
   this.toDoAppService.deleteToDoItem(updateId,subject).subscribe(data => this.addData = data);
   this.sleepFor(2000);
   this.getToDoList();
 }
 
  ngOnInit(): void {
    this.getToDoList();
  }


}
