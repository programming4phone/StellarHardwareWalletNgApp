import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { WalletKeyService } from '../services/wallet-key.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerPanelHandler } from '../abstract/spinner-panel-handler.class';
const AES = require('crypto-js/aes');
const SHA256 = require('crypto-js/sha256');
const StellarSdk = require('stellar-sdk');
const MSG_SUMMARY_TITLE = 'Create Test Account';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent extends SpinnerPanelHandler implements OnInit {

  public inpPassphrase: string;
  public _accountId: string;
  public _secretSeed: string;

  constructor(private walletKeyService: WalletKeyService) { super(); }

  ngOnInit() {
    this.handleInit();
    console.log(this);
  }

  createTestAccount() {
    this.handleStart();
    console.log('createTestAccount ');

    console.log('inpPassphrase: ' + this.inpPassphrase);
    const newKeypair: any = StellarSdk.Keypair.random();

    this.walletKeyService.getTestAccount(newKeypair.publicKey()).subscribe(
      data => {
        this._accountId = newKeypair.publicKey();
        this._secretSeed = newKeypair.secret();

        this.saveKeys(newKeypair, this.inpPassphrase);

        this.handleSuccess();
      },
      (err: HttpErrorResponse) => {
        this.processHttpErrorResponse(err, 'getTestAccount');
      },
      () => {
          //
      });
  }

  private saveKeys(newKeypair: any, passphrase: string) {
    console.log('saveKeys');
    // Hash public key and convert to Base64 for transport to key server
    const hashedPublicKey: string = SHA256(newKeypair.publicKey());
    const hashedBase64PublicKey: string = btoa(hashedPublicKey);
    // console.log('hashedPublicKey: ' + hashedPublicKey);
    // console.log('hashedBase64PublicKey: ' + hashedBase64PublicKey);

    // encrypt secret seed and convert to Base64 for transport to key server
    const encryptedSecretSeed: any =  AES.encrypt(newKeypair.secret(), passphrase);
    const encryptedBase64SecretSeed: string = btoa(encryptedSecretSeed.toString());
    // console.log('encryptedSecretSeed: ' + encryptedSecretSeed.toString());
    // console.log('encryptedBase64SecretSeed: ' + encryptedBase64SecretSeed);

    this.walletKeyService.saveKeys(hashedBase64PublicKey, encryptedBase64SecretSeed).subscribe(
      data => {
        this.handleSuccess();
       },
      (err: HttpErrorResponse) => {
        this.processHttpErrorResponse(err, 'saveKeys');
      },
      () => {
          //
      });
  }

  private processHttpErrorResponse(err: HttpErrorResponse, serviceName: string) {
    let errMsg: string;
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errMsg = `walletKeyService.${serviceName} webservice error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong
      if (err.status === 400) {
        errMsg = `Invalid account id or invalid secret seed.`;
      } else {
        errMsg = `walletKeyService.${serviceName} webservice returned code ${err.status}, body was: ${err.error}`;
      }
    }
    this.handleError(MSG_SUMMARY_TITLE, errMsg);
  }
}
