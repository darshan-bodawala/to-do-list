import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { Task } from '../model/task.model';

@Injectable()
export class TaskService {

  BASE_URL: string;

  constructor(private http: Http) {
    this.BASE_URL = AppConfig.BASE_URL;
  }

  getAllData(): Observable<Task[]> {
    return this.http.get(this.BASE_URL + "/posts").pipe(map(response => response.json()));
  }

}
