import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  displayedColumns: string[] = ['id', 'f_name', 'l_name', 'email', 'img'];

  dataSource: any;

  ngOnInit(): void {
    this.fetchUsers();
  }

  constructor(private taskService: TaskService) {}

  fetchUsers() {
    this.taskService.getAllUsers().subscribe((data: any) => {
      this.dataSource = data.data;
      console.log("DATA",this.dataSource);
    });
  }
}
