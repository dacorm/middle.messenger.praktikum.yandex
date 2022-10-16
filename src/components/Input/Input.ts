import { compile } from 'pug';
import Block from '../../core/Block';
import './Input.scss';
import { InputProps } from '../../assets/interfaces';
import template from './Input.template';

export default class Input extends Block implements InputProps {
  protected props: InputProps;

  protected get proplist() {
    return [
      { name: 'type', selector: '.input', attribute: 'type' },
      { name: 'placeholder', selector: '.input', attribute: 'placeholder' },
      { name: 'name', selector: '.input', attribute: 'name' },
      { name: 'for', selector: '.label', attribute: 'for' },
      { name: 'id', selector: '.input', attribute: 'id' },
      {
        name: 'text',
        selector: '.label',
        attribute: 'innerText',
        isValue: true,
      },
      {
        name: 'errorMessage',
        selector: '.span',
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
    const input = this.node.querySelector('input');
    if (input) {
      this.eventEmitter.node = input;
    }
  }
}
