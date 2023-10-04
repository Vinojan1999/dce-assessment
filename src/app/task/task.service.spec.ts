import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    const mockResponse = { data: [{ id: 1, name: 'George' }, { id: 2, name: 'Janet' }] };

    service.getAllUsers().subscribe((data: any) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('https://reqres.in/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should create a user', () => {
    const mockUser = { id: 1, name: 'George' };

    service.createUser(mockUser).subscribe((response: any) => {
      expect(response.status).toBe(201);
    });

    const req = httpMock.expectOne('https://reqres.in/api/users');
    expect(req.request.method).toBe('POST');
    req.flush({}, { status: 201, statusText: 'Created!' });
  });

  it('should edit a user', () => {
    const userId = 1;
    const mockUser = { id: 1, name: 'Updated George' };

    service.editUser(userId, mockUser).subscribe((response: any) => {
      expect(response.status).toBe(200);
    });

    const req = httpMock.expectOne(`https://reqres.in/api/users/${userId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a user', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe((response: any) => {
      expect(response.status).toBe(204);
    });

    const req = httpMock.expectOne(`https://reqres.in/api/users/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}, { status: 204, statusText: 'Deleted!' });
  });

  it('should get a user by ID', () => {
    const userId = 1;
    const mockResponse = { id: userId, name: 'George' };

    service.getUser(userId).subscribe((data: any) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`https://reqres.in/api/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
