import { Component, OnInit } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "./../services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profile: boolean = true;
  edit: boolean;
  model: NgbDateStruct;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {}

  select(type) {
    if (type === "view-profile") {
      this.edit = false;
      this.profile = true;
    } else {
      this.profile = false;
      this.edit = true;
    }
  }
}
