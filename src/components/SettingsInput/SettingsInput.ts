import { compile } from 'pug';
import Block from '../../core/Block';
import './SettingsInput.scss';
import template from './SettingsInput.template';
import {SettingsInputProps} from "../../shared/interfaces/SettingsInputProps";

export default class SettingsInput extends Block implements SettingsInputProps {
    protected props: SettingsInputProps;

    protected get proplist() {
        return [
            { name: 'type', selector: '.inputStngs', attribute: 'type' },
            { name: 'placeholder', selector: '.inputStngs', attribute: 'placeholder' },
            { name: 'name', selector: '.inputStngs', attribute: 'name' },
            { name: 'for', selector: '.labelStngs', attribute: 'for' },
            { name: 'id', selector: '.inputStngs', attribute: 'id' },
            {
                name: 'text',
                selector: '.labelStngs',
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
