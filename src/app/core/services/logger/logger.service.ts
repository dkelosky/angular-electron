import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { Logger, LoggingConfigurer } from '@zowe/imperative';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  logger: typeof Logger;
  loggingConfigurer: typeof LoggingConfigurer;

  constructor(private electron: ElectronService) {

    if (this.electron.isElectron) {
      this.logger = window.require('@zowe/imperative').Logger;
      this.loggingConfigurer = window.require('@zowe/imperative').LoggingConfigurer;

      // init dummy logger for imperative
      this.logger.initLogger(this.loggingConfigurer.configureLogger('.zowe-electron', { name: 'zowe-electon' }));
    }

  }
}
