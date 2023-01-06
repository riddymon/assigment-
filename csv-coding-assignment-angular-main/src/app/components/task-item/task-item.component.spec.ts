import { ComponentFixture, TestBed } from "@angular/core/testing";
import { BackendService } from "src/app/backend.service";

import { TaskItemComponent } from "./task-item.component";

describe("TaskItemComponent", () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskItemComponent],
      providers: [{ provide: BackendService, useValue: new BackendService() }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = {
      id: 0,
      description: "Test Task",
      assigneeId: 111,
      completed: false,
    };
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
