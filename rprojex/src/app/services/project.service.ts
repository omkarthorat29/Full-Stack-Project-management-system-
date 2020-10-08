import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  url = "http://localhost:3000/";
  constructor(private http: HttpClient, private auth: AuthService) {}

  getProject(type) {
    return this.http.get<any>(
      this.url + "projectTeamWise/" + this.auth.id + "/" + type
    );
  }

  getAllTeams() {
    return this.http.get<any>(this.url + "allTeam");
  }

  deleteTeamMember(tid, uid) {
    return this.http.delete(this.url + "deleteTeamMember/" + tid + "/" + uid);
  }

  addProjectTeamMember(tid, pid, uid) {
    return this.http.post(this.url + "projectteammember", {
      team_code: tid,
      project_code: pid,
      u_id: uid,
    });
  }

  getAllUser() {
    return this.http.get<any>(this.url + "users/");
  }

  getMemberTask(id) {
    return this.http.get<any>(this.url + "getMemberTasks/" + id);
  }

  addMemberTask(data) {
    return this.http.post(this.url + "membertask", data);
  }

  getProjectTeam(id) {
    return this.http.get<any>(this.url + "projectTeamMembers/" + id);
  }

  createProject(data) {
    return this.http.post<any>(this.url + "project", data);
  }

  createTeam(data) {
    return this.http.post<any>(this.url + "team", data);
  }

  getProjectProfile(id) {
    return this.http.get<any>(this.url + "getProjectById/" + id);
  }

  updateProject(id, data) {
    return this.http.put(this.url + "project/" + id, data);
  }

  updateTask(tid, status) {
    return this.http.put(this.url + "updateTask/" + status + "/" + tid, {});
  }

  getTask(pid, type) {
    return this.http.get<any>(this.url + "tasks/" + pid + "/" + type);
  }

  addTask(data) {
    return this.http.post(this.url + "task", data);
  }

  addTeamMember(data) {
    return this.http.post(this.url + "teammember", data);
  }

  notMember(id) {
    return this.http.get<any>(this.url + "notUsers/" + id);
  }
}
