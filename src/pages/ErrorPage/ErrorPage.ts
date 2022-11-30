import compile from '../../pug';
import Block from '../../core/Block';
import { ComponentProps } from '../../shared/interfaces';
import './ErrorPage.scss';
import template from './ErrorPage.template';
import { Info } from '../../components/Info';

interface InfoOptions {
    error: string;
    message: string
}

export default class ErrorPage extends Block {
  constructor(props: ComponentProps, options: InfoOptions) {
    const ErrorInfo = new Info({
      error: options.error,
      message: options.message,
    });

    super({
      ...props,
      children: {
        ErrorInfo: ErrorInfo.content,
      },
    });
  }

  render() {
    return compile(template)();
  }
}
