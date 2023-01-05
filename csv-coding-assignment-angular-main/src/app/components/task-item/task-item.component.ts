import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { BackendService, Task, User } from "src/app/backend.service";

@Component({
  selector: "app-task-item",
  templateUrl: "./task-item.component.html",
  styleUrls: ["./task-item.component.css"],
})
export class TaskItemComponent implements OnInit {
  constructor(private backend: BackendService) {}

  @Input()
  task: Task;

  name: String;

  /**
   * Returns item indicator class
   * @returns class string
   */
  getIndicator() {
    //Set indicator style based on task status or assignee status
    if (this.task.completed) {
      return "completed";
    }

    //Completed task takes priority over unassigned tasks
    if (this.task.assigneeId === null) {
      return "not-assigned";
    }

    return "normal";
  }

  ngOnInit(): void {
    if (this.task.assigneeId !== null) {
      this.retrieveUser();
    }
  }

  /**
   * Retrieve a user based on provided assigneeId
   */
  retrieveUser() {
    this.backend.user(this.task.assigneeId).subscribe((user) => {
      this.name = user.name;
    });
  }

  retrieveStatus() {
    return this.task.completed ? "COMPLETED" : "IN PROGRESS";
  }
}
