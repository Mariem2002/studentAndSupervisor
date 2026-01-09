import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationService } from 'src/services/publication.service';

@Component({
  selector: 'app-pub-form',
  templateUrl: './pub-form.component.html',
  styleUrls: ['./pub-form.component.css']
})
export class PublicationFormComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private publicationService: PublicationService, private router: Router) {}
  form!: FormGroup;
  ngOnInit() {
  const id =  this.activatedRoute.snapshot.params['id'];

    if(id){
      // Edit mode
      this.publicationService.getPublicationById(id).subscribe(publication => {
        this.form = new FormGroup({
          // initialize form controls with publication data
          type: new FormControl(publication.type),
          titre: new FormControl(publication.titre),
          lien: new FormControl(publication.lien),
          dateApparition: new FormControl(publication.dateApparition),
          sourcePdf: new FormControl(publication.sourcePdf),
        });
      });
    } else {
      // Add mode
      this.form = new FormGroup({
        // initialize form controls with default values 
        type: new FormControl(''),
        titre: new FormControl(''),
        lien: new FormControl(''),
        dateApparition: new FormControl(''),
        sourcePdf: new FormControl(''),
      });
    }
  }

  sub() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      // Edit mode
      this.publicationService.updatePublication(id, this.form.value).subscribe(() => {
        console.log('Publication updated successfully');
        this.router.navigate(['/publications']);
      }); 
    
    } else {
      // Add mode
      this.publicationService.addPublication(this.form.value).subscribe(() => {
        this.router.navigate(['/publications']);
      })

  }
}}
