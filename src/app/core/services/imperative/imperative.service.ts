import { Injectable } from '@angular/core';
import { ElectronService } from '../electron/electron.service';
import { Imperative, ImperativeConfig } from '@zowe/imperative';

@Injectable({
  providedIn: 'root'
})
export class ImperativeService {

  imperative: typeof Imperative;
  imperativeConfig: typeof ImperativeConfig;
  private initialized = false;

  constructor(private es: ElectronService) {
    this.imperative = window.require('@zowe/imperative').Imperative;
    this.imperativeConfig = window.require('@zowe/imperative').ImperativeConfig;
  }

  async init() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    const mainZoweDir = this.es.path.join(window.require.resolve('@zowe/cli'), '..', '..', '..', '..');
    (process.mainModule as any).filename = window.require.resolve('@zowe/cli');
    ((process.mainModule as any).paths as any).unshift(mainZoweDir);
    await this.imperative.init({ configurationModule: window.require.resolve('@zowe/cli/lib/imperative.js') });
  }
}
