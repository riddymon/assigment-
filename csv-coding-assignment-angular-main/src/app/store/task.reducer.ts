// import the interface
import { TaskAction, TaskActionType } from "./task.action";
import { Task } from "../backend.service";
import { TaskState } from "./state.model";

export interface AppState {
  selectedTask: TaskState;
}

// Our dummy task with initial state
const initialState: Task = {
  id: 0,
  description: "",
  assigneeId: 0,
  completed: false,
};

/**
 * Defines the actions for tasks
 * @param state Current state
 * @param action Action to be dispatched
 * @returns Updated state or initial state
 */
export function taskReducer(state: TaskState, action: TaskAction) {
  switch (action.type) {
    case TaskActionType.SET_CURRENT_TASK:
      return {
        selectedTask: { currentState: { ...action.payload } },
      };
    default:
      return state;
  }
}
