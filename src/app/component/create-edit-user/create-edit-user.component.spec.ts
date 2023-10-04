import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { identity, of, timestamp } from 'rxjs';

import { CreateEditUserComponent } from './create-edit-user.component';
import { TaskService } from 'src/app/task/task.service';

describe('CreateEditUserComponent', () => {
  let component: CreateEditUserComponent;
  let fixture: ComponentFixture<CreateEditUserComponent>;
  let dialogRef: MatDialogRef<CreateEditUserComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    const dialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    TestBed.configureTestingModule({
      declarations: [CreateEditUserComponent],
      imports: [
        ReactiveFormsModule, 
        MatDialogModule, 
        HttpClientModule,
        MatFormFieldModule,
        HttpClientTestingModule
      ],
      providers: [
        TaskService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    });

    fixture = TestBed.createComponent(CreateEditUserComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    dialogRef = TestBed.inject(MatDialogRef);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call taskService.createUser when saveUser is called', () => {
    const taskService = TestBed.inject(TaskService);
    const httpTestingController = TestBed.inject(HttpTestingController);
  
    component.myForm.setValue({
      first_name: 'Vinojan',
      last_name: 'Abhimanyu',
      email: 'vinojan02abhimanyu@gmail.com',
      avatar: '',
    });
  
    component.saveUser();
  
    const req = httpTestingController.expectOne('https://reqres.in/api/users');
    expect(req.request.method).toBe('POST');
  
    const responseData = {
      first_name: 'Vinojan',
      last_name: 'Abhimanyu',
      email: 'vinojan02abhimanyu@gmail.com',
      id: '214',
      avatar: '',
      createdAt: '2023-10-04T20:19:20.845Z',
    };
  
    req.flush(responseData, { status: 201, statusText: 'Created' });
  
    expect(taskService.createUser).toHaveBeenCalledWith({
      first_name: 'Vinojan',
      last_name: 'Abhimanyu',
      email: 'vinojan02abhimanyu@gmail.com',
      avatar: '',
    });
  
    httpTestingController.verify();
  });


  it('should call taskService.editUser when updateUser is called', () => {
    const taskService = TestBed.inject(TaskService);
    const httpTestingController = TestBed.inject(HttpTestingController);
  
    component.myForm.setValue({
      first_name: 'Vinojan',
      last_name: 'Abhimanyu',
      email: 'vinojan02abhimanyu@gmail.com',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    });
  
    component.updateUser(123);
  
    const req = httpTestingController.expectOne('https://reqres.in/api/users/123');
    expect(req.request.method).toBe('PUT');
  
    const responseData = {
      first_name: 'Vinojan',
      last_name: 'Abhimanyu',
      email: 'vinojan02abhimanyu@gmail.com',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
      updatedAt: '2023-10-04T20:06:40.775Z',
    };
  
    req.flush(responseData, { status: 200, statusText: 'OK' });
  
    expect(taskService.editUser).toHaveBeenCalledWith(123, {
      first_name: 'Vinojan',
      last_name: 'Abhimanyu',
      email: 'vinojan02abhimanyu@gmail.com',
      avatar: 'https://reqres.in/img/faces/1-image.jpg',
    });
  
    httpTestingController.verify();
  });
});
