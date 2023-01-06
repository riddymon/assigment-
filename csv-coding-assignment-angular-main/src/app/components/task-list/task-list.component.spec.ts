import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BackendService } from "src/app/backend.service";
import { provideMockStore, MockStore } from "@ngrx/store/testing";

import { TaskListComponent } from "./task-list.component";

describe("TaskListComponent", () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let homeState: string;

  beforeEach(async () => {
    const state = {
      selectedTask: {
        id: null,
        description: "",
        assigneeId: null,
        completed: false,
      },
    };
    const task = {
      id: 0,
      description: "Test Task",
      assigneeId: 111,
      completed: false,
    };
    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        { provide: BackendService, useValue: new BackendService() },
        provideMockStore({ initialState: state }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
