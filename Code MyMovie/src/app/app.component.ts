import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { library, playCircle, filmOutline, search, homeOutline } from 'ionicons/icons';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  
  private lastBackPress = 0;
  private timePeriodToExit = 2000; // 2 seconds

  constructor(
    private platform: Platform,
    private location: Location,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    addIcons({ library, playCircle, filmOutline, search, homeOutline });

    this.platform.backButton.subscribeWithPriority(10, async () => {
      const currentUrl = this.router.url;
      const urlWithoutParams = currentUrl.split('?')[0];
      
      // Define root URLs where pressing back prompts to exit
      const isRoot = ['/', '/home', '/search', '/film'].includes(urlWithoutParams);

      if (isRoot) {
        const currentTime = new Date().getTime();
        
        if (currentTime - this.lastBackPress < this.timePeriodToExit) {
          App.exitApp();
        } else {
          this.lastBackPress = currentTime;
          const toast = await this.toastCtrl.create({
            message: 'Ketuk sekali lagi untuk keluar',
            duration: 2000,
            position: 'bottom',
            color: 'dark',
            cssClass: 'exit-toast'
          });
          await toast.present();
        }
      } else {
        this.location.back();
      }
    });
  }
}