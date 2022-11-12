import Router from "./shared/utils/Router";
import {LoginPage} from "./pages/LoginPage";
import {RegistrationPage} from "./pages/RegistrationPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import {UserSettingsPage} from "./pages/UserSettingsPage";
import {ErrorPage} from "./pages/ErrorPage";
import Block from "./core/Block";
import AuthController from "./controllers/AuthController";
import { UserData } from "./store/Store";

const router = new Router('#root');

async function init() {
    let currentUser: UserData | null = null;
    let isAuth = !!currentUser;

    const checkAuth = async () => {
        try {
            currentUser = await AuthController.checkUser();

            return true
        } catch (e) {
            Router.getInstance().go('/');
            return false
        }
    };

    await checkAuth().then(() => {
        if (currentUser) {
            console.log('here');
            Router.getInstance().go('/messenger');
        }
    });

    router

        .use({
            pathname: '/', block: LoginPage, props: {user: currentUser}
        })
        .use({
            pathname: '/sign-up', block: RegistrationPage, props: {user: currentUser}
        })
        .use({
            pathname: '/messenger', block: ChatPage, props: {},
            exact: false, needAuth: true, isAuth: isAuth, onNonauthorized: checkAuth,
        })
        .use({
            pathname: '/settings', block: UserSettingsPage,
            exact: false, needAuth: true, isAuth: isAuth, onNonauthorized: checkAuth,
        })
        .use({pathname: '/500', block: ErrorPage as unknown as typeof Block, props: {error: 404}})
        .use({pathname: '/404', block: ErrorPage as unknown as typeof Block, props: {error: 500}})
        .start();

}

init();