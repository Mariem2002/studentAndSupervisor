import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EvenementService } from 'src/services/evenement.service';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Evenement } from 'src/models/evenement';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css'],
})
export class EvenementComponent implements AfterViewInit {

  displayedColumns: string[] = [
    'titre', 'dateEvenement', 'lieu', 'actions'
  ];
  
  dataSource = new MatTableDataSource<Evenement>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private evenementService: EvenementService, 
    private dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadEvenements();
  }

  loadEvenements() {
    this.evenementService.getEvenements().subscribe(data => {
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
        this.evenementService.deleteEvenement(id).subscribe(() => this.loadEvenements());
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
