import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import { BtnComponent } from "../renderer/btn/btn.component";
import { AuthService } from "./../services/auth.service";
import { ProjectService } from "../services/project.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"],
})
export class TeamComponent implements OnInit {
  team: boolean = true;
  edit: boolean;
  add: boolean;
  model: NgbDateStruct;
  frameworkComponents: any;
  rowDataClicked1;

  columnDefs = [
    {
      headerName: "Add",
      cellRenderer: "buttonRenderer",
      cellRendererParams: {
        onClick: this.onBtnClick1.bind(this),
        label: "Add",
      },
    },

    { headerName: "Name", field: "name", sortable: true, filter: true },
    { headerName: "Role", field: "designation", sortable: true, filter: true },
  ];

  rowData: any;
  id: any;
  teamProfile: any;
  teamMembers: any;
  len: any;

  constructor(
    public auth: AuthService,
    private p: ProjectService,
    private route: ActivatedRoute
  ) {
    this.frameworkComponents = {
      buttonRenderer: BtnComponent,
    };
  }

  onBtnClick1(e) {
    this.rowDataClicked1 = e.rowData;

    if (this.teamMembers[0].team_leader_id != this.auth.id) {
      alert("You Are Not Team Leader");
      return;
    }
    this.p
      .addTeamMember({ team_code: this.id, u_id: e.rowData.id })
      .toPromise()
      .then((d) => {
        this.rowData = this.p.notMember(this.id);
        this.loadTeamProfile();
        this.lengthOfUser();
      });
  }

  deleteTeam(uid) {
    this.p.deleteTeamMember(this.id, uid).subscribe((data) => {
      this.ngOnInit();
    });
  }

  lengthOfUser() {
    this.p
      .notMember(this.id)

      .subscribe((d) => {
        this.len = d.length;
      });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.lengthOfUser();
    this.loadTeamProfile();
    this.rowData = this.p.notMember(this.id);
  }

  loadTeamProfile() {
    this.p.getProjectTeam(this.id).subscribe((data) => {
      this.teamMembers = data;
    });
  }

  select(type) {
    if (type === "team") {
      this.edit = this.add = false;
      this.team = true;
    }
    if (type === "edit") {
      this.team = this.add = false;
      this.edit = true;
    }
    if (type === "add") {
      this.team = this.edit = false;
      this.add = true;
    }
  }
}
