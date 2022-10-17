import { compile } from 'pug';
import Block from '../../core/Block';
import './Info.scss';
import template from './Info.template';
import { InfoProps } from '../../shared/interfaces/InfoProps';
import { renderInDom } from '../../shared/utils';
import RegistrationPage from '../../pages/RegistrationPage';

export default class Input extends Block implements InfoProps {
  protected props: InfoProps;

  protected get proplist() {
    return [
      {
        name: 'message',
        selector: '.info__subtitle',
        attribute: 'innerText',
        isValue: true,
      },
      {
        name: 'error',
        selector: '.info__title',
        attribute: 'innerText',
        isValue: true,
      },
    ];
  }

  render() {
    return compile(template)({
      child: this.props.child,
    });
  }

  protected customiseComponent() {
    const button = (
            this
              .node
              .querySelector('a.info__link') as HTMLElement
    );
    if (button) {
      button.addEventListener('click', () => {
        renderInDom('#root', new RegistrationPage({}));
      });
    }
  }
}