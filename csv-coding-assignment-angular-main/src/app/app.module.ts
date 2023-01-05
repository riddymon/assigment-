import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BackendService } from "./backend.service";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { TaskDetailComponent } from "./components/task-detail/task-detail.component";
import { TaskItemComponent } from "./components/task-item/task-item.component";
import { AppRoutingModule } from "./app-routing.module";
import { StoreModule } from "@ngrx/store";
import { taskReducer } from "./store/task.reducer";

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailComponent,
    TaskItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      task: taskReducer,
    }),
  ],
  providers: [BackendService],
  bootstrap: [AppComponent],
})
export class AppModule {}
