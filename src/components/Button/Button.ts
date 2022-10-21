import { compile } from 'pug';
import Block from '../../core/Block';
import './Button.scss';
import { ButtonProps } from '../../shared/interfaces/ButtonProps';
import { classNames } from '../../shared/utils/classNames';

let template = 'button #{child}';

export default class Button extends Block implements ButtonProps {
  protected props: ButtonProps;

  get className(): string {
    return classNames('button', {
      link: this.props.secondary,
    }, []);
  }

  constructor(props: ButtonProps) {
    if (props.secondary) {
      template = 'a #{child}';
    }
    super(props);
  }

  render() {
    return compile(template)({
      child: this.props.child,
    });
  }
}
