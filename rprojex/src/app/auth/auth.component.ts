import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./../services/auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  name;
  data = {
    name: "",
    designation: "",
    bod: "",
    password: "",
  };
  err;
  constructor(private route: Router, public auth: AuthService) {
    if (this.auth.checkToken()) this.route.navigateByUrl("home");
  }

  ngOnInit(): void {}

  login() {
    this.auth.login(this.name).subscribe((data) => {
      if (data.length > 0) {
        localStorage.setItem("token", JSON.stringify(data));
        this.auth.authenticationState.next(true);
      } else {
        this.err = "User not Present";
      }
    });
  }

  reigister() {
    if (
      !this.data.name ||
      !this.data.password ||
      !this.data.designation ||
      !this.data.bod
    ) {
      alert("all fields are neccessary");
      return;
    }
    this.auth.register(this.data).subscribe((d) => {
      alert("Regsiter Succesfull !");
      this.data = {
        name: "",
        designation: "",
        bod: "",
        password: "",
      };
    });
  }
}
