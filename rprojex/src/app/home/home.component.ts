import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./../services/auth.service";
import { AgGridAngular } from "ag-grid-angular";
import { BtnComponent } from "../renderer/btn/btn.component";
import { ProjectService } from "./../services/project.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  p_id;

  project: boolean;
  team: boolean;
  projectList: any;
  data;
  projectTeam: any;
  allTeams: any;
  tm = {
    name: "",
    team_leader_id: this.auth.id,
  };
  pr = {
    name: "",
    description: "",
    team_code: "",
    project_leader_id: this.auth.id,
    status: "pending",
  };
  teamData: any;
  constructor(
    public route: Router,
    public auth: AuthService,
    private p: ProjectService
  ) {
    //this.route.navigateByUrl("all-project");
    //  this.goToProject(1);
  }

  ngOnInit(): void {
    this.getPendingProjects();
    this.getAllTeams();
  }

  newProject() {
    if (
      !this.pr.name ||
      !this.pr.description ||
      !this.pr.status ||
      !this.pr.team_code
    ) {
      alert("Fill All Fields");
      return;
    }

    this.p.getProjectTeam(this.pr.team_code).subscribe((data) => {
      let d = data;
      console.log(d);
      if (d.length == 0) {
        alert("you are Not Member Of The team.........");
      }
      let count = 0;
      for (let index = 0; index < d.length; index++) {
        const da = d[index];
        if (da.u_id == this.auth.id) {
          count++;
        }
      }

      if (count != 0) {
        this.p.createProject(this.pr).subscribe((data) => {
          this.addProjectTeamMember(this.pr.team_code, data.insertId);
          this.off();
          this.ngOnInit();
          this.pr = {
            name: "",
            description: "",
            team_code: "",
            project_leader_id: this.auth.id,
            status: "pending",
          };
        });
      } else {
        alert("You Are Not A Team Member");
        this.off();
      }
    });
  }

  addProjectTeamMember(tid, pid) {
    this.p.addProjectTeamMember(tid, pid, this.auth.id).subscribe(() => {});
  }

  goToProject(id) {
    this.route.navigateByUrl("project/" + id);
  }

  getPendingProjects() {
    this.p.getProject("pending").subscribe((data) => {
      this.projectList = data;
    });
  }

  getProjectTeam(id) {
    this.p.getProjectTeam(id).subscribe((data) => {
      this.projectTeam = data;
    });
  }

  selectData(data) {
    this.getProjectTeam(data.team_code);
    this.p_id = data.p_id;
    this.data = data;
  }

  getAllTeams() {
    this.p.getAllTeams().subscribe((data) => {
      this.allTeams = data;
      data.forEach((element) => {
        this.p
          .getProjectTeam(element.team_code)
          .toPromise()
          .then((d) => {
            element.user = d;
          });
      });
    });
  }

  goToTeam(data) {
    this.route.navigateByUrl("team/" + data.team_code);
  }

  on(type) {
    if (type == "project") {
      this.project = true;
    }
    if (type == "team") {
      this.team = true;
    }
    document.getElementById("overlay").style.display = "block";
  }

  off() {
    this.project = this.team = false;
    document.getElementById("overlay").style.display = "none";
  }

  Colors: Array<any> = [
    "#4ACF4A",
    "#0b9660",
    "#FF0000",
    "#000",
    "#ffff44",
    "#ffd11a",
    "#fb9667",
    "#ffff44",
    "#0b9660",
    "#FF0000",
    "#000",
    "#ffff44",
    "#ffd11a",
    "#fb9667",
    "#ffff44",
    "#0b9660",
    "#FF0000",
    "#000",
    "#ffff44",
    "#ffd11a",
    "#fb9667",
    "#ffff44",
    "#0b9660",
    "#FF0000",
    "#000",
    "#ffff44",
    "#ffd11a",
    "#fb9667",
  ];

  getColors(index) {
    let num = this.getnumber(index);
    return this.Colors[num];
  }

  getnumber(data) {
    let i = data;
    if (i > this.Colors.length - 1) {
      i = i - this.Colors.length;
      if (i < this.Colors.length) {
        return i;
      } else {
        this.getnumber(i);
      }
    } else {
      return i;
    }
  }

  createTeam() {
    if (!this.tm.name) {
      alert("Fill Name Fields");
      return;
    }

    this.p.createTeam(this.tm).subscribe((data) => {
      this.off();
      this.getAllTeams();
      this.tm = {
        name: "",
        team_leader_id: this.auth.id,
      };
      this.addTeamMember({
        team_code: data.insertId,
        u_id: this.auth.id,
      });
    });
  }

  addTeamMember(data) {
    this.p.addTeamMember(data).subscribe((data) => {
      this.getAllTeams();
    });
  }
}
