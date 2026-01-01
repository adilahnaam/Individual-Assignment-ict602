import { Injectable, NgZone } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private supabase: SupabaseClient;
  private _isLoggedIn = false;

  constructor(private router: Router, private ngZone: NgZone) {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('event', event);
      console.log('session', session);

      if (session?.user) {
        this._isLoggedIn = true;
        this.ngZone.run(() => this.router.navigate(['/chat']));
      } else {
        this._isLoggedIn = false;
        this.ngZone.run(() => this.router.navigate(['/login']));
      }
    });
  }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  async signOut() {
    await this.supabase.auth.signOut();
  }

  async signInWithGoogle() {
    return await this.supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  }
}
