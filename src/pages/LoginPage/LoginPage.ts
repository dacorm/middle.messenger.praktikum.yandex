import { compile } from 'pug';
import Block from '../../core/Block';
import { ComponentProps } from '../../shared/interfaces';
import './LoginPage.scss';
import template from './LoginPage.template';
import { Input } from '../../components/Input';
import { renderInDom } from '../../shared/utils';
import { RegistrationPage } from '../RegistrationPage';

export default class LoginPage extends Block {
  constructor(props: ComponentProps) {
    const loginInput = new Input({
      placeholder: 'Логин',
      text: 'Логин',
      name: 'login',
      id: 'login',
      type: 'text',
      for: 'login',
    });

    const passwordInput = new Input({
      placeholder: 'Пароль',
      text: 'Пароль',
      name: 'password',
      id: 'password',
      type: 'password',
      for: 'password',
    });

    super({
      ...props,
      children: {
        loginInput: loginInput.content,
        passwordInput: passwordInput.content,
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
              .querySelector('form.login-form__container') as HTMLFormElement
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
              .querySelector('a.login-form__link') as HTMLLinkElement
    );

    if (link) {
      link.addEventListener('click', () => {
        renderInDom('#root', new RegistrationPage({}));
      });
    }
  }
}
