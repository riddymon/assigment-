import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { BackendService, Task } from "src/app/backend.service";
import { AppState } from "src/app/store/task.reducer";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.css"],
})
export class TaskDetailComponent implements OnInit {
  @Input()
  isNewTask: boolean;

  @ViewChild("taskDetailsID") detailsID: ElementRef;
  @ViewChild("taskDetailsDescriptionInput") descriptionInput: ElementRef;
  @ViewChild("taskDetailsAssigneeInput") assigneeInput: ElementRef;
  @ViewChild("taskDetailsCompletedInput") completedInput: ElementRef;

  private state: AppState;

  completed: boolean = false;

  task: Task;

  constructor(private backend: BackendService) {}

  async ngOnInit() {
    //Flag determines if this is a new task or an existing task
    this.isNewTask = history.state.isNewTask;

    //Grab ID - we can also pass entire task but using store instead for assignment
    this.task = history.state.task;
  }

  /**
   * Return to task list screen
   */
  goBack() {
    history.back();
  }

  /**
   * Updates task with current inputs
   */
  async updateTask() {
    if (this.task.id == null) {
      //Add task if id is null
      this.addTask();
    } else {
      //Call update function from service with updated values if this is an existing task
      try {
        await this.backend
          .update(this.task.id, {
            description: this.descriptionInput.nativeElement.value,
            assigneeId: +this.assigneeInput.nativeElement.value,
            completed: this.task.completed,
          })
          .toPromise();
      } catch (error) {
        console.log(error);
      } finally {
        this.goBack();
      }
    }
  }

  /**
   * Adds new task
   */
  async addTask() {
    try {
      await this.backend
        .newTask({
          description: this.descriptionInput.nativeElement.value,
        })
        .toPromise();
    } catch (error) {
      console.log(error);
    } finally {
      this.goBack();
    }
  }

  /**
   * Handles updating the task completed flag
   * @param event Emitted event
   */
  eventCheck(event) {
    this.task.completed = event.target.checked;
  }
}
