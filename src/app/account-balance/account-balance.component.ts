import { Component, OnInit } from '@angular/core';
import { AssetBalance } from '../entities/asset-balance.model';
import { environment } from '../../environments/environment';
import { SpinnerPanelHandler } from '../abstract/spinner-panel-handler.class';
const StellarSdk = require('stellar-sdk');
const MSG_SUMMARY_TITLE = 'Account Balance';

@Component({
  selector: 'app-account-balance',
  templateUrl: './account-balance.component.html',
  styleUrls: ['./account-balance.component.css']
})
export class AccountBalanceComponent extends SpinnerPanelHandler implements OnInit  {

  public inpAccountId: string;
  public assetBalances: AssetBalance[];

  constructor() { super(); }

  ngOnInit() {
    this.handleInit();
    console.log(this);
  }

  getBalances() {
    this.handleStart();
    console.log('getBalances ');

    console.log('inpAccountId: ' + this.inpAccountId);
    const stellarHorizonUrl = `${environment.stellarHorizonUrl}`;
    const server: any = new StellarSdk.Server(stellarHorizonUrl);

    // This needs a try/catch as the input account id can be garbage
    let sourceKeypair: any;
    try {
      sourceKeypair = StellarSdk.Keypair.fromPublicKey(this.inpAccountId);

      server.loadAccount(sourceKeypair.publicKey())
      .then((account) => {
        console.log('Balances for account: ' + sourceKeypair.publicKey());
        this.assetBalances = [];
        account.balances.forEach((balance) => {
          console.log('balance: ' + balance.toString());
          const assetBalance: AssetBalance = new AssetBalance(balance.asset_type, balance.asset_code, balance.balance);
          console.log('Type:', balance.asset_type, ', Code:', balance.asset_code, ', Balance:', balance.balance);
          this.assetBalances.push(assetBalance);
        });
        this.handleSuccess();
      })
      .catch((err) => {
        console.log(err);
        this.handleError(MSG_SUMMARY_TITLE, err);
      });
    } catch (err) {
      console.log(err);
      this.handleError(MSG_SUMMARY_TITLE, 'Invalid Account ID.');
    }
  }
}
