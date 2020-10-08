import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from "./home/home.component";
import { AuthComponent } from "./auth/auth.component";
import { AgGridModule } from "ag-grid-angular";
import { BtnComponent } from "./renderer/btn/btn.component";
import { AllProjectComponent } from "./all-project/all-project.component";
import { AllMemberComponent } from "./all-member/all-member.component";
import { ProfileComponent } from "./profile/profile.component";
import { AllTaskComponent } from "./all-task/all-task.component";
import { FormsModule } from "@angular/forms";
import { TeamComponent } from "./team/team.component";
import { ProjectComponent } from "./project/project.component";
import { ProjectService } from "./services/project.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    BtnComponent,
    AllProjectComponent,
    AllMemberComponent,
    ProfileComponent,
    AllTaskComponent,
    TeamComponent,
    ProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    AgGridModule.withComponents([]),
  ],
  providers: [AuthService, ProjectService],
  bootstrap: [AppComponent],
})
export class AppModule {}
