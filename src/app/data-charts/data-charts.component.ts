import { Component, OnInit } from '@angular/core';
import * as c3 from 'c3';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
import { UsersService } from '../users.service';

export interface ClientData {
  ClientName: number;
  AnomalyType: string;
  Data: {
    ExecutionDate: string;
    NoOfTrxEachDay: number;
    IndividualAmount: number;
    AuthorizationTime: string;
  }[];
}

@Component({
  selector: 'data-chart',
  templateUrl: './data-charts.component.html',
})
export class DataChartsComponent implements OnInit {
  chartY: Array<string> = [''];
  constructor(
    private $http: HttpClient,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersService.selectedUser.subscribe((user: any) => {
      console.log('Received value:', user);
      this.getClientData(user.ClientName);
    });
  }

  getClientData(id: any): void {
    this.$http
      .get(`http://localhost:3000/users/${id}`)
      .subscribe(
        (data: any) => {
          const chartData = this.mapData(data);
          this.renderChart(chartData);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }

  mapData(clientData: ClientData) {
    let data: any = [];
    let total = 0;
    let count = 0;
    switch (clientData.AnomalyType) {
      case 'Transaction':
        this.chartY=[ 'noOfTransactions', 'average' ];
        data = clientData.Data.map((e) => {
          total += e.NoOfTrxEachDay;
          count++;
          return {
            executionDate: new Date(Date.parse(e.ExecutionDate)),
            noOfTransactions: e.NoOfTrxEachDay,
            average: 44.6
          };

        });
        break;
      case 'Amount':
        this.chartY=[ 'amount', 'average' ];
        data = clientData.Data.map((e) => {
          total += e.NoOfTrxEachDay;
          count++;
          return {
            executionDate: new Date(Date.parse(e.ExecutionDate)),
            amount: e.IndividualAmount,
            average: 44.6
          };

        });
        break;
      case 'Authorization':
        this.chartY=[ 'AuthorizationTime', 'average' ];
        data = clientData.Data.map((e) => {
          total += e.NoOfTrxEachDay;
          count++;
          return {
            executionDate: new Date(Date.parse(e.ExecutionDate)),
            AuthorizationTime: e.AuthorizationTime,
            average: 44.6
          };

        });
        break;
      default:
        break;
    }
    return data;
  }

  renderChart(data: { executionDate: Date; noOfTransactions: number }[]) {
    console.log('data', data);
    const chart = c3.generate({
      bindto: '#chart',
      data: {
        json: data,
        keys: {
          x: 'executionDate',
          value: this.chartY,
        },
        type: 'line',
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d',
          },
        },
        y: {
          tick: {
            format: d3.format('d'),
          },
        },
      },
    });
  }
}
