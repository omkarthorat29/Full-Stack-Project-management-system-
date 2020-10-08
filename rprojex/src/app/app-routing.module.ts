import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthComponent } from "./auth/auth.component";
import { AllProjectComponent } from "./all-project/all-project.component";
import { AllMemberComponent } from "./all-member/all-member.component";
import { ProfileComponent } from "./profile/profile.component";
import { AllTaskComponent } from "./all-task/all-task.component";
import { TeamComponent } from "./team/team.component";
import { ProjectComponent } from "./project/project.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
  },

  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "all-member",
    component: AllMemberComponent,
  },
  {
    path: "all-project",
    component: AllProjectComponent,
  },
  {
    path: "auth",
    component: AuthComponent,
  },
  {
    path: "team/:id",
    component: TeamComponent,
  },
  {
    path: "project/:id",
    component: ProjectComponent,
  },
  {
    path: "all-task",
    component: AllTaskComponent,
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
