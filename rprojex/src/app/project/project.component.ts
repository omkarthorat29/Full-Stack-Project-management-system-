import { Component, OnInit } from "@angular/core";
import { ProjectService } from "../services/project.service";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "./../services/auth.service";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit {
  project: any;
  model: NgbDateStruct;
  pid;
  id: any;
  selected = "profile";
  teamMembers: any;
  projectStatus: any;
  data = {
    name: "",
    description: "",
    cost: "",
    due_date: "",
    project_code: this.id,
    created_at: new Date().toDateString(),
    status: "pending",
  };
  t: any;
  projectStatus1: any;
  memberT: any;
  constructor(
    private p: ProjectService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.loadProfile();
    //  this.getPendingTask();
  }

  loadProfile() {
    this.p.getProjectProfile(this.id).subscribe((data) => {
      this.project = data;
      this.loadTeamProfile(data.team_code);
    });
  }

  update(id, type) {
    console.log(type);
    this.p.updateProject(id, { status: type }).subscribe((data) => {
      this.ngOnInit();
    });
  }

  loadTeamProfile(id) {
    this.p.getProjectTeam(id).subscribe((data) => {
      this.teamMembers = data;
    });
  }

  select(type) {
    type == "ptask" ? this.getPendingTask() : this.getCompletedTask();
    this.selected = type;
  }

  addTask() {
    this.data.project_code = this.id;
    this.data.due_date =
      this.model.day + "/" + this.model.month + "/" + this.model.year;
    this.p.addTask(this.data).subscribe((res) => {
      this.data = {
        name: "",
        description: "",
        cost: "",
        due_date: "",
        project_code: this.id,
        created_at: new Date().toDateString(),
        status: "pending",
      };
      this.model = null;
      this.ngOnInit();
    });
  }

  getPendingTask() {
    let parts;
    this.p.getTask(this.id, "pending").subscribe((data) => {
      this.projectStatus = data;
      console.log("data task", data);
      this.projectStatus.forEach((element) => {
        parts = element.due_date.split("/");
        element.due_date = new Date(parts[2] + "-" + parts[1] + "-" + parts[0]);
      });

      this.projectStatus.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return b.due_date - a.due_date;
      });

      this.getMemberTask(this.teamMembers[0].team_code);
    });
  }
  getMemberTask(id) {
    this.p.getMemberTask(id).subscribe((data) => {
      console.log("team", data);
      this.memberT = data;

      this.projectStatus.forEach((element) => {
        for (let index = 0; index < this.memberT.length; index++) {
          const m = this.memberT[index];
          if (m.task_code == element.id) {
            element.user = m;
          }
        }
      });
    });
  }

  getCompletedTask() {
    this.p.getTask(this.id, "completed").subscribe((data) => {
      this.projectStatus1 = data;
    });
  }

  updateTask(status, tid) {
    this.p.updateTask(status, tid).subscribe((d) => {
      console.log(d);
      this.getCompletedTask();
      this.getPendingTask();
    });
  }

  addMemberTask(id) {
    console.log({
      team_code: this.teamMembers[0].team_code,
      project_code: this.id,
      task_code: id,
      u_id: this.pid,
    });
    this.p
      .addProjectTeamMember(this.teamMembers[0].team_code, this.id, this.pid)
      .subscribe((data) => {
        this.p
          .addMemberTask({
            team_code: this.teamMembers[0].team_code,
            project_code: this.id,
            task_code: id,
            u_id: this.pid,
          })
          .subscribe((data) => {
            console.log(data);
            this.getPendingTask();
            this.off();
          });
      });
  }

  on(a) {
    this.t = a;
    document.getElementById("overlay").style.display = "block";
  }

  off() {
    document.getElementById("overlay").style.display = "none";
  }
}
