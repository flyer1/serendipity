import { Component, OnInit } from '@angular/core';
import { Contact } from './models/contact.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact: Contact;
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.contact = new Contact();

    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({ name: '', comment: '' });
  }
}
