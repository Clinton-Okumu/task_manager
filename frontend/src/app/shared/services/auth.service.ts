import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    if (token && user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post('/auth/login', credentials);
  }

  register(user: User): Observable<any> {
    return this.http.post('/auth/register', user);
  }

  setSession(token: string, user: User) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    this.currentUserSubject.next(user);
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return typeof window !== 'undefined' ? !!localStorage.getItem('token') : false;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}