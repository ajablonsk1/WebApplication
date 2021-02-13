import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JsonObject} from "@angular/compiler-cli/ngcc/src/packages/entry_point";
import {TripService} from "../../../services/trip.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  modelForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private tripService: TripService) { }


  JSONObject!: JsonObject;

  onSubmit(modelForm: FormGroup){
    this.modelForm = modelForm;
    this.tripService.changed();
    this.tripService.Cost = this.modelForm.value.Cena;
    console.log(this.modelForm.value.Zdjecie);
    this.JSONObject = {"Nazwa": this.modelForm.value.Nazwa, "DocelowyKraj": this.modelForm.value.DocelowyKraj,
      "DataRozpoczecia": this.modelForm.value.DataRozpoczecia, "DataZakonczenia": this.modelForm.value.DataZakonczenia,
      "Cena": this.modelForm.value.Cena, "IloscMiejsc": this.modelForm.value.IloscMiejsc, "Zdjecie": this.modelForm.value.Zdjecie[0]};
    this.tripService.addTrip(this.JSONObject);
  }


  status(){
    if(this.modelForm.status == 'VALID') return false;
    else return true;
  }


  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      Nazwa: ['', Validators.required],
      DocelowyKraj: ['', Validators.required],
      DataRozpoczecia: ['', Validators.required],
      DataZakonczenia: ['', Validators.required],
      Cena: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      IloscMiejsc: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      Zdjecie: ['', Validators.required]
    });
    console.log(this.modelForm);
  }

}
