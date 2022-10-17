import Block from "../../core/Block";
import { compile } from "pug";
import template from './Message.template';
import "./Message.scss";
import {classNames} from "../../shared/utils/classNames";
import {MessageProps} from "../../shared/interfaces/MessageProps";


export default class Message extends Block implements MessageProps {
    props: MessageProps;

    get className(): string {
        return classNames("message", {
            "message_my": this.props.my,
            "message_image": this.props.img,
        }, []);
    }

    protected get proplist() {
        return [
            {
                name: "text",
                selector: ".message-text",
                attribute: "innerText",
                isValue: true,
            },
            {
                name: "time",
                selector: ".message-time",
                attribute: "innerText",
                isValue: true,
            },
        ];
    }

    protected customiseComponent() {

    }

    render() {
        return compile(template)({
            child: this.props.child,
        });
    }
}