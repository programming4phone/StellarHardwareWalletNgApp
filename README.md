# Stellar Hardware Wallet Ng App

This project implements basic wallet functionality to manage Stellar test accounts. Access to this wallet is secured by possession of a flash drive containing the wallet. All data is stored within files residing on the flash drive. No sensitive financial data is exposed locally on the end user's computer. Since this codebase is in the "proof of concept" stage, all access is restricted to the Stellar test network.

Basic wallet functionality includes:
- **create** -  Create a test account using the Stellar Friendbot and an accompanying passphrase.
- **import** - Import an existing test account into the wallet using a passphrase and the account's secret seed. The secret seed is encrypted and stored on a flash drive.
- **balances** - Query Stellar test account balances.
- **transfer** - Transfer funds (in lumens) between 2 test accounts. The passphrase is needed to perform this operation.
- **transactions** - Query Stellar test account transactions.

Account keys, public key and secret seed, are either hashed or encrypted to eliminate exposure. Keys are stored on a flash drive and never exposed locally on the end user's computer. 

The create, import, and transfer functions are further secured by a user chosen passphrase. The balance and transaction query functions are public within the Stellar network so no passphrase is needed.

Also see the [Stellar Hardware Wallet Key Server](https://github.com/programming4phone/StellarHardwareWalletKeyServer "Stellar Hardware Wallet Key Server") project.

For further details about Stellar accounts see <https://www.stellar.org/developers/guides/get-started/create-account.html>.

## Development stack

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.7.

This project also uses primeng, font-awesome, js-stellar-sdk, and crypto-js.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Make sure that the Stellar Hardware Wallet Key Server is running on port 5775.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Run `ng build --prod` and copy the artifacts to in the `dist/` directory to the `static` folder located within the Spring Boot project.
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
