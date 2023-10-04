import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { TaskComponent } from './task.component';
import { TaskService } from './task.service';
import { CreateEditUserComponent } from '../component/create-edit-user/create-edit-user.component';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskService: TaskService;
  let dialog: MatDialog;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskComponent, CreateEditUserComponent],
      imports: [
        MatTableModule,
        MatDialogModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
      ],
      providers: [
        TaskService,
        MatDialog,
        Router,
      ],
    });

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    dialog = TestBed.inject(MatDialog);
    router = TestBed.inject(Router);

    component.dataSource = <any>([]);
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on ngOnInit', () => {
    const spy = spyOn(taskService, 'getAllUsers').and.returnValue(of({ data: [] }));

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
    expect(component.dataSource.data.length).toBe(0); // Assuming an empty response
  });

  it('should open Add User dialog on addUser', () => {
    const spy = spyOn(dialog, 'open').and.returnValue({ 
      afterClosed: () => of(true) 
    } as any);

    component.addUser();

    expect(spy).toHaveBeenCalledWith(CreateEditUserComponent, {
      width: '600px',
      data: {
        title: 'Add User',
        id: 0,
        checkType: true,
      },
    });
  });

  it('should open Edit User dialog on editUser', () => {
    const spy = spyOn(dialog, 'open').and.returnValue({ 
      afterClosed: () => of(true) 
    } as any);
    const userId = 1;

    component.editUser(userId);

    expect(spy).toHaveBeenCalledWith(CreateEditUserComponent, {
      width: '600px',
      data: {
        title: 'Edit User',
        id: userId,
        checkType: false,
      },
    });
  });

  it('should delete user on deleteUser', () => {
    const spy = spyOn(taskService, 'deleteUser').and.returnValue(of({ status: 200 }));
    const userId = 1;

    component.deleteUser(userId);

    expect(spy).toHaveBeenCalledWith(userId);
  });
});
