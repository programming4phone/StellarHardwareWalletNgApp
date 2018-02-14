import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateAccountComponent } from './create-account/create-account.component';
import { ImportAccountComponent } from './import-account/import-account.component';
import { AccountBalanceComponent } from './account-balance/account-balance.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { AccountTransactionsComponent } from './account-transactions/account-transactions.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SplashComponent },
  { path: 'createAccount', component: CreateAccountComponent },
  { path: 'importAccount', component: ImportAccountComponent },
  { path: 'accountBalance', component: AccountBalanceComponent },
  { path: 'sendMoney', component: SendMoneyComponent },
  { path: 'transactions', component: AccountTransactionsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
