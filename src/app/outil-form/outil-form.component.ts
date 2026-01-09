import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OutilService } from 'src/services/outil.service';

@Component({
  selector: 'app-outil-form',
  templateUrl: './outil-form.component.html',
  styleUrls: ['./outil-form.component.css']
})
export class OutilFormComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute, private outilService: OutilService, private router: Router) {}
  form!: FormGroup;
  ngOnInit() {
  const id =  this.activatedRoute.snapshot.params['id'];

    if(id){
      // Edit mode
      this.outilService.getOutilById(id).subscribe(outil => {
        this.form = new FormGroup({
          // initialize form controls with outil data
          dateCreation: new FormControl(outil.dateCreation),
          source: new FormControl(outil.source),
        });
      });
    } else {
      // Add mode
      this.form = new FormGroup({
        // initialize form controls with default values 
        dateCreation: new FormControl(''),
        source: new FormControl(''),
      });
    }
  }

  sub() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      // Edit mode
      this.outilService.updateOutil(id, this.form.value).subscribe(() => {
        console.log('Outil updated successfully');
        this.router.navigate(['/outils']);
      }); 
    
    } else {
      // Add mode
      this.outilService.addOutil(this.form.value).subscribe(() => {
        this.router.navigate(['/outils']);
      })

  }
}}
