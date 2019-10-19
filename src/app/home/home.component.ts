import { Component, OnInit } from '@angular/core';

import { GetJobs, IJob } from "@zowe/cli";
import { Session, ISession, Logger, LoggingConfigurer } from "@zowe/imperative";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  jobs: IJob[];

  constructor() { }

  async ngOnInit() {

  //   // init dummy logger for imperative
  //   Logger.initLogger(LoggingConfigurer.configureLogger(".sample", { name: "sample" }));

  //   // connection info (host, user, password, etc...)
  //   const connectionInfo: ISession = {
  //     hostname: "usildamd.lvn.broadcom.net",
  //     user: "kelda16",
  //     password: "ghjk5678",
  //     type: "basic",
  //     rejectUnauthorized: false
  //   };

  //   // create a session & get jobs
  //   const session: Session = new Session(connectionInfo);
  //   this.jobs = await GetJobs.getJobs(session);
  }

}
