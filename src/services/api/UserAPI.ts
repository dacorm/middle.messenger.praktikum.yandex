import {Http} from "../../shared/utils/Http";
import {ProfileData} from "../../shared/interfaces/ProfileData";
import {PasswordData} from "../../shared/interfaces/PasswordData";

export default class UserAPI {
    protected http: Http;

    constructor() {
        this.http = new Http();
    }

    update(data: ProfileData): Promise<string> {
        return this.http.put('/user/profile', data);
    }

    updateAvatar(avatar: FormData): Promise<string> {
        return this.http.put('/user/profile/avatar', avatar);
    }

    changePassword(data: PasswordData): Promise<string> {
        return this.http.put('/user/password', data)
    }

    searchUser(login: string): Promise<ProfileData> {
        return this.http.post('/user/search', { login })
    }
}