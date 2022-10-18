import { compile } from 'pug';
import Block from '../../core/Block';
import { ComponentProps } from '../../shared/interfaces';
import './UserSettingsPage.scss';
import template from './UserSettingsPage.template';
import {SettingsInput} from "../../components/SettingsInput";
import {renderInDom} from "../../shared/utils";
import {MainPage} from "../MainPage";

export default class UserSettingsPage extends Block {
    constructor(props: ComponentProps) {

        const email = new SettingsInput({
            placeholder: 'pochta@yandex.ru',
            text: 'Почта',
            id: 'email',
            type: 'email',
            for: 'email',
            name: 'email'
        })

        const login = new SettingsInput({
            placeholder: 'ivanivanov',
            text: 'Логин',
            id: 'login',
            type: 'text',
            for: 'login',
            name: 'login'
        })

        const firstName = new SettingsInput({
            placeholder: 'Иван',
            text: 'Имя',
            id: 'first_name',
            type: 'text',
            for: 'first_name',
            name: 'first_name'
        })

        const secondName = new SettingsInput({
            placeholder: 'Иванов',
            text: 'Фамилия',
            id: 'second_name',
            type: 'text',
            for: 'second_name',
            name: 'second_name'
        })

        const displayName = new SettingsInput({
            placeholder: 'Иван',
            text: 'Имя в чате',
            id: 'display_name',
            type: 'text',
            for: 'display_name',
            name: 'display_name'
        })

        const phone = new SettingsInput({
            placeholder: '+7 (909) 967 30 30',
            text: 'Телефон',
            id: 'phone',
            type: 'phone',
            for: 'phone',
            name: 'phone'
        })

        super({
            ...props,
            children: {
                email: email.content,
                login: login.content,
                firstName: firstName.content,
                secondName: secondName.content,
                displayName: displayName.content,
                phone: phone.content
            },
        });
    }

    render() {
        return compile(template)();
    }

    protected customiseComponent() {
        const form: HTMLFormElement = (
            this
                .node
                .querySelector('form.settings__form') as HTMLFormElement
        );

        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(form);
                console.log(Object.fromEntries(formData.entries()));
            });
        }

        const link: HTMLLinkElement = (
            this
                .node
                .querySelector('a.settings__push-back-button') as HTMLLinkElement
        )

        if (link) {
            link.addEventListener('click', () => {
                renderInDom('#root', new MainPage({}));
            })
        }
    }
}
