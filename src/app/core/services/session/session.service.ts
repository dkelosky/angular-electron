import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { Session } from '@zowe/imperative';
import { ZosmfSession } from '@zowe/cli';
import { ProfileService } from '../profiles/profile.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  session: typeof Session;
  zosmfSession: typeof ZosmfSession;

  constructor(private es: ElectronService, private ps: ProfileService) {
    if (this.es.isElectron) {
      this.session = window.require('@zowe/imperative').Session;
      this.zosmfSession = window.require('@zowe/cli').ZosmfSession;
    }
  }

  async getZosmfSession() {
    const profile = await this.ps.getZosmfDefault();
    return this.zosmfSession.createBasicZosmfSession(profile.profile);
  }
}
