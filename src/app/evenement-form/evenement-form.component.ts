import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EvenementService } from 'src/services/evenement.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './evenement-form.component.html',
  styleUrls: ['./evenement-form.component.css']
})
export class EvenementFormComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private evenementService: EvenementService, private router: Router) {}
  form!: FormGroup;
  ngOnInit() {
  const id =  this.activatedRoute.snapshot.params['id'];

    if(id){
      // Edit mode
      this.evenementService.getEvenementById(id).subscribe(evenement => {
        this.form = new FormGroup({
          // initialize form controls with evenement data
          titre: new FormControl(evenement.titre),
          dateEvenement: new FormControl(evenement.dateEvenement),
          lieu: new FormControl(evenement.lieu)

        });
      });
    } else {
      // Add mode
      this.form = new FormGroup({
        // initialize form controls with default values 
        titre: new FormControl(''),
        dateEvenement: new FormControl(''),
        lieu: new FormControl('')
      });
    }
  }

  sub() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      // Edit mode
      this.evenementService.updateEvenement(id, this.form.value).subscribe(() => {
        console.log('Evenement updated successfully');
        this.router.navigate(['/evenements']);
      }); 
    
    } else {
      // Add mode
      this.evenementService.addEvenement(this.form.value).subscribe(() => {
        this.router.navigate(['/evenements']);
      })

  }
}}