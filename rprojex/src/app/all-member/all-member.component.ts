import { Component, OnInit } from "@angular/core";
import { BtnComponent } from "../renderer/btn/btn.component";
import { ProjectService } from "../services/project.service";

@Component({
  selector: "app-all-member",
  templateUrl: "./all-member.component.html",
  styleUrls: ["./all-member.component.scss"],
})
export class AllMemberComponent implements OnInit {
  frameworkComponents: any;
  rowDataClicked1;

  columnDefs = [
    { headerName: "Id", field: "id", sortable: true, filter: true },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    {
      headerName: "Designation",
      field: "designation",
      sortable: true,
      filter: true,
    },
  ];

  rowData: any;

  constructor(private p: ProjectService) {}

  ngOnInit(): void {
    this.rowData = this.p.getAllUser();
  }
}
