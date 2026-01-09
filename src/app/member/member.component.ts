import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberService } from 'src/services/member.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Member } from 'src/models/member';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css'],
})
export class MemberComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'id', 'cin', 'nom', 'prenom', 'dateNaissance', 
    'dateInscription', 'sujet', 'grade', 'diplome', 'encadrant', 'type', 'cv', 'email', 'etablissement', 'actions'
  ];
   
  dataSource = new MatTableDataSource<Member>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public memberService: MemberService, 
    private dialog: MatDialog,


  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadMembers();
  }



  loadMembers() {
    this.memberService.getMembers().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      height: '270px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.memberService.deleteMember(id).subscribe(() => this.loadMembers());
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
