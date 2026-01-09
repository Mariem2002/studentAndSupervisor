import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MemberFormComponent } from './member-form/member-form.component';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmComponent } from './confirm/confirm.component';
import { TemplateComponent } from './template/template.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { PublicationComponent } from './publication/publication.component';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { EvenementComponent } from './evenement/evenement.component';
import { ModalEvenementComponent } from './modal-evenement/modal-evenement.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

// ❗ MUST be imported
import { environment } from 'src/environments/environment';
import { OutilComponent } from './outil/outil.component';
import { OutilFormComponent } from './outil-form/outil-form.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PublicationFormComponent } from './pub-form/pub-form.component';
import { EvenementFormComponent } from './evenement-form/evenement-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    EvenementComponent,
    EvenementFormComponent,
    HomeComponent,
    LoginComponent,
    MemberComponent,
    MemberFormComponent,
    ModalEvenementComponent,
    NavigationComponent,
    OutilComponent,
    OutilFormComponent,
    PublicationComponent,
    PublicationFormComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,

    // Angular Material
    MatDatepickerModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,

    // 🔥 Firebase MUST BE HERE
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
