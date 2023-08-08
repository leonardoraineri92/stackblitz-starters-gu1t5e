import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ArgumentForm, AuthorForm, Library, LibraryForm } from './interface';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main.html',
})
export class App implements OnInit {
  name = 'Form Array';

  library: Library = {
    name: 'Science',
    arguments: [
      {
        title: 'Astrophysics',
        authors: [{ name: 'Buzz', surname: 'Light Year' }],
      },
    ],
  };

  form = this.fb.group({
    libraryName: this.fb.control<string>('', [Validators.required]),
    arguments: this.fb.array<FormGroup<ArgumentForm>>([]),
  });

  argumentForm = this.fb.group({
    title: this.fb.control<string>('', [Validators.required]),
    authors: this.fb.array<FormGroup<AuthorForm>>([]),
  });

  authorForm = this.fb.group({
    authorName: this.fb.control<string>('', [Validators.required]),
    authorSurname: this.fb.control<string>('', [Validators.required]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form.patchValue({
      libraryName: this.library.name,
    });
    this.createArgumentsForms();
    console.log(this.form);
    debugger;
  }

  createArgumentsForms() {
    this.library.arguments.forEach((argument) => {
      const form = this.fb.group(argument);
      this.onAddArgument(form);
    });
  }

  get arguments(): FormArray<FormGroup> {
    return this.form.get('arguments') as FormArray<FormGroup>;
  }

  get authors(): FormArray {
    return this.argumentForm.get('authors') as FormArray;
  }

  onAddArgument(form?: FormGroup) {
    this.arguments.push(form || this.argumentForm);
  }

  onAddAuthor() {
    this.authors.push(this.authorForm);
  }
}

bootstrapApplication(App);
