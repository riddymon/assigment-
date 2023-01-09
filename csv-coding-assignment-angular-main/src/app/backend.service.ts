import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { delay, tap } from "rxjs/operators";

/**
 * This service acts as a mock backend.
 *
 * You are free to modify it as you see.
 */

export type User = {
  id: number;
  name: string;
};

export type Task = {
  id: number;
  description: string;
  assigneeId: number;
  completed: boolean;
};

/**
 * Generates a random delay for mock api calls
 * @returns random number in milliseconds
 */
function randomDelay() {
  return Math.random() * 1000;
}

@Injectable()
export class BackendService {
  storedTasks: Task[] = [
    {
      id: 0,
      description: "Install a monitor arm",
      assigneeId: 111,
      completed: false,
    },
    {
      id: 1,
      description: "Move the desk to the new location",
      assigneeId: 111,
      completed: false,
    },
    {
      id: 2,
      description: "Install images",
      assigneeId: null,
      completed: true,
    },
    {
      id: 3,
      description: "Update antivirus definitions",
      assigneeId: null,
      completed: false,
    },
  ];

  storedUsers: User[] = [
    { id: 111, name: "Mike" },
    { id: 222, name: "James" },
    { id: 333, name: "Dennis" },
  ];

  lastId = 1;

  private findTaskById = (id) =>
    this.storedTasks.find((task) => task.id === +id);

  private findUserById = (id) =>
    this.storedUsers.find((user) => user.id === +id);

  /**
   * Retrieve all tasks
   * @returns An object of type Observable<Task[]>
   */
  tasks() {
    return of(this.storedTasks).pipe(delay(randomDelay()));
  }

  /**
   * Retrieve a task by id
   * @returns An object of type Observable<Task>
   */
  task(id: number): Observable<Task> {
    return of(this.findTaskById(id)).pipe(delay(randomDelay()));
  }

  /**
   * Retrieve all user
   * @returns An object of type Observable<User[]>
   */
  users() {
    return of(this.storedUsers).pipe(delay(randomDelay()));
  }

  /**
   * Retrieves a user
   * @param id User ID
   * @returns An object of type Observable<User>
   */
  user(id: number) {
    return of(this.findUserById(id)).pipe(delay(randomDelay()));
  }

  /**
   * Creates an unassigned task with a custom description
   * @param payload Task description
   * @returns An object of type Observable<Task>
   */
  newTask(payload: { description: string }) {
    const newTask: Task = {
      id: ++this.lastId,
      description: payload.description,
      assigneeId: null,
      completed: false,
    };

    this.storedTasks = this.storedTasks.concat(newTask);

    return of(newTask).pipe(delay(randomDelay()));
  }

  /**
   * Assigns a task to a user
   * @param taskId Task ID
   * @param userId User ID
   * @returns An updated Task object
   */
  assign(taskId: number, userId: number) {
    return this.update(taskId, { assigneeId: userId });
  }

  /**
   * Marks a task as completed
   * @param taskId Task ID
   * @param completed Completed boolean flag
   * @returns An object of type Observable<Task>
   */
  complete(taskId: number, completed: boolean) {
    return this.update(taskId, { completed });
  }

  /**
   * Updates a task
   * @param taskId Task ID
   * @param updates A Task object with updated values
   * @returns An object of type Observable<Task>
   */
  update(taskId: number, updates: Partial<Omit<Task, "id">>) {
    const foundTask = this.findTaskById(taskId);

    if (!foundTask) {
      return throwError(new Error("task not found"));
    }

    const updatedTask = { ...foundTask, ...updates };

    this.storedTasks = this.storedTasks.map((t) =>
      t.id === taskId ? updatedTask : t
    );

    return of(updatedTask).pipe(delay(randomDelay()));
  }
}
