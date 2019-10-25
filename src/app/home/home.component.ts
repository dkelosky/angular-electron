import { Component, OnInit } from '@angular/core';

import { IJob } from "@zowe/cli";
import { JobService } from '../core/services/jobs/job.service';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
// import { Htt}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jobs: IJob[];

  constructor(private js: JobService, private http: HttpClient) { }

  async ngOnInit() {

    this.jobs = await this.js.getAllJobs();
    const headers = new HttpHeaders();
    // headers.set("Access-Control-Allow-Origin", "*");
    // this.http.get("localhost:4200/jobs", {headers}).subscribe((data) => {
      this.http.get("http://localhost:4200/jobs").subscribe((data) => {
      console.log(data)
    })
  }

}
