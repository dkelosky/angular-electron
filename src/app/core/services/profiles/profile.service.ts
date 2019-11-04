import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { CliProfileManager, IProfileLoaded } from '@zowe/imperative';
import { ImperativeService } from '../imperative/imperative.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private initialized = false;

  cliProfileManagerApi: typeof CliProfileManager;

  selectedProfile: BehaviorSubject<IProfileLoaded> = new BehaviorSubject(null);
  allProfiles: BehaviorSubject<IProfileLoaded[]> = new BehaviorSubject(null);

  constructor(private es: ElectronService, private is: ImperativeService) {
    if (this.es.isElectron) {
      this.cliProfileManagerApi = window.require('@zowe/imperative').CliProfileManager;
    }

    this.init();
  }

  private async init() {
    this.current = await this.getZosmfDefault();
    this.all = await this.getAllZosmf();
  }

  private async getZosmfDefault() {
    await this.is.init();

    return new this.cliProfileManagerApi({
      profileRootDirectory: this.es.path.join(this.is.imperativeConfigApi.instance.cliHome, 'profiles'),
      type: 'zosmf'
    }).load({ loadDefault: true });

  }

  private async getAllZosmf() {
    await this.is.init();

    const profiles = await new this.cliProfileManagerApi({
      profileRootDirectory: this.es.path.join(this.is.imperativeConfigApi.instance.cliHome, 'profiles'),
      type: `zosmf`
    }).loadAll();

    return profiles.filter((profile) => {
      return profile.type === `zosmf`;
    });
  }

  /**
   * Allow setting of current by other services and components so that we can have a default for the
   * duration of the application that does not reset the default set via the zowe CLI.
   * @memberof ProfileService
   */
  set current(profile: IProfileLoaded) {
    this.selectedProfile.next(profile);
  }

  private set all(profiles: IProfileLoaded[]) {
    this.allProfiles.next(profiles);
  }
}
