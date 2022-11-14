import UserAPI from "../services/api/UserAPI";
import {ProfileData} from "../shared/interfaces/ProfileData";
import {store} from "../store/Store";

class UserController {
    private api: UserAPI;

    constructor() {
        this.api = new UserAPI();
    }

    async updateProfile(user: ProfileData) {
        const data = await this.api.update(user);
        store.set('currentUser', data);
    }
}

export default new UserController();