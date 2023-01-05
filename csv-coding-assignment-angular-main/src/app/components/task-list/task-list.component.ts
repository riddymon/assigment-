import { Component, OnInit } from "@angular/core";
import { BackendService, Task } from "src/app/backend.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { SetCurrentTaskAction } from "src/app/store/task.action";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.css"],
})
export class TaskListComponent implements OnInit {
  tasks = this.retrieveTasks();

  constructor(
    private backend: BackendService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {}

  /**
   * Updates state with currently selected task
   * @param selectedTask Selected task
   */
  openTaskDetails(selectedTask: Task) {
    //Store is currently not being used in the app but is implemented to store the selected task
    this.store.dispatch(new SetCurrentTaskAction(selectedTask));

    //passing false as this is an existing task
    this.router.navigate(["details"], {
      state: { isNewTask: false, task: selectedTask },
    });
  }

  /**
   * Navigate to details screen and add a new task
   */
  addNewTask() {
    const newTask: Task = {
      id: null,
      description: "",
      assigneeId: null,
      completed: false,
    };

    this.router.navigate(["details"], {
      state: {
        isNewTask: true,
        task: newTask,
      },
    });
  }

  /**
   * Retrieves a list of tasks from backend service
   * @returns Object of type Observable<Task[]>
   */
  retrieveTasks() {
    return this.backend.tasks();
  }
}
