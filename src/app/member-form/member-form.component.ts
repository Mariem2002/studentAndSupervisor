import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../../services/member.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  //injection de dependance
  constructor(private memberService:MemberService,private router:Router,private activatedRoute:ActivatedRoute) {
  }
  form!: FormGroup;
  isStudent!: boolean;
  isSupervisor!: boolean;
  ngOnInit(): void {

  const idCourant = this.activatedRoute.snapshot.params['id'];
  const url = this.router.url;
  if (idCourant) {
    // ------- EDIT MODE -------
    this.memberService.getMemberById(idCourant).subscribe(member => {
      if(member.typeMbr == 'etd'){
      this.form = new FormGroup({
        cin: new FormControl(member.cin),
        nom: new FormControl(member.nom),
        prenom: new FormControl(member.prenom),
        dateNaissance: new FormControl(member.dateNaissance),
        dateInscription: new FormControl(member.dateInscription),
        photo: new FormControl(member.photo),
        type: new FormControl(member.typeMbr),
        cv: new FormControl(member.cv),
        email: new FormControl(member.email),
        password: new FormControl(member.password),
        etablissement: new FormControl(member.etablissement),
        encadrantId: new FormControl(member.encadrant?.id),
        diplome: new FormControl(member.diplome),
        sujet: new FormControl(member.sujet),
      });
      this.isStudent = true;
      this.isSupervisor = false;
    }

    else if(member.typeMbr == 'ens'){
      this.form = new FormGroup({
        cin: new FormControl(member.cin),
        nom: new FormControl(member.nom),
        prenom: new FormControl(member.prenom),
        dateNaissance: new FormControl(member.dateNaissance),
        dateInscription: new FormControl(member.dateInscription),
        photo: new FormControl(member.photo),
        type: new FormControl(member.typeMbr),
        cv: new FormControl(member.cv),
        email: new FormControl(member.email),
        password: new FormControl(member.password),
        grade: new FormControl(member.grade),
        etablissement: new FormControl(member.etablissement),
      });
      this.isSupervisor = true;
      this.isStudent = false;
    }
  });
  }
  else if(url.includes('addstudent')){
    // ------- ADD STUDENT MODE -------
    this.form = new FormGroup({
      cin: new FormControl(null),
      nom: new FormControl(null),
      prenom: new FormControl(null),
      dateNaissance: new FormControl(null),
      dateInscription: new FormControl(new Date()),
      photo: new FormControl(null),
      type: new FormControl('etd'),
      cv: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      etablissement: new FormControl(null),
      encadrantId: new FormControl(null),
      diplome: new FormControl(null),
      sujet: new FormControl(null),
    });
    this.isStudent = true;
    this.isSupervisor = false;
  } 

  else if(url.includes('addsupervisor')){
    // ------- ADD SUPERVISOR MODE -------
    this.form = new FormGroup({
      cin: new FormControl(null),
      nom: new FormControl(null),
      prenom: new FormControl(null),
      dateNaissance: new FormControl(null),
      dateInscription: new FormControl(new Date()),
      photo: new FormControl(null),
      type: new FormControl('ens'),
      cv: new FormControl(null),
      email: new FormControl(null),
      password: new FormControl(null),
      grade: new FormControl(null),
      etablissement: new FormControl(null),
    });
    this.isSupervisor = true;
    this.isStudent = false;
  }
}


  sub() {
    const idCourant=this.activatedRoute.snapshot.params['id'];
    if(idCourant && this.form.value.type == "etd"){
      this.memberService.updateEtudiant(idCourant,this.form.value).subscribe(()=>{
        this.router.navigate(['/members']);

      })
    }
    else if(idCourant && this.form.value.type == "ens"){
      this.memberService.updateEnseignant(idCourant,this.form.value).subscribe(()=>{
        this.router.navigate(['/members']);

      })
    }
    else if(this.form.value.type == "etd"){
      //injecter le service et appler la fonction AddMember
      this.memberService.addSEtudiant(this.form.value).subscribe(() => {
        this.router.navigate(['/members']);

      });
    }
    else if(this.form.value.type == "ens"){
      //injecter le service et appler la fonction AddMember
      this.memberService.addEnseignantChercheur(this.form.value).subscribe(() => {
        this.router.navigate(['/members']);

      });
    }
    console.log(this.form.value);
  }
}
