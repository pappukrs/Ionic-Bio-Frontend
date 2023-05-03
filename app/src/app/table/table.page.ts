import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController,NavController } from '@ionic/angular';


@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
})


export class TablePage implements OnInit {
   id:any;
   tableData:any;
  constructor(private location : Location,private apiService:ApiService,private route :ActivatedRoute,private router:Router,private alertCtrl:AlertController,private navCtrl:NavController) {
  this.route.params.subscribe((params:any) => {
    this.id=params['id'];
    console.log("this.id",this.id)
    
    this.tableData={};
    this.getTable(this.id); 
  })
  }
    ngOnInit(): void {
        this.getTable(this.id); 
    }
  
  getTable(id:any){
   this.apiService.getSingleList(id).subscribe(data=>{
    console.log("singlList",data);
    this.tableData={...data};
   })
  }

  goBack() {
    this.location.back();
  }
   onDelete(id:any){
    this.showAlert(id);
   }
   onUpdate(id:any){
    this.router.navigate([`update/${id}`]);
   }
  
   async showAlert(id:any){
    const alert=await this.alertCtrl.create({
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
          this.router.navigate([`tabs/tab3`]);
        }
      }
      
    ]
    });
    await alert.present()
   }

}
