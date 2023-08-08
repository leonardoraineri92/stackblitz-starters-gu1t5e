import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface Library {
  name: string;
  arguments: Argument[];
}

export interface Argument {
  title: string;
  authors: Author[];
}

export interface Author {
  name: string;
  surname: string;
}

export interface LibraryForm {
  name: FormControl<string>;
  arguments: FormArray<FormGroup<ArgumentForm>>;
}

export interface ArgumentForm {
  title: FormControl<string>;
  authors: FormArray<FormGroup<AuthorForm>>;
}

export interface AuthorForm {
  name: FormControl<string>;
  surname: FormControl<string>;
}
