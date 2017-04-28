import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  getAllUsers() {
    let headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/users', { headers: headers })
      .map(res => res.json());
  }

}
