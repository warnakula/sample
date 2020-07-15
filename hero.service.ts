import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//インジェクターは必要な場所でプロバイダーを選択して注入するためのオブジェクト
@Injectable({
  providedIn: 'root',
})


export class HeroService {
  private heroesUrl = 'api/heroes'; //WebAPIのURL

  
  //サービス内でサービスを利用する。
  constructor(
    private http: HttpClient,
    private messageService: MessageService
    ) { }
  
    /** HeroServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
  this.messageService.add(`HeroService: ${message}`);
  }  
  
  getHeroes(): Observable<Hero[]> {
    // TODO: send the message _after_ fetching the heroes
   // this.messageService.add('HeroService: fetched heroes');
   // return of(HEROES);
  
    return this.http.get<Hero[]>(this.heroesUrl)
  }
  //モックヒーローの配列を出力するObservable<Hero[]>()を返す。
  //ヒーローが取得されたときにメッセージを送信するように、
  
  getHero(id: number): Observable<Hero> {
    //TODO: send the message_afterfetching the heroes
    this.messageService.add('HeroService: fetched heroe id=4{id}');
    return of(HEROES.find(hero => hero.id === id));
  }

}
