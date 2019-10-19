import { Injectable } from '@angular/core';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer, webFrame, remote } from 'electron';
import * as childProcess from 'child_process';
import * as fs from 'fs';

import { GetJobs, IJob } from "@zowe/cli";
import { Session, ISession, Logger, LoggingConfigurer } from "@zowe/imperative";

@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  session: typeof Session;
  getJobs: typeof GetJobs;

  get isElectron() {
    return window && window.process && window.process.type;
  }

  constructor() {
    // Conditional imports
    if (this.isElectron) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.webFrame = window.require('electron').webFrame;
      this.remote = window.require('electron').remote;

      this.childProcess = window.require('child_process');
      this.fs = window.require('fs');

      this.session = window.require('@zowe/imperative').Session;
      this.getJobs = window.require('@zowe/cli').GetJobs;

      const connectionInfo: ISession = {
        hostname: "usildamd.lvn.broadcom.net",
        user: "kelda16",
        password: "pass",
        type: "basic",
        rejectUnauthorized: false
      };

      // create a session & get jobs
      const session: Session = new this.session(connectionInfo);

      this.getJobs.getJobs(session).then((jobs) => {
        jobs.forEach((job) => {
          console.log(job.jobname);
        });
      });
    }
  }
}
