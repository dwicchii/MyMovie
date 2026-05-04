import { Component, OnInit } from '@angular/core';
import { TmdbService } from '../services/tmdb.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-film',
  templateUrl: './film.page.html',
  styleUrls: ['./film.page.scss'],
  standalone: false,
})
export class FilmPage implements OnInit {
  watchedMovies: any[] = [];
  watchlistMovies: any[] = [];
  reviews: any[] = [];
  displayedReviews: any[] = [];
  favoriteMovies: any[] = [];
  segmentValue: string = 'profil';

  userName: string = 'Movie Enthusiast';
  userBio: string = 'Halo, saya pecinta film sejati!';
  userProfilePic: string = 'https://ionicframework.com/docs/img/demos/avatar.svg';

  isEditProfileModalOpen = false;
  editName: string = '';
  editBio: string = '';
  editProfilePic: string = '';

  isReviewHistoryModalOpen = false;

  isAboutModalOpen = false;

  constructor(
    private tmdbService: TmdbService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.watchedMovies = JSON.parse(localStorage.getItem('watchedMovies') || '[]');
    this.watchlistMovies = JSON.parse(localStorage.getItem('watchlistMovies') || '[]');
    
    let loadedReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
    this.reviews = loadedReviews.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.displayedReviews = this.reviews.slice(0, 4);

    this.userName = localStorage.getItem('profile_name') || 'Movie Enthusiast';
    this.userBio = localStorage.getItem('profile_bio') || 'Halo, saya pecinta film sejati!';
    this.userProfilePic = localStorage.getItem('profile_pic') || 'https://ionicframework.com/docs/img/demos/avatar.svg';

    this.loadFavorites();
  }

  loadFavorites() {
    let liked = JSON.parse(localStorage.getItem('likedMovies') || '[]');
    let watched = JSON.parse(localStorage.getItem('watchedMovies') || '[]');
    let favsDict: any = {};
    
    liked.forEach((m: any) => { favsDict[m.id] = m; });
    
    watched.forEach((m: any) => {
      let rating = Number(localStorage.getItem('rating_' + m.id));
      if (rating >= 8) {
        favsDict[m.id] = m;
      }
    });
    
    this.favoriteMovies = Object.values(favsDict).slice(0, 4);
  }

  openEditProfile() {
    this.editName = this.userName;
    this.editBio = this.userBio;
    this.editProfilePic = this.userProfilePic;
    this.isEditProfileModalOpen = true;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editProfilePic = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  async saveProfile() {
    if (!this.editName || this.editName.trim() === '') {
      const toast = await this.toastController.create({
        message: 'Nama wajib diisi!',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
      return;
    }

    if (!this.editBio || this.editBio.trim() === '') {
      this.editBio = 'Halo, saya pecinta film sejati!';
    }

    localStorage.setItem('profile_name', this.editName);
    localStorage.setItem('profile_bio', this.editBio);
    localStorage.setItem('profile_pic', this.editProfilePic);
    this.userName = this.editName;
    this.userBio = this.editBio;
    this.userProfilePic = this.editProfilePic;
    this.isEditProfileModalOpen = false;
  }

  deleteReview(event: Event, itemToDelete: any) {
    event.stopPropagation();

    const index = this.reviews.findIndex(r => 
      r.movieId === itemToDelete.movieId && 
      r.review === itemToDelete.review && 
      r.date === itemToDelete.date
    );

    if (index > -1) {
      this.reviews.splice(index, 1);
      this.displayedReviews = this.reviews.slice(0, 4);
      localStorage.setItem('reviews', JSON.stringify(this.reviews));
    }
  }

  getImage(path: string) {
    if(!path) return 'assets/placeholder.jpg';
    return this.tmdbService.getImageUrl(path);
  }

  openAboutModal() {
    this.isAboutModalOpen = true;
  }

  handleRefresh(event: any) {
    this.loadData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}

