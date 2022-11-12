import {compile} from 'pug';
import Block from '../../core/Block';
import {ComponentProps} from '../../shared/interfaces';
import './RegistrationPage.scss';
import template from './RegistrationPage.template';
import {Input} from '../../components/Input';
import {handleValidation, validateForm} from '../../shared/utils/validation';
import Router from "../../shared/utils/Router";
import AuthController from "../../controllers/AuthController";
import {SignUpData} from "../../services/api/AuthAPI";

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
        blur: handleValidation,
        focus: handleValidation,
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
      minlength: 3,
      maxlength: 20,
      events: {
        blur: handleValidation,
        focus: handleValidation,
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
      events: {
        blur: handleValidation,
        focus: handleValidation,
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
      events: {
        blur: handleValidation,
        focus: handleValidation,
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
      maxlength: 15,
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
      minlength: 8,
      maxlength: 40,
      events: {
        blur: handleValidation,
        focus: handleValidation,
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
      minlength: 8,
      maxlength: 40,
      events: {
        blur: handleValidation,
        focus: handleValidation,
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
        const data = Object.fromEntries(formData.entries());
        const inputs = form.querySelectorAll('input');

        isValid = validateForm(inputs);
        if (isValid) {
          AuthController.signUp(data as unknown as SignUpData)
              .then((res) => {
                console.log(res)
              }).catch((e) => {
            alert(e);
          })
        }
      });
    }

    const link: HTMLLinkElement = (
        this
          .node
          .querySelector('a.register-form__link') as HTMLLinkElement
    );

    if (link) {
      link.addEventListener('click', () => {
        Router.getInstance().go('/');
      });
    }
  }
}
