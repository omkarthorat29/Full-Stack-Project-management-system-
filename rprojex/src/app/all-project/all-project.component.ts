import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../services/project.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-all-project",
  templateUrl: "./all-project.component.html",
  styleUrls: ["./all-project.component.scss"],
})
export class AllProjectComponent implements OnInit {
  pending: any;
  complete: any;

  constructor(private p: ProjectService, private route: Router) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.p.getProject("pending").subscribe((data) => {
      console.log(data);
      this.pending = data;
    });
    this.p.getProject("completed").subscribe((data) => {
      console.log(data);
      this.complete = data;
    });
  }

  goToProject(id) {
    this.route.navigateByUrl("project/" + id);
  }
}
