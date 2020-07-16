import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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
    .pipe(
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
    
    /**
 * 失敗したHttp操作を処理します。
 * アプリを持続させます。
 * @param operation - 失敗した操作の名前
 * @param result - observableな結果として返す任意の値
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: リモート上のロギング基盤にエラーを送信する
    console.error(error); // かわりにconsoleに出力

    // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
    this.log(`${operation} failed: ${error.message}`);

    // 空の結果を返して、アプリを持続可能にする
    return of(result as T);
  };
}
  }
  //モックヒーローの配列を出力するObservable<Hero[]>()を返す。
  //ヒーローが取得されたときにメッセージを送信するように、
  
 /** IDによりヒーローを取得する。見つからなかった場合は404を返却する。 */
getHero(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/${id}`;
  return this.http.get<Hero>(url).pipe(
    tap(_ => this.log(`fetched hero id=${id}`)),
    catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}

/** PUT: サーバー上でヒーローを更新 */
updateHero(hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

}
