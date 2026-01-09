import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  userAvatar = 'assets/profile.jpg';
  constructor(private authService: AuthService) {}

  onProfileClick(): void {
    console.log('Profile clicked!');
    // Here you could navigate to a profile page if you want
  }

  onLogout(): void {
    this.authService.signOut()
      .then(() => console.log('User logged out!'))
      .catch(err => console.error('Logout error:', err));
  }
}
