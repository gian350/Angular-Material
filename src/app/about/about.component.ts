import { Component, OnInit, Inject } from '@angular/core';
import { LEADERS } from '../shared/leaders';
import { leader } from '../shared/Leader ';
import { LeaderService } from '../services/leader.service';

import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutComponent implements OnInit {

  leaders: leader[];

  constructor(private leaderService: LeaderService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit(): void {

    this.leaderService.getLeaderes()
      .subscribe((lea)=> this.leaders = lea);
  }

}
