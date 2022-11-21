import { compile } from 'pug';
import Block from '../../core/Block';
import { ComponentProps } from '../../shared/interfaces';
import './LoginPage.scss';
import template from './LoginPage.template';
import { handleValidation, validateForm } from '../../shared/utils/validation';
import { Input } from '../../components/Input';
import Router from '../../shared/utils/Router';
import AuthController from '../../controllers/AuthController';
import { SignInData } from '../../services/api/AuthAPI';

export default class LoginPage extends Block {
  constructor(props: ComponentProps) {
    const loginInput = new Input({
      placeholder: 'Логин',
      text: 'Логин',
      name: 'login',
      id: 'login',
      type: 'text',
      for: 'login',
      required: true,
      events: {
        blur: handleValidation,
        focus: handleValidation,
      },
    });

    const passwordInput = new Input({
      placeholder: 'Пароль',
      text: 'Пароль',
      name: 'password',
      id: 'password',
      type: 'password',
      for: 'password',
      required: true,
      events: {
        blur: handleValidation,
        focus: handleValidation,
      },
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

    let isValid = false;

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        const inputs = form.querySelectorAll('input');

        isValid = validateForm(inputs);

        if (isValid) {
          AuthController.signIn(data as unknown as SignInData).then(() => {
            Router.getInstance().go('/messenger');
          }).catch((e) => {
            alert(e.reason);
          });
        }
      });
    }

    const link: HTMLLinkElement = (
            this
              .node
              .querySelector('a.login-form__link') as HTMLLinkElement
    );

    if (link) {
      link.addEventListener('click', () => {
        Router.getInstance().go('/sign-up');
      });
    }
  }
}
