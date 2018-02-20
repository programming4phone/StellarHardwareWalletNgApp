import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { AccountTransaction } from '../entities/account-transaction.model';
import { environment } from '../../environments/environment';
import { SpinnerPanelHandler } from '../abstract/spinner-panel-handler.class';
const StellarSdk = require('stellar-sdk');
const MSG_SUMMARY_TITLE = 'Account Transactions';

@Component({
  selector: 'app-account-transactions',
  templateUrl: './account-transactions.component.html',
  styleUrls: ['./account-transactions.component.css']
})
export class AccountTransactionsComponent extends SpinnerPanelHandler implements OnInit {

  public inpAccountId: string;
  public accountTransactions: AccountTransaction[];

  constructor() { super(); }

  ngOnInit() {
    this.handleInit();
    console.log(this);
  }

  getTransactions() {
    this.handleStart();
    console.log('getTransactions ');

    console.log('inpAccountId: ' + this.inpAccountId);
    const stellarHorizonUrl = `${environment.stellarHorizonUrl}`;
    const server: any = new StellarSdk.Server(stellarHorizonUrl);

    server.transactions()
    .forAccount(this.inpAccountId)
    .call()
    .then((page) => {
        console.log('Page 1: ');
        console.log(page.records);
        this.accountTransactions = [];
        page.records.forEach((record) => {
          console.log('record: ' + record.toString());
          const accountTransaction: AccountTransaction = new AccountTransaction(record.id, record.source_account, record.fee_paid);
          console.log('Transaction Id:', record.id, ', Source Account:', record.source_account, ', Fee Paid:', record.fee_paid);
          this.accountTransactions.push(accountTransaction);
        });
        // return page.next();
        this.handleSuccess();
    })
    // .then(function (page) {
    //  console.log('Page 2: ');
    //  console.log(page.records);
    // })
    .catch((err) => {
      console.log(err);
      let errMsg: string;
      if (err.name === 'NotFoundError') {
        errMsg = 'Invalid Account ID';
      } else {
        errMsg = err.name;
      }
      this.handleError(MSG_SUMMARY_TITLE, errMsg);
    });
  }

}
