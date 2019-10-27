import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { CliProfileManager, IProfileLoaded } from '@zowe/imperative';
import { ImperativeService } from '../imperative/imperative.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private currentProf: IProfileLoaded;
  cliProfileManager: typeof CliProfileManager;

  constructor(private es: ElectronService, private is: ImperativeService) {
    if (this.es.isElectron) {
      this.cliProfileManager = window.require('@zowe/imperative').CliProfileManager;
    }
  }

  async getZosmfDefault() {
    await this.is.init();

    return new this.cliProfileManager({
      profileRootDirectory: this.es.path.join(this.is.imperativeConfig.instance.cliHome, 'profiles'),
      type: 'zosmf'
    }).load({ loadDefault: true });

  }

  async getAllZosmf() {
    await this.is.init();

    const profiles = await new this.cliProfileManager({
      profileRootDirectory: this.es.path.join(this.is.imperativeConfig.instance.cliHome, 'profiles'),
      type: `zosmf`
    }).loadAll();

    return profiles.filter((profile) => {
      return profile.type === `zosmf`;
    });

  }

  set current(profile: IProfileLoaded) {
    this.currentProf = profile;
  }

  get current() {
    return this.currentProf;
  }
}
