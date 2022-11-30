import { Http } from '../../shared/utils/Http';
import { UserData } from '../../store/Store';

export interface SignUpData {
    first_name: string | null;
    second_name: string | null;
    login: string | null;
    email: string | null;
    password: string | null;
    phone: string | null;
}

export interface SignInData {
    password: string | null;
    login: string | null;
}

export default class AuthAPI {
  protected http: Http;

  private baseUrl: string;

  constructor() {
    this.http = new Http();
    this.baseUrl = 'https://ya-praktikum.tech/api/v2';
  }

  signUp(data: SignUpData): Promise<string> {
    return this.http.post(`${this.baseUrl}/auth/signup`, data);
  }

  signIn(data: SignInData): Promise<string> {
    return this.http.post(`${this.baseUrl}/auth/signin`, data);
  }

  logout(): Promise<string> {
    return this.http.post(`${this.baseUrl}/auth/logout`, {});
  }

  read(): Promise<UserData> {
    return this.http.get(`${this.baseUrl}/auth/user`);
  }
}
