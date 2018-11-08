import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

  IsLoggedIn: boolean;

  constructor(private authService: AuthService,
    private ref: ChangeDetectorRef) {
    
  }

  ngOnInit() {
    console.log('nav-menu.component - OnInit');
    this.authService.isLoggedIn.subscribe((next: boolean) => {
      console.log('nav-menu.component - isLoggedIn:' + next);
      this.IsLoggedIn = next;
      this.ref.detectChanges();
    });
  }

  onLogout() {
    console.log('nav-menu.component - pre-onLogout');
    this.authService.logout();
    console.log('nav-menu.component - post-onLogout');
    this.ref.detectChanges();
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
