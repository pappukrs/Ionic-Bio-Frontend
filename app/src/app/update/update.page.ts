import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ApiService } from '../service/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  myForm!: FormGroup;
  id:any;
  tabledata:any;
  constructor(private location :Location,private apiService :ApiService,private formBuilder:FormBuilder,private navCtrl: NavController,private route :ActivatedRoute) {
    this.route.params.subscribe((params)=>{
      this.id=params['id'];
    });
  
    


    this.myForm = this.formBuilder.group({
      name: [ '', Validators.required],
      qualification: [ '', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  
  
    

 

  goBack(){
    this.location.back();
  }

  
  onSubmit() {
    this.apiService.updateSingleList(this.id,this.myForm.value).subscribe((res)=>{
      console.log("res",res);
      console.log("published")
      this.myForm.setValue({
        name:"",
        qualification:"",
        height:"",
        weight:""
      })
      this.navCtrl.navigateForward('/list');
    })
  }

  async ngOnInit() {
    this.route.params.subscribe((param) => {
      this.id = param['id'];
    });
    try {
    this.apiService.getSingleList(this.id).subscribe((response: any) => {
      
      this.myForm.patchValue({
        name: `${response.name}`,
        qualification: `${response.qualification}`,
        height: `${response.height}`,
        weight: `${response.weight}`,
      });
      
    });
    
    
    } catch (error) {
      console.error(error);
    }
  }

}
