// import the interface
import { TaskAction, TaskActionType } from "./task.action";
import { Task } from "../backend.service";

export interface AppState {
  selectedTask: Task;
}

// Our dummy task with initial state
const initialState: AppState = {
  selectedTask: {
    id: 0,
    description: "",
    assigneeId: 0,
    completed: false,
  },
};

/**
 * Defines the actions for tasks
 * @param state Current state
 * @param action Action to be dispatched
 * @returns Updated state or initial state
 */
export function taskReducer(
  state: AppState = initialState,
  action: TaskAction
) {
  switch (action.type) {
    case TaskActionType.SET_CURRENT_TASK:
      return {
        selectedTask: { ...action.payload },
      };
    default:
      return state;
  }
}
