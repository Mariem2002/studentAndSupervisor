import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ConfirmComponent } from '../confirm/confirm.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {ActivatedRoute} from "@angular/router";
import { Outil } from 'src/models/outil';
import { OutilService } from 'src/services/outil.service';

@Component({
  selector: 'app-outil',
  templateUrl: './outil.component.html',
  styleUrls: ['./outil.component.css']
})
export class OutilComponent implements AfterViewInit { //to use ngAfterViewInit lifecycle hook which is called after Angular has fully initialized a component's view

    displayedColumns: string[] = ['id', 'dateCreation', 'source', 'actions'];

  
  dataSource = new MatTableDataSource<Outil>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private outilService: OutilService, 
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    const idCourant = this.activatedRoute.snapshot.params['id'];
    if (idCourant) {
      // Load outils for the specific member 
    }
    else{
    this.loadOutils();
    }
  }

  loadOutils() {
    this.outilService.getOutils().subscribe({
      next: data => this.dataSource.data = data,
      error: err => {
        console.error('Failed to load outils', err);
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
        this.outilService.deleteOutil(id).subscribe(() => this.loadOutils());
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
