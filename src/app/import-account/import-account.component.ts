import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/components/common/api';
import { WalletKeyService } from '../services/wallet-key.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SpinnerPanelHandler } from '../abstract/spinner-panel-handler.class';

const AES = require('crypto-js/aes');
const SHA256 = require('crypto-js/sha256');
const StellarSdk = require('stellar-sdk');
const MSG_SUMMARY_TITLE = 'Import to Wallet';

@Component({
  selector: 'app-import-account',
  templateUrl: './import-account.component.html',
  styleUrls: ['./import-account.component.css']
})
export class ImportAccountComponent extends SpinnerPanelHandler implements OnInit {

  public inpPassphrase: string;
  public inpSecretSeed: string;
  public _accountId: string;
  public _secretSeed: string;

  constructor(private walletKeyService: WalletKeyService) { super(); }

  ngOnInit() {
    this.handleInit();
    console.log(this);
  }

  import2Wallet() {

    this.handleStart();
    console.log('import2Wallet ');

    // console.log('inpSecretSeed: ' + this.inpSecretSeed);
    // console.log('inpPassphrase: ' + this.inpPassphrase);

    // Get account id (public key) from keypair using secret seed
    const sourceKeypair: any = StellarSdk.Keypair.fromSecret(this.inpSecretSeed);
    const sourcePublicKey: string = sourceKeypair.publicKey();
    // console.log('sourcePublicKey: ' + sourcePublicKey);

    // Hash public key and convert to Base64 for transport to key server
    const hashedPublicKey: string = SHA256(sourceKeypair.publicKey());
    const hashedBase64PublicKey: string = btoa(hashedPublicKey);
    // console.log('hashedPublicKey: ' + hashedPublicKey);
    // console.log('hashedBase64PublicKey: ' + hashedBase64PublicKey);

    // encrypt secret seed and convert to Base64 for transport to key server
    const encryptedSecretSeed: any =  AES.encrypt(this.inpSecretSeed, this.inpPassphrase);
    const encryptedBase64SecretSeed: string = btoa(encryptedSecretSeed.toString());
    // console.log('encryptedSecretSeed: ' + encryptedSecretSeed.toString());
    // console.log('encryptedBase64SecretSeed: ' + encryptedBase64SecretSeed);

    this.walletKeyService.saveKeys(hashedBase64PublicKey, encryptedBase64SecretSeed).subscribe(
      data => {
        this._accountId = sourcePublicKey;
        this._secretSeed = this.inpSecretSeed;
        this.handleSuccess();
      },
      (err: HttpErrorResponse) => {
        let errMsg: string;
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          errMsg = `walletKeyService.saveKeys webservice error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong
          if (err.status === 400) {
            errMsg = `Invalid account id or invalid secret seed.`;
          } else {
            errMsg = `walletKeyService.saveKeys webservice returned code ${err.status}, body was: ${err.error}`;
          }
        }
        console.log(errMsg);
        this.handleError(MSG_SUMMARY_TITLE, errMsg);
      },
      () => {
          //
      });
  }

}
