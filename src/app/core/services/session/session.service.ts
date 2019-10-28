import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { Session } from '@zowe/imperative';
import { ZosmfSession } from '@zowe/cli';
import { ProfileService } from '../profiles/profile.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sessionApi: typeof Session;
  zosmfSessionApi: typeof ZosmfSession;

  constructor(private es: ElectronService, private ps: ProfileService) {
    if (this.es.isElectron) {
      this.sessionApi = window.require('@zowe/imperative').Session;
      this.zosmfSessionApi = window.require('@zowe/cli').ZosmfSession;
    }
  }

  async getZosmfSession() {
    if (!this.ps.current) {
      this.ps.current = await this.ps.getZosmfDefault();
    }
    console.log(`Getting profile from ${this.ps.current.name}`);
    return this.zosmfSessionApi.createBasicZosmfSession(this.ps.current.profile);
  }
}
