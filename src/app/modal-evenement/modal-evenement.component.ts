import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-evenement',
  templateUrl: './modal-evenement.component.html',
  styleUrls: ['./modal-evenement.component.css']
})
export class ModalEvenementComponent {
  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<ModalEvenementComponent>, // =>le composant apparait en tant que boite
  ) {}

  form!: FormGroup;
  titre!: string;
  date_debut!: string;
  date_fin!: string;
  lieu!: string;

  ngOnInit() {
    this.form = this.fb.group({
      titre: [this.titre, []],
      date_debut :[this.date_debut, []],
      date_fin:[this.date_fin, []],
      lieu:[this.lieu, []]
    });
  }

  save() {
    this.matDialogRef.close(this.form.value);
  }

  close() {
    this.matDialogRef.close();
  }
}
