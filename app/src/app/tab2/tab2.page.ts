import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { Location } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private navCtrl: NavController,
    private location:Location,
    private alertCtrl: AlertController,
    private router:Router
  ) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      qualification: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      const name = this.myForm.controls['name'].value;
      const qualification = this.myForm.controls['qualification'].value;
      const weight = this.myForm.controls['weight'].value;
      const height = this.myForm.controls['height'].value;

      const data = {
        name,
        qualification,
        weight,
        height,
      };
      this.apiService
        .mqttPublish(data)
        
        .subscribe((response: any) => {
          console.log('mqttPublish');
          // alert('published');
        });
      this.msgAlert();
      this.myForm.setValue({
        name:"",
        qualification:"",
        height:"",
        weight:""
      })
    }
  }

  async msgAlert(){
   const alert= await this.alertCtrl.create({
    header: "Confirmation Message",
    message:"Successfully data published to broker",
    buttons:[{
      text: "OK",
      handler:()=>{
        console.log("mqtt published");
        this.router.navigate([`tabs/tab3`]);
      }
    }],
   })
   await alert.present();
  }


goBack(){
  this.location.back();
}
  isSubmitDisabled() {
    return !this.myForm.valid;
  }

}
