import { Http } from '../../shared/utils/Http';
import { ProfileData } from '../../shared/interfaces/ProfileData';
import { PasswordData } from '../../shared/interfaces/PasswordData';

export default class UserAPI {
  protected http: Http;

  private baseUrl: string;

  constructor() {
    this.http = new Http();
    this.baseUrl = 'https://ya-praktikum.tech/api/v2';
  }

  update(data: ProfileData): Promise<string> {
    return this.http.put(`${this.baseUrl}/user/profile`, data);
  }

  updateAvatar(avatar: FormData): Promise<string> {
    return this.http.put(`${this.baseUrl}/user/profile/avatar`, avatar);
  }

  changePassword(data: PasswordData): Promise<string> {
    return this.http.put(`${this.baseUrl}/user/password`, data);
  }

  searchUser(login: string): Promise<ProfileData> {
    return this.http.post(`${this.baseUrl}/user/search`, { login });
  }
}
