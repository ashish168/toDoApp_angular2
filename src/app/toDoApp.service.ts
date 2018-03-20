import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};



@Injectable()
export class ToDoAppService {
      private elasticUrl = 'http://localhost:9200/todolist/_search';   
      
      constructor(
      private http: HttpClient) { } 

  getAllToDoList() {
    return this.http.get(`http://localhost:9200/todolist/_search?q=*&size=100`)
  }

  searchByStatus(status : string){
    console.log("value of status is :"+status);
    const url = `${this.elasticUrl}?q=status:${status}`;
    return this.http.get(`http://localhost:9200/todolist/_search?q=*&size=100`)
  }

  addToDoItem(subject : string){
      console.log("inside service : add to do item , value of subject is :"+subject)
      var body = { "status":"Open","subject":subject};
      return this.http.post(`http://localhost:9200/todolist/_doc`, body, httpOptions) ;
  }

  updateToDoItem(id : string , subject : string){
      console.log("inside service :updateToDoItem , value of subject is :"+subject)
      var body = { "status":"Completed","subject":subject};
      return this.http.put(`http://localhost:9200/todolist/_doc/${id}`, body, httpOptions) ;
  }

  
 reOpenToDoItem(id : string , subject : string){
      console.log("inside service :reOpenToDoItem , value of subject is :"+subject)
      var body = { "status":"Open","subject":subject};
      return this.http.put(`http://localhost:9200/todolist/_doc/${id}`, body, httpOptions) ;
  }

  deleteToDoItem(id : string , subject : string){
      console.log("inside service :deleteToDoItem , value of subject is :"+subject)
      //var body = { "status":"Open","subject":subject};
      return this.http.delete(`http://localhost:9200/todolist/_doc/${id}`) ;
  }

  searchWithJSONBody(subject : string){
    console.log("inside searchWithJSONBody");
    var body = { query: { match: { subject : "" }}};
    body.query.match.subject = subject;
    return this.http.post(`http://localhost:9200/todolist/_search`, body, httpOptions) ;
  }
}