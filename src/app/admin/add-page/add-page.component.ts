import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../service/api-service.service";
import {PoemServiceService} from "../../service/poem-service.service";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  constructor(private authorServ: ApiService,
              private poemServ: PoemServiceService) { }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      patronymic: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      biography: new FormControl(null, Validators.required),
      dateBirth: new FormControl(null, Validators.required),
      dateDeath: new FormControl(null, Validators.required),
      chronogrof: new FormControl(null, Validators.required)
    })
    this.form = new FormGroup({
      namePoem: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required)
    })
  }

  submit() {
    const author = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      patronymic: this.form.value.patronymic,
      description: this.form.value.description,
      biography: this.form.value.biography,
      dateBirth: this.form.value.dateBirth,
      dateDeath: this.form.value.dateDeath,
      chronogrof: this.form.value.chronogrof,
    }
    // console.log(author)
    this.authorServ.create(author).subscribe(res =>
      console.log(res)
    )
  }

  submitForPoem() {
    const poem = {
      namePoem: this.form.value.namePoem,
      text: this.form.value.lastName
    }
    // console.log(poem)
    this.poemServ.createPoems(poem).subscribe(res => console.log(res))
  }

}
