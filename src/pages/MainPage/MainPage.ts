import { compile } from 'pug';
import Block from '../../core/Block';
import template from './MainPage.template';
import './MainPage.scss';
import { ComponentProps } from '../../shared/interfaces';
import { renderInDom } from '../../shared/utils';
import { LoginPage } from '../LoginPage';
import { RegistrationPage } from '../RegistrationPage';
import { ErrorPage } from '../ErrorPage';
import { Button } from '../../components/Button';
import {Contact} from "../../components/Contact";
import ChatPage from "../ChatPage/ChatPage";

export default class MainPage extends Block {
  constructor(props: ComponentProps) {
    const loginButton = new Button({
      child: 'Login page',
      secondary: true,
      events: {
        click: () => {
          renderInDom('#root', new LoginPage({}));
        },
      },
    });

    const registrationButton = new Button({
      child: 'Registration page',
      secondary: true,
      events: {
        click: () => {
          renderInDom('#root', new RegistrationPage({}));
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
            message: 'Не туда попали',
          }));
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
            message: 'Мы уже фиксим',
          }));
        },
      },
    });

    const test = new Button({
      child: 'test',
      secondary: true,
      events: {
        click: () => {
          renderInDom('#root', new Contact({
            src: 'https://travel-baikal.com/bitrix/templates/.default/components/bitrix/news.list/reviews/img/logo.jpg',
            alt: 'Аватарка',
            name: 'Илья',
            messagePreview: 'Друзья, у меня для вас особенный выпуск новостей!...',
            time: '15:12',
            yours: true,
            active: true,
          }));
        },
      },
    });

    const chat = new Button({
      child: 'chat',
      secondary: true,
      events: {
        click: () => {
          renderInDom('#root', new ChatPage({}));
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
        test: test.content,
        chat: chat.content,
      },
    });
  }

  render() {
    return compile(template)();
  }
}
