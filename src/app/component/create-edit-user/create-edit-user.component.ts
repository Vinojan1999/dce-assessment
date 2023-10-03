import { Component, OnInit, Inject,ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/task/task.service';

@Component({
  selector: 'app-create-edit-user',
  templateUrl: './create-edit-user.component.html',
  styleUrls: ['./create-edit-user.component.scss']
})
export class CreateEditUserComponent implements OnInit{

  checkType:any;
  selectedFileName: any;
 
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private ref:MatDialogRef<CreateEditUserComponent>,
    private builder: FormBuilder,
    private taskService: TaskService,
    ){  }
  
  inputData:any;
  editData:any;

  ngOnInit(): void {
    this.inputData=this.data;
    console.log("Herewds",this.inputData);
    console.log("Here",this.inputData.id.id);
    
    this.checkType=this.inputData.checkType;

    if(!(this.checkType)){
      this.setUpData(this.inputData.id.id);
    }
  }

  handleFileInput(files: FileList | null): void {
    if (files && files.length > 0) {
      const selectedFile = files[0];
      this.selectedFileName = selectedFile.name;
      // Handle the selected file
    }
  }

  closePopUp(){
    this.ref.close("close");
  }

  myForm=this.builder.group({
    first_name:this.builder.control(''),
    last_name:this.builder.control(''),
    email:this.builder.control(''),
    avatar: this.builder.control(''),
  })

  saveUser(){
    console.log(this.myForm.value);
    this.taskService.createUser(this.myForm.value).subscribe(
      res=> {
        console.log(res);
        this.closePopUp();
      }
    )
  }

  updateUser(id:any){
    this.taskService.editUser(id,this.myForm.value).subscribe({
      next: (res)=>{
        this.closePopUp();
      }
    }
    )
  }

  setUpData(id:any) {
    this.taskService.getUser(id).subscribe(item=>{
      console.log(item.data);
      console.log(item.data.first_name);
      this.editData=item.data;
      this.myForm.setValue({
        first_name:this.editData.first_name,
        last_name:this.editData.last_name,
        email:this.editData.email,
        avatar: this.editData.avatar,
      })
    })
  }
  
}