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
import ChatPage from '../ChatPage/ChatPage';
import { UserSettingsPage } from '../UserSettingsPage';
import { ChangePasswordPage } from '../ChangePasswordPage';
import { ChangeAvatarPage } from '../ChangeAvatarPage';

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

    const userSettings = new Button({
      child: 'userSettings',
      secondary: true,
      events: {
        click: () => {
          renderInDom('#root', new UserSettingsPage({}));
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

    const changePass = new Button({
      child: 'change password',
      secondary: true,
      events: {
        click: () => {
          renderInDom('#root', new ChangePasswordPage({}));
        },
      },
    });

    const changeAvatar = new Button({
      child: 'change avatar',
      secondary: true,
      events: {
        click: () => {
          renderInDom('#root', new ChangeAvatarPage({}));
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
        userSettings: userSettings.content,
        chat: chat.content,
        changePassword: changePass.content,
        changeAvatar: changeAvatar.content,
      },
    });
  }

  render() {
    return compile(template)();
  }
}
