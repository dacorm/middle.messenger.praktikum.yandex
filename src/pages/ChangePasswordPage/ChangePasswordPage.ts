import {compile} from 'pug';
import Block from '../../core/Block';
import {ComponentProps} from '../../shared/interfaces';
import './ChangePasswordPage.scss';
import template from './ChangePasswordPage.template';
import {SettingsInput} from '../../components/SettingsInput';
import {handleValidation, validateForm} from '../../shared/utils/validation';
import {store, UserData} from "../../store/Store";
import {avatarUrlGenerator} from "../../shared/utils/avatarUrlGenerator";
import AuthController from "../../controllers/AuthController";
import UserController from "../../controllers/UserController";
import Router from "../../shared/utils/Router";
import {PasswordData} from "../../shared/interfaces/PasswordData";

export default class ChangePasswordPage extends Block {
    constructor(props: ComponentProps) {
        const oldPassword = new SettingsInput({
            placeholder: '•••••••••',
            text: 'Старый пароль',
            id: 'oldPassword',
            type: 'password',
            for: 'oldPassword',
            name: 'oldPassword',
            required: true,
            events: {
                blur: handleValidation,
                focus: handleValidation,
            },
        });

        const newPassword = new SettingsInput({
            placeholder: '•••••••••••',
            text: 'Новый пароль',
            id: 'newPassword',
            type: 'password',
            for: 'newPassword',
            name: 'newPassword',
            required: true,
            minlength: 1,
            maxlength: 25,
            events: {
                blur: handleValidation,
                focus: handleValidation,
            },
        });

        const repeatPassword = new SettingsInput({
            placeholder: '•••••••••••',
            text: 'Повторите новый пароль',
            id: 'newPasswordRepeat',
            type: 'password',
            for: 'newPassword',
            name: 'newPassword',
            required: true,
            minlength: 1,
            maxlength: 25,
            events: {
                blur: handleValidation,
                focus: handleValidation,
            },
        });

        super({
            ...props,
            children: {
                oldPassword: oldPassword.content,
                newPassword: newPassword.content,
                repeatPassword: repeatPassword.content,
            },
        });
    }

    _updateUserInfo() {
        const {currentUser} = store.getState();
        (this.node.querySelector('img.profile__avatar') as HTMLImageElement)!.src = avatarUrlGenerator((currentUser as UserData).avatar);
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
        const form: HTMLFormElement = (
            this
                .node
                .querySelector('form.change__form') as HTMLFormElement
        );

        let isValid = false;

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                const passwords = Object.fromEntries(formData.entries());
                const inputs = form.querySelectorAll('input');

                isValid = validateForm(inputs);

                if (isValid) {
                    UserController.changePassword(passwords as unknown as PasswordData).then(() => {
                        Router.getInstance().go('/profile');
                    }).catch((e) => {
                        alert(e.reason);
                    })
                }
            });
        }

        const link = (
            this
                .node
                .querySelector('a.settings__push-back-button') as HTMLLinkElement
        );

        if (link) {
            link.addEventListener('click', () => {
                Router.getInstance().back()
            });
        }
    }
}
