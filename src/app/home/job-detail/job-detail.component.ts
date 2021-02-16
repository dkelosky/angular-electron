import { Component, OnInit, Input } from '@angular/core';
import { IJob, IJobFile } from '@zowe/cli';
import { JobService } from '../../core/services/jobs/job.service';
import { ElectronService } from '../../core/services';
import * as path from 'path';
import * as url from 'url';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  @Input() job: IJob;
  files: IJobFile[];
  constructor(private js: JobService, private es: ElectronService) {

  }

  async ngOnInit() {
    this.files = await this.js.getFiles(this.job);
    console.log(this.job.jobname)
    console.log(this.files)
    // console.log(this.files.length)
  }

  test() {
    console.log('clicked')
    // const electronScreen = screen;
    // const size = this.es.screen.getPrimaryDisplay().workAreaSize;
    const args = process.argv.slice(1);
    const serve = args.some(val => val === '--serve');
    const win = new this.es.remote.BrowserWindow({
      x: 0,
      y: 0,
      width: 800,
      height: 600,
      frame: true,
      webPreferences: {
        nodeIntegration: true,
      },
    });


    if (true) {
      require('electron-reload')(__dirname, {
        electron: require(`${__dirname}/node_modules/electron`)
      });
      win.loadURL('http://localhost:4200');
    } else {
      win.loadURL(url.format({
        pathname: path.join(__dirname, 'dist/index.html#/jobfile'),
        protocol: 'file:',
        slashes: true
      }));
    }

    // win.loadURL('file://' + __dirname + '/index.html#/home');

    // win.loadURL(url.format({
    //   pathname: path.join('file://' + __dirname, '/index.html#/home'),
    //   // protocol: 'file:',
    //   // slashes: true
    // }));
  }

}
