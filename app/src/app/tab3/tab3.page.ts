import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { io, Socket } from 'socket.io-client';
import {AlertController } from '@ionic/angular';
import {Router} from '@angular/router';
import { Location } from '@angular/common';



interface tableData {
  name: string;
  qualification: string;
  height: number;
  weight: number;
  age: number;
  gender: string | null;
  country: {
    country: string;
    probability: number;
  }[];
  _id: string;
}
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
   data:tableData[] ;
   socket: Socket;
  url = 'ws://localhost:9000';
  constructor(private apiService:ApiService,private alertController:AlertController,private router:Router,private location:Location) {
    this.data=[];
    this.socket=io(this.url);
    this.socket.on('person', (data) => {
      console.log(data, 'data_____________Data');
      this.data.push(data);
      
    });
    this.socket.on('delete', (data) => {
     
      console.log('data_data_data_daata', data);
      const idx = this.data.findIndex(
        (ele: any) => +ele._id == +data._id
      );
      
      this.data.splice(idx, 1);
      
      
    });

    this.socket.on('updated', (data) => {
      console.log('updated_emit_data', data);
      const idx = this.data.findIndex(
        (ele: any) => +ele._id == +data._id
      );
      this.data.splice(idx, 1, { ...data });
      
    });
  }

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.getList();
}

 getList(){
     this.apiService.getAllList().subscribe((res:any)=>{
      this.data=[...res]
      console.log(res,"res");
      console.log("data",this.data);
     })
 }

 onView(id:any){
  console.log("onView",id);
   this.router.navigate([`table/${id}`]);
 }
 onDelete(id:any){
  this.showAlert(id);
 }
 onUpdate(id:any){
  this.router.navigate([`update/${id}`]);
   
 }

 async showAlert(id:any){
  const alert=await this.alertController.create({
    header:"Confirm",
    
    message:"Are you really want to Delete ?",
    buttons:[{
      text:"cancel",
      handler: () =>{
       console.log("Cancelled");
      }
    },
    {
      text:"yes",
      handler: () =>{
        this.apiService.deleteSingleList(id).subscribe((res)=>{

        })
      }
    }
    
  ]
  });
  await alert.present()
 }

 goBack(){
  this.location.back();
 }

}
