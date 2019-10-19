import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { Imperative, CliProfileManager, ImperativeConfig, IProfileLoaded } from '@zowe/imperative';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  imperative: typeof Imperative;
  cliProfileManager: typeof CliProfileManager;
  imperativeConfig: typeof ImperativeConfig;

  constructor(private es: ElectronService) {

    if (this.es.isElectron) {

      this.imperative = window.require('@zowe/imperative').Imperative;
      this.cliProfileManager = window.require('@zowe/imperative').CliProfileManager;
      this.imperativeConfig = window.require('@zowe/imperative').ImperativeConfig;

    }

  }

  async getZosmfDefault() {

    const mainZoweDir = this.es.path.join(window.require.resolve('@zowe/cli'), '..', '..', '..', '..');
    //   // we have to mock a few things to get the Imperative.init to work properly
    (process.mainModule as any).filename = window.require.resolve('@zowe/cli');
    ((process.mainModule as any).paths as any).unshift(mainZoweDir);
    //   // we need to call Imperative.init so that any installed credential manager plugins are loaded
    await this.imperative.init({ configurationModule: window.require.resolve('@zowe/cli/lib/imperative.js') });

    return await new this.cliProfileManager({
      profileRootDirectory: this.es.path.join(this.imperativeConfig.instance.cliHome, 'profiles'),
      type: 'zosmf'
    }).load({ loadDefault: true });

  }
}
