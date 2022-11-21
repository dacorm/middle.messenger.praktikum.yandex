import { compile } from 'pug';
import Block from '../../core/Block';
import { ComponentProps } from '../../shared/interfaces';
import './ChangeAvatarPage.scss';
import template from './ChangeAvatarPage.template';
import UserController from '../../controllers/UserController';
import Router from '../../shared/utils/Router';

export default class ChangeAvatarPage extends Block {
  constructor(props: ComponentProps) {
    super({
      ...props,
      children: {

      },
    });
  }

  render() {
    return compile(template)();
  }

  protected customiseComponent() {
    const form = (
            this
              .node
              .querySelector('form.overlay__popup') as HTMLFormElement
    );

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        UserController.updateAvatar(formData).then(() => {
          Router.getInstance().go('/profile');
        }).catch((e) => {
          alert(e.reason);
        });
      });
    }
  }
}
