import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../core/services/profiles/profile.service';
import { IProfileLoaded } from '@zowe/imperative';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  profiles: IProfileLoaded[] = [];
  currentProfile: IProfileLoaded;

  constructor(private ps: ProfileService) { }

  async ngOnInit() {
    this.setCurrent();
    this.profiles = (await this.ps.getAllZosmf()).filter((prof) => prof.name !== this.currentProfile.name);
  }

  async setCurrent() {
    this.currentProfile = await this.ps.getZosmfDefault();
    this.ps.current = this.currentProfile;
  }

}
