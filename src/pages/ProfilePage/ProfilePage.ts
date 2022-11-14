import {compile} from 'pug';
import Block from '../../core/Block';
import {ComponentProps} from '../../shared/interfaces';
import './ProfilePage.scss';
import template from './ProfilePage.template';
import AuthController from "../../controllers/AuthController";
import {Button} from "../../components/Button";
import Router from "../../shared/utils/Router";
import {store, UserData} from "../../store/Store";

export default class ProfilePage extends Block {
    constructor(props: ComponentProps) {
        const settingsButton = new Button({
            child: 'Изменить данные',
            secondary: true,
            events: {
                click: () => {
                    Router.getInstance().go('/settings');
                },
            },
        });

        const passwordButton = new Button({
            child: 'Изменить пароль',
            secondary: true,
            events: {
                click: () => {
                    Router.getInstance().go('/messenger');
                },
            },
        });

        const logoutButton = new Button({
            child: 'Выйти',
            red: true,
            secondary: true,
            events: {
                click: () => {
                    AuthController.logout().then(() => {
                        Router.getInstance().go('/');
                    }).catch((e) => {
                        alert(e);
                    })
                },
            },
        });

        super({
            ...props,
            children: {
                settings: settingsButton.content,
                password: passwordButton.content,
                logout: logoutButton.content,
            },
        });
    }

    _updateUserInfo() {
        const { currentUser } = store.getState();
        (this.node.querySelector('#email') as HTMLParagraphElement)!.textContent = (currentUser as UserData).email as string || '';
        (this.node.querySelector('#login') as HTMLParagraphElement)!.textContent = (currentUser as UserData).login as string || '';
        (this.node.querySelector('#firstName') as HTMLParagraphElement)!.textContent = (currentUser as UserData).first_name as string || '';
        (this.node.querySelector('#secondName') as HTMLParagraphElement)!.textContent = (currentUser as UserData).second_name as string || '';
        (this.node.querySelector('#displayName') as HTMLParagraphElement)!.textContent = (currentUser as UserData).display_name as string || '';
        (this.node.querySelector('#phone') as HTMLParagraphElement)!.textContent = (currentUser as UserData).phone as string || '';
    }

    componentDidMount() {
        AuthController.fetchUser().then(() => {
            this._updateUserInfo();
        }).catch((e) => {
            alert(e);
        });
    }

    render() {
        return compile(template)();
    }

    protected customiseComponent() {
        this.componentDidUpdate();
        const link: HTMLLinkElement = (
            this
                .node
                .querySelector('a.settings__push-back-button') as HTMLLinkElement
        );

        if (link) {
            link.addEventListener('click', () => {
                Router.getInstance().back();
            });
        }
    }
}
