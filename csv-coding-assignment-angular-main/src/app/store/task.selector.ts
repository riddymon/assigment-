import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./task.reducer";

export interface ApplicationState {
  appState: AppState;
}
export const selectCurrentTaskFeature =
  createFeatureSelector<AppState>("selectedTask");
export const selectCurrentTask = createSelector(
  selectCurrentTaskFeature,
  (state: AppState) => state.selectedTask.currentTask
);
