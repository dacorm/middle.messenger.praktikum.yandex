import {Http} from "../../shared/utils/Http";
import {ProfileData} from "../../shared/interfaces/ProfileData";

export default class UserAPI {
    protected http: Http;

    constructor() {
        this.http = new Http();
    }

    update(data: ProfileData): Promise<string> {
        return this.http.put('/user/profile', data);
    }
}