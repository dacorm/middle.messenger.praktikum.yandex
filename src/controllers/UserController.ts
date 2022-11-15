import UserAPI from "../services/api/UserAPI";
import {ProfileData} from "../shared/interfaces/ProfileData";
import {store} from "../store/Store";
import {PasswordData} from "../shared/interfaces/PasswordData";

class UserController {
    private api: UserAPI;

    constructor() {
        this.api = new UserAPI();
    }

    async updateProfile(user: ProfileData) {
        const data = await this.api.update(user);
        store.set('currentUser', data);
    }

    async updateAvatar(avatar: FormData) {
        const data = await this.api.updateAvatar(avatar);
        store.set('currentUser', data);
    }

    async changePassword(passwords: PasswordData) {
        return await this.api.changePassword(passwords);
    }
}

export default new UserController();