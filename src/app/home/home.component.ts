import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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

export class HomeComponent implements AfterViewInit  {

  dataSource = new MatTableDataSource<IJob>([]);

  columnsToDisplay = ['jobname', 'jobid', 'status', 'retcode']; // IJob column titles

  expandedJob: IJob | null;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private js: JobService) {
  }

  async ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    await this.js.init();

    this.js.selectedJobs.subscribe((jobs) => {
      this.dataSource.data = jobs;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setExpanded(job) {
    console.log(`Expanded trigger clicked for ${job.name}`);
    this.expandedJob = this.expandedJob === job ? null : job;
  }

}
