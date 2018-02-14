import { Component, OnInit } from '@angular/core';
import { TabMenuModule } from 'primeng/components/tabmenu/tabmenu';
import { MenuItem } from 'primeng/components/common/menuitem';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public items: MenuItem[];
  public title = 'Stellar Hardware Wallet';
  public signinWidth = '300';
    public auth2: any;
  _profileName: any;
  _profileImageUrl: any;
  _profileEmail: any;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
     this.items = [
             {label: 'Home', icon: 'fa-home', routerLink: ['/home']},
             {label: 'Create Test Account', icon: 'fa-edit', routerLink: ['/createAccount']},
             {label: 'Import Account', icon: 'fa-download', routerLink: ['/importAccount']},
             {label: 'Account Balance', icon: 'fa-dollar', routerLink: ['/accountBalance']},
             {label: 'Send Money', icon: 'fa-envelope', routerLink: ['/sendMoney']},
             {label: 'Account Transactions', icon: 'fa-columns', routerLink: ['/transactions']}
           ];
  }


}
