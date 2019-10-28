import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { JobService } from '../core/services/jobs/job.service';
import { IJob } from '@zowe/cli';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ])
  ],
})

export class HomeComponent implements OnInit {

  dataSource = new MatTableDataSource<IJob>([]);

  columnsToDisplay = ['name', 'id', 'status', 'code']; // IJob column titles
  columnsToDisplayKey = ['jobname', 'jobid', 'status', 'retcode']; // IJob keys

  expandedJob: IJob | null;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private js: JobService) {
  }

  async ngOnInit() {
    await this.getJobs();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setExpanded(job) {
    console.log(`Expanded trigger clicked for ${job.name}`);
    this.expandedJob = this.expandedJob === job ? null : job;
  }

  async getJobs() {
    this.dataSource.data = await this.js.getAllJobs();
  }
}
