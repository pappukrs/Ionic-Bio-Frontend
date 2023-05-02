import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { Location } from '@angular/common';
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
    private location:Location
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
          alert('published');
        });
      alert('published');
      this.myForm.setValue({
        name:"",
        qualification:"",
        height:"",
        weight:""
      })
    }
  }


goBack(){
  this.location.back();
}
  isSubmitDisabled() {
    return !this.myForm.valid;
  }

}
