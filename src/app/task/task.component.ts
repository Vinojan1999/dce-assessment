import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateEditUserComponent } from '../component/create-edit-user/create-edit-user.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  displayedColumns: string[] = ['id', 'f_name', 'l_name', 'email', 'img', 'actions'];

  dataSource: any;

  ngOnInit(): void {
    this.fetchUsers();
  }

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  fetchUsers() {
    this.taskService.getAllUsers().subscribe((data: any) => {
      this.dataSource = data.data;
      console.log("DATA",this.dataSource);
    });
  }

  addUser(){
    this.openAddUser(0,'Add User',true);
  }

  editUser(id:any){
    this.openAddUser(id,'Edit User',false);
  }

  openAddUser(id:any,title:any,checkType:any){
    var popUp = this.dialog.open(CreateEditUserComponent,{
      width:'30%',
      data:{
        title:title,
        id:id,
        checkType: checkType
      }
    })
    popUp.afterClosed().subscribe({
      next: (response)=>{
        console.log(response);
        this.ngOnInit();
      }
    })
  }

  deleteUser(id:any){
    this.taskService.deleteUser(id).subscribe({
      next: (response)=>{
        window.location.reload();
        this.router.navigate(['/']);
        console.log(response);
      }
    })
  }
}
