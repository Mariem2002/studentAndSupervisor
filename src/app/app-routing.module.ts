import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicationComponent } from './publication/publication.component';
import { MemberComponent } from './member/member.component';
import { TemplateComponent } from './template/template.component';
import { MemberFormComponent } from './member-form/member-form.component';
import { EvenementComponent } from './evenement/evenement.component';
import { OutilComponent } from './outil/outil.component';
import { OutilFormComponent } from './outil-form/outil-form.component';
import { ModalEvenementComponent } from './modal-evenement/modal-evenement.component';
import { PublicationFormComponent } from './pub-form/pub-form.component';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/members', pathMatch: 'full' }, // pathMatch set to 'full' for exact match meaning the entire URL must match
  
  { path: 'members', component: MemberComponent },
  { path: 'members/addstudent', component: MemberFormComponent },
  { path: 'members/addsupervisor', component: MemberFormComponent },
  { path: 'members/:id/edit', component: MemberFormComponent },
  { path: 'members/:id/evenements', component: EvenementComponent },
  { path: 'members/:id/publications', component: PublicationComponent },
  { path: 'members/:id/outils', component: OutilComponent },
  
  { path: 'evenements', component: EvenementComponent },
  { path: 'evenements/add', component: EvenementFormComponent },
  { path: 'evenements/:id/edit', component: EvenementFormComponent },
 
  { path: 'outils', component: OutilComponent },
  { path: 'outils/add', component: OutilFormComponent },
  { path: 'outils/:id/edit', component: OutilFormComponent },

  { path: 'publications', component: PublicationComponent },
  { path: 'publications/add', component: PublicationFormComponent },
  { path: 'publications/:id/edit', component: PublicationFormComponent },

  { path: 'template', component: TemplateComponent }

 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
