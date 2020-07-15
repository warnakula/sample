 import { Component, OnInit } from '@angular/core';
 import {Hero} from '../hero';  //hero.tsに入ってるHeroをインポートした。
//   //19行目のところのためにインポートしてる。
//import { HEROES } from '../mock-heroes';  //HEROESモックを医㎜ポートしてる。どこの階層のどのモジュールかみたいな感じ。
 import { HeroService } from '../hero.service';
 //import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

   //HeroをselectedHeroにリネームする。
  //selectedHero: Hero;
     //単純な宣言に置き換える。
    heroes: Hero[];
   //heroes = HEROES;
   // hero: Hero ={
    //  id:1,
    //  name:'Windstorm'
   //};

   //このパラメータはプライベートなheroServiceプロパティとして定義されると同時に、
   //HeroServiceを注入すべき場所として認識される。
  constructor(private heroService: HeroService) {}

  //詳細とテキストボックスを表示するのに必要。
  ngOnInit() {
    this.getHeroes();
    }


  // onSelect(hero: Hero): void{
  //   this.selectedHero = hero;
  //   this.messageService.add('HeroesComponent: Selected hero id=${hero.id}');
  //   }
  
   //サービスからヒーローエディタを取得するためのメソッドを作成する。
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
  
}
