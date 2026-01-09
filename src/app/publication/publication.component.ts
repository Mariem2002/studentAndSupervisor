import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ConfirmComponent } from '../confirm/confirm.component';
import { PublicationService } from 'src/services/publication.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Publication } from 'src/models/publication';
import {ActivatedRoute} from "@angular/router";
import { MemberService } from 'src/services/member.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements AfterViewInit { //to use ngAfterViewInit lifecycle hook which is called after Angular has fully initialized a component's view

    displayedColumns: string[] = ['id', 'type', 'titre', 'lien', 'dateApparition', 'sourcePdf', 'actions'];

  
  dataSource = new MatTableDataSource<Publication>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private publicationService: PublicationService, 
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private memberService: MemberService
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadPublications();
    
  }

  loadPublications() {
    this.publicationService.getPublications().subscribe({
      next: data => this.dataSource.data = data,
      error: err => {
        console.error('Failed to load publications', err);
        this.dataSource.data = [];
      }
    });
  }


  delete(id: number) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      height: '270px',
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.publicationService.deletePublication(id).subscribe(() => this.loadPublications());
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
