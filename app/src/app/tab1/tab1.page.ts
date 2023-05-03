import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  myForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private navCtrl: NavController,
    private http:HttpClient,
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
    this.apiService.createSingleList(this.myForm.value).subscribe((res)=>{
      console.log("res",res);
      
      console.log("published")
      this.myForm.setValue({
        name:"",
        qualification:"",
        height:"",
        weight:""
      })
      this.navCtrl.navigateForward('/tabs/tab3');
      // this.router.navigate(['/list']);
    })
  }

}
