import { compile } from 'pug';
import Block from '../../core/Block';
import { ComponentProps } from '../../shared/interfaces';
import './RegistrationPage.scss';
import template from './RegistrationPage.template';
import { Input } from '../../components/Input';
import { renderInDom } from '../../shared/utils';
import { LoginPage } from '../LoginPage';
import { validate, validateForm } from '../../shared/utils/validation';

export default class RegistrationPage extends Block {
  constructor(props: ComponentProps) {
    const emailInput = new Input({
      placeholder: 'Почта',
      text: 'Почта',
      name: 'email',
      id: 'email',
      type: 'email',
      for: 'email',
      required: true,
      minlength: 1,
      maxlength: 25,
      events: {
        blur: (e: any) => {
          validate({ hasError: 'hasError' }, e.target);
        },
      },
    });

    const loginInput = new Input({
      placeholder: 'Логин',
      text: 'Логин',
      name: 'login',
      id: 'login',
      type: 'text',
      for: 'login',
      required: true,
      minlength: 1,
      maxlength: 25,
      events: {
        blur: (e: any) => {
          validate({ hasError: 'hasError' }, e.target);
        },
      },
    });

    const firstNameInput = new Input({
      placeholder: 'Имя',
      text: 'Имя',
      name: 'first_name',
      id: 'first_name',
      type: 'text',
      for: 'first_name',
      required: true,
      minlength: 1,
      maxlength: 25,
      events: {
        blur: (e: any) => {
          validate({ hasError: 'hasError' }, e.target);
        },
      },
    });

    const secondNameInput = new Input({
      placeholder: 'Фамилия',
      text: 'Фамилия',
      name: 'second_name',
      id: 'second_name',
      type: 'text',
      for: 'second_name',
      required: true,
      minlength: 1,
      maxlength: 25,
      events: {
        blur: (e: any) => {
          validate({ hasError: 'hasError' }, e.target);
        },
      },
    });

    const phoneInput = new Input({
      placeholder: 'Номер телефона',
      text: 'Номер телефона',
      name: 'phone',
      id: 'phone',
      type: 'tel',
      for: 'phone',
      required: true,
      minlength: 1,
      maxlength: 12,
      events: {
        blur: (e: any) => {
          validate({ hasError: 'hasError' }, e.target);
        },
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
      minlength: 1,
      maxlength: 25,
      events: {
        blur: (e: any) => {
          validate({ hasError: 'hasError' }, e.target);
        },
      },
    });

    const passwordConfirmInput = new Input({
      placeholder: 'Пароль',
      text: 'Пароль (ещё раз)',
      id: 'password_confirm',
      type: 'password',
      name: 'password_confirm',
      for: 'password_confirm',
      required: true,
      minlength: 1,
      maxlength: 25,
      events: {
        blur: (e: any) => {
          validate({ hasError: 'hasError' }, e.target);
        },
      },
    });

    super({
      ...props,
      children: {
        emailInput: emailInput.content,
        loginInput: loginInput.content,
        firstNameInput: firstNameInput.content,
        secondNameInput: secondNameInput.content,
        phoneInput: phoneInput.content,
        passwordInput: passwordInput.content,
        passwordConfirmInput: passwordConfirmInput.content,
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
          .querySelector('form.register-form__container') as HTMLFormElement
    );

    let isValid = false;

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        console.log(Object.fromEntries(formData.entries()));
        const inputs = form.querySelectorAll('input');

        isValid = validateForm(inputs);
        console.log(isValid ? 'Форма валидна' : 'Форма не валидна');
      });
    }

    const link: HTMLLinkElement = (
        this
          .node
          .querySelector('a.register-form__link') as HTMLLinkElement
    );

    if (link) {
      link.addEventListener('click', () => {
        renderInDom('#root', new LoginPage({}));
      });
    }
  }
}
