import Block from "../../core/Block";
import { compile } from "pug";
import template from "./MainPage.template";
import "./MainPage.scss";
import {ComponentProps} from "../../shared/interfaces";
import {renderInDom} from "../../shared/utils";
import {LoginPage} from "../LoginPage";
import {RegistrationPage} from "../RegistrationPage";
import {ErrorPage} from "../ErrorPage";
import {Button} from "../../components/Button";

export default class MainPage extends Block {
    constructor(props: ComponentProps) {

        const loginButton = new Button({
            child: 'Login page',
            secondary: true,
            events: {
                click: () => {
                    renderInDom('#root', new LoginPage({}))
                },
            },
        });

        const registrationButton = new Button({
            child: 'Registration page',
            secondary: true,
            events: {
                click: () => {
                    renderInDom('#root', new RegistrationPage({}))
                },
            },
        });

        const err404 = new Button({
            child: '404 error page',
            secondary: true,
            events: {
                click: () => {
                    renderInDom('#root', new ErrorPage({}, {
                        error: '404',
                        message: 'Не туда попали'
                    }))
                },
            },
        });

        const err500 = new Button({
            child: '500 error page',
            secondary: true,
            events: {
                click: () => {
                    renderInDom('#root', new ErrorPage({}, {
                        error: '500',
                        message: 'Мы уже фиксим'
                    }))
                },
            },
        });

        super({
            ...props,
            children: {
                registerPage: registrationButton.content,
                loginPage: loginButton.content,
                404: err404.content,
                500: err500.content,
            },
        });
    }

    render() {
        return compile(template)();
    }
}