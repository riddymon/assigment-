import { Action } from "@ngrx/store";
import { Task } from "../backend.service";

export enum TaskActionType {
  SET_CURRENT_TASK = "[TASK] Set Current Task",
}

/**
 * Defines action for setting the current task
 */
export class SetCurrentTaskAction implements Action {
  type = TaskActionType.SET_CURRENT_TASK;
  constructor(public payload: Task) {}
}
export type TaskAction = SetCurrentTaskAction;
