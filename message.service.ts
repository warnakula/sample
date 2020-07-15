import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

//2つのメソッドを他のクラスから利用できるように公開する。
  //meesagesへ新たなメッセージを追加する。
  add(message: string) {
    this.messages.push(message);
  }

  //messagesの値を初期化する。
  clear() {
    this.messages = [];
  }
}
