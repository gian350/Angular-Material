import { Component, OnInit, Inject } from '@angular/core';
import { Dish } from '../shared/Dish';
import { DishService } from '../services/dish.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { leader } from '../shared/Leader ';
import { LeaderService}  from '../services/leader.service';

import { flyInOut,expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {


  dish:Dish;
  promo:Promotion;
  lead:leader;

  errMess: string;

  // se inyecta el serivicio a la clase mediante el constructor
  constructor( private dishService: DishService,
    private promotionService: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit(): void {
    this.dishService.getFeaturedDish()
      .subscribe((dish)=> this.dish = dish, errmess => this.errMess = <any>errmess);
    this.promotionService.getFeaturedPromotion()
      .subscribe((pro)=> this.promo = pro);
    this.leaderService.getFeaturedLeader()
      .subscribe((le)=> this.lead = le);
  }

}
