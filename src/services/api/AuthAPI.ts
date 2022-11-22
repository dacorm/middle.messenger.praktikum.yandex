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

  constructor() {
    this.http = new Http();
  }

  signUp(data: SignUpData): Promise<string> {
    return this.http.post('/auth/signup', data);
  }

  signIn(data: SignInData): Promise<string> {
    return this.http.post('/auth/signin', data);
  }

  logout(): Promise<string> {
    return this.http.post('/auth/logout', {});
  }

  read(): Promise<UserData> {
    return this.http.get('/auth/user');
  }
}
