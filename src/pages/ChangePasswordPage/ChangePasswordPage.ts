import { compile } from 'pug';
import Block from '../../core/Block';
import { ComponentProps } from '../../shared/interfaces';
import './ChangePasswordPage.scss';
import template from './ChangePasswordPage.template';
import { SettingsInput } from '../../components/SettingsInput';
import { renderInDom } from '../../shared/utils';
import { MainPage } from '../MainPage';
import { validate, validateForm } from '../../shared/utils/validation';

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
        blur: (e: any) => {
          validate({ hasError: 'hasError' }, e.target);
        },
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
        blur: (e: any) => {
          validate({ hasError: 'hasError' }, e.target);
        },
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
        blur: (e: any) => {
          validate({ hasError: 'hasError' }, e.target);
        },
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
        console.log(Object.fromEntries(formData.entries()));
        const inputs = form.querySelectorAll('input');

        isValid = validateForm(inputs);
        console.log(isValid ? 'Форма валидна' : 'Форма не валидна');
      });
    }

    const link: HTMLLinkElement = (
            this
              .node
              .querySelector('a.settings__push-back-button') as HTMLLinkElement
    );

    if (link) {
      link.addEventListener('click', () => {
        renderInDom('#root', new MainPage({}));
      });
    }
  }
}
