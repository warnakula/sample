//CommonModuleの参照とdeclaratetion配列は不要なので、AppRoutingModuleの1部ではなくなってる。
//最初にアプリにルーティング機能を持たせることができるRouteModuleとRoutesをインポートしてる。
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//routes配列仕様出来るようにする。　
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';

const routes: Routes = [
  //デフォルトルートを追加した。
  //AppRoutingModule.Route配列に追加する。
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  //AppRoutingModule.routes配列にDashboardComponentへのパスにマッチするルートを追加する。
  { path: 'dashboard', component: DashboardComponent },
  //アプリケーションをダッシュボードに自動的に遷移するには、次のルートを
  //pathのコロン(:)はid:が特定のヒーローのidのプレースホルダーであることを表してる。
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'heroes', component: HeroesComponent },
];

@NgModule({
  //RouterModuleをAppRoutingModuleのimports配列に追加し、
  //RouterModule.forRoot()をよびだすことにより、ワンステップでroutesにそれを設定する。
    //forRoot()メソッドは、ルーティングに必要なサービス・プロバイダーとディレクティブ
    //を提供し、ブラウザの現在のURLを基に最初の遷移を行う。
  imports: [RouterModule.forRoot(routes)],
  //RouteModuleをエクスポートし、アプリ全体で利用出来るようにする。
  exports: [RouterModule]
})
export class AppRoutingModule { }