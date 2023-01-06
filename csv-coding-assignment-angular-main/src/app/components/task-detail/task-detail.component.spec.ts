import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { BackendService } from "src/app/backend.service";

import { TaskDetailComponent } from "./task-detail.component";

describe("TaskDetailComponent", () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  const task = {
    id: 0,
    description: "Test Task",
    assigneeId: 111,
    completed: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskDetailComponent],
      providers: [{ provide: BackendService, useValue: new BackendService() }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    component.task = task;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should show update button when updating a task", () => {
    const fixture = TestBed.createComponent(TaskDetailComponent);
    component.isNewTask = false;
    fixture.detectChanges();
    const updateButton = fixture.debugElement.query(By.css(".updateButton"));
    let styles = window.getComputedStyle(updateButton.nativeElement);
    expect(styles.visibility).toBe("visible");
  });
});
