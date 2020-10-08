import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url = "http://localhost:3000/";
  auth;
  authenticationState = new BehaviorSubject(false);
  constructor(private http: HttpClient, private route: Router) {
    if (this.checkToken()) {
      this.authenticationState.next(true);
    }
  }

  login(name) {
    return this.http.post<any>(this.url + "auth", { name: name });
  }

  checkToken() {
    let user = JSON.stringify(localStorage.getItem("token"));

    if (user != "null") {
      return true;
    }
    return false;
  }

  register(data) {
    return this.http.post(this.url + "user", data);
  }

  get id() {
    return JSON.parse(localStorage.getItem("token"))[0].id;
  }

  get getUser() {
    return JSON.parse(localStorage.getItem("token"))[0];
  }

  logout() {
    localStorage.removeItem("token");
    this.authenticationState.next(false);
  }
}
