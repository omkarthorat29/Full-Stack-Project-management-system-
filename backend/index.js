const express = require("express");
var app = express();
const mysql = require("mysql");
const bodyparser = require("body-parser");
var cors = require("cors");

app.use(cors());
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "rprojex",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (err)
    console.log(
      "DB connection failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
  if (!err) console.log("connection successfull");
});

app.listen(3000, () =>
  console.log("Express server is runnig at port no : 3000")
);

//Insert an user
app.post("/user", (req, res) => {
  let data = req.body;
  mysqlConnection.query(
    "insert into user (name,password,designation,bod) values(?,?,?,?)",
    [data.name, data.password, data.designation, data.bod],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//get all  user
app.get("/users", (req, res) => {
  mysqlConnection.query(
    "select * from user",

    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//get all  user not in team/project
app.get("/notUsers/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * from user WHERE  id NOT IN (select u_id from teammember where team_code = ?)",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//Auth an user
app.post("/auth", (req, res) => {
  let data = req.body;
  mysqlConnection.query(
    "select * from user where password = ?",
    [data.name],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//update user
app.put("/user/:id", (req, res) => {
  let data = req.body;
  mysqlConnection.query(
    "update  user set name = ?,designation=?,bod=? WHERE  id = ?",
    [data.name, data.designation, data.bod, parseInt(req.params.id)],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//create team
app.post("/team", (req, res) => {
  let data = req.body;
  mysqlConnection.query(
    "insert into team (name,team_leader_id) values(?,?)",
    [data.name, data.team_leader_id],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//Add team member
app.post("/teammember", (req, res) => {
  let data = req.body;
  mysqlConnection.query(
    "insert into teammember (team_code,u_id) values(?,?)",
    [data.team_code, data.u_id],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//Delete team member
app.delete("/deleteTeamMember/:tid/:uid", (req, res) => {
  let data = req.body;
  mysqlConnection.query(
    "delete from teammember where team_code = ? and u_id = ?;",
    [req.params.tid, req.params.uid],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//Add Project
app.post("/project", (req, res) => {
  let data = req.body;

  mysqlConnection.query(
    "insert into project (`name`,`description`,`project_leader_id`,`team_code`,`status`) values(?,?,?,?,?)",
    [
      data.name,
      data.description,
      data.project_leader_id,
      data.team_code,
      data.status,
    ],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//get  project

app.get("/getProject/:id", (req, res) => {
  let data = req.body;

  mysqlConnection.query(
    "select * from project where id = ?;",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//get all project

app.get("/project/:status", (req, res) => {
  let data = req.body;

  mysqlConnection.query(
    "select * from project where status = ?;",
    [req.params.status],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//get all project team wise

app.get("/projectTeamWise/:id/:status", (req, res) => {
  mysqlConnection.query(
    "select project.name,project.id as p_id,project.description,project.project_leader_id,project.status,project.team_code,user.id as u_id,user.name as uname,user.designation from project inner join user on user.id = project.project_leader_id where project.status = ?;",
    [req.params.status],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//get all  team

app.get("/allTeam", (req, res) => {
  mysqlConnection.query(
    "select team.name as teamname,team.id as team_code,user.name as leadby from team inner join user on user.id = team.team_leader_id;",

    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//get all project team members or count of team by team_Code

app.get("/projectTeamMembers/:id/", (req, res) => {
  mysqlConnection.query(
    "select user.id as u_id,user.name,user.designation,team.team_leader_id as team_leader_id, teammember.team_code,team.name as team_name  from team inner join teammember on teammember.team_code = team.id inner join user on user.id = teammember.u_id  where team_code = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//update Project
app.put("/project/:id", (req, res) => {
  let data = req.body;

  mysqlConnection.query(
    "update project set `status` = ? where id= ?",
    [data.status, req.params.id],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//create Project Team Member
app.post("/projectteammember", (req, res) => {
  let data = req.body;

  mysqlConnection.query(
    "insert into projectteammember (team_code,project_code,u_id) values(?,?,?)",
    [data.team_code, data.project_code, data.u_id],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//create Project Task
app.post("/task", (req, res) => {
  let data = req.body;

  mysqlConnection.query(
    "insert into task (`name`,`project_code`,`description`,`cost`,`due_date`,`created_at`,`status`) values(?,?,?,?,?,?,?)",
    [
      data.name,
      data.project_code,
      data.description,
      data.cost,
      data.due_date,
      data.created_at,
      data.status,
    ],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//update Project Task
app.put("/task/:id", (req, res) => {
  let data = req.body;

  mysqlConnection.query(
    "update task set `name`=?,`project_code`=?,`description`=?,`cost`=?,`due_date`=?,`created_at`=?,`status`=? where id = ?",
    [
      data.name,
      data.project_code,
      data.description,
      data.cost,
      data.due_date,
      data.created_at,
      data.status,
      req.params.id,
    ],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//get Project
app.get("/getProjectById/:id", (req, res) => {
  mysqlConnection.query(
    "select project.status as status, user.name as leader_name,user.id as leader_id,project.id as  p_id,project.team_code,project.name as  p_name,project.description as p_discription  from user inner join project on project.project_leader_id = user.id where project.id = ?;",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.json(rows[0]);
      else res.json(err);
    }
  );
});

//get member tasks
app.get("/getMemberTasks/:id", (req, res) => {
  mysqlConnection.query(
    "select * from user inner join membertask on membertask.u_id = user.id where membertask.team_code = ?;",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//get all task Project wise
app.get("/tasks/:id/:status", (req, res) => {
  mysqlConnection.query(
    "select * from task where project_code = ? and status = ?",
    [req.params.id, req.params.status],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//get all task Project wise
app.put("/updateTask/:status/:id", (req, res) => {
  mysqlConnection.query(
    "update task set status = ? where id = ?;",
    [req.params.status, req.params.id],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});

//Assign Member to Project Task
app.post("/membertask", (req, res) => {
  let data = req.body;

  mysqlConnection.query(
    "insert into membertask (team_code,project_code,task_code,u_id) values (?,?,?,?)",
    [data.team_code, data.project_code, data.task_code, data.u_id],
    (err, rows, fields) => {
      if (!err) res.json(rows);
      else res.json(err);
    }
  );
});
