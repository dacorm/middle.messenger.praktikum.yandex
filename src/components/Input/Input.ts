import compile from '../../pug';
import Block from '../../core/Block';
import './Input.scss';
import { InputProps } from '../../shared/interfaces';
import template from './Input.template';

export default class Input extends Block implements InputProps {
  props: InputProps;

  protected get proplist() {
    return [
      { name: 'type', selector: '.inputComp', attribute: 'type' },
      { name: 'placeholder', selector: '.inputComp', attribute: 'placeholder' },
      { name: 'name', selector: '.inputComp', attribute: 'name' },
      { name: 'for', selector: '.labelComp', attribute: 'for' },
      { name: 'id', selector: '.inputComp', attribute: 'id' },
      { name: 'required', selector: '.inputComp', attribute: 'required' },
      { name: 'minlength', selector: '.inputComp', attribute: 'minlength' },
      { name: 'maxlength', selector: '.inputComp', attribute: 'maxlength' },
      {
        name: 'text',
        selector: '.labelComp',
        attribute: 'innerText',
        isValue: true,
      },
      {
        name: 'errorMessage',
        selector: '.spanComp',
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
