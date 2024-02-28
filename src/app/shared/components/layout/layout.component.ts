import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { footerLinks } from '../../../core/constants/footer-links';

@Component({
  selector: 'fs-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass',
})
export class LayoutComponent {
  readonly footerLinks = footerLinks;

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  logout(): void {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
