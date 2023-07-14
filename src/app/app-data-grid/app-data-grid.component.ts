import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { UsersService } from '../users.service';

export interface USER {
  ClientName: number,
  NoOfTransaction: number,
  TotalAmount: number,
  Currency: string,
  RiskIndicator: number,
  Anamoly: string,
  Variation: number
}

@Component({
  selector: 'app-data-grid',
  templateUrl: './app-data-grid.component.html',
  styleUrls: ['./app-data-grid.component.scss']
})
export class AppDataGridComponent implements AfterViewInit {


  // Each Column Definition results in one Column.
  public columnDefs: ColDef[] = [
    { field: 'ClientName', headerName: 'Client Name' },
    { field: 'NoOfTransaction', headerName: 'No. of Transactions' },
    { field: 'TotalAmount', headerName: 'Total Amount' },
    { field: 'Currency', headerName: 'Currency' },
    { field: 'RiskIndicator', headerName: 'Risk Indicator', cellRenderer: this.customCellRenderer },
    { field: 'Anamoly', headerName: 'Anomaly' },
    { field: 'Variation', headerName: 'Variation' }
  ];

  // DefaultColDef sets props common to all Columns
  public defaultColDef: ColDef = {
    sortable: true,
    filter: true,
  };

  highlightedRowIndex = 0

  // Data that gets displayed in the grid
  public rowData: Array<USER> = new Array<USER>;

  // For accessing the Grid's API
  @ViewChild(AgGridAngular) agGrid!: AgGridAngular;

  constructor(private http: HttpClient, private usersService: UsersService) { }

  ngAfterViewInit() {
    this.agGrid.api.sizeColumnsToFit();
  }

  // Example load data from server
  onGridReady(params: GridReadyEvent) {
    /* this.rowData$ = this.http
      .get<any[]>('http://localhost:3000/users'); */
    this.http
      .get<any[]>('http://localhost:3000/users')
      .subscribe((data: any[]) => {
        this.rowData = data;
        this.agGrid.api.setRowData(data);

        // Assign the first row as the initial selected row
        if (data.length > 0) {
          // this.selectedRow = data[0];
          //this.agGrid.api.setFocusedCell()
          this.setFocusOnRow(0);
          this.usersService.selectedUser.next(data[0]);
        }
      });
  }


  // Example of consuming Grid Event
  onCellClicked(e: CellClickedEvent): void {
    console.log('cellClicked', e);
    this.usersService.selectedUser.next(e.data);
  }

  // Example using Grid's API
  clearSelection(): void {
    this.agGrid.api.deselectAll();
  }

  setFocusOnRow(rowIndex: number): void {
    if (this.agGrid && this.agGrid.api) {
      // Ensure the row is visible in the grid
      this.agGrid.api.ensureIndexVisible(rowIndex);
      // this.agGrid.api.
      // Set the focused cell to the specified row and the first column
      this.agGrid.api.setFocusedCell(rowIndex, this.columnDefs[0].field ?? '');
    }
  }

  customCellRenderer(params: any): string {
    let icon = '';
    switch (params.value) {
      case 'HIGH':
        icon = '<i class="fa-solid fa-circle-exclamation fa-xl" style="color: #9f1d1d;"></i>';
        break;
      case 'MEDIUM':
        icon = '<i class="fa-solid fa-triangle-exclamation fa-xl" style="color: #eb840f;"></i>';
        break;
      case 'LOW':
        icon = '<i class="fa-solid fa-check fa-xl" style="color: #16d423;"></i>';
        break;
      default:
        break

    }
    return icon;
  }

}
