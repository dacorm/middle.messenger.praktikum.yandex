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
            {
                name: "image",
                selector: ".message-image",
                attribute: "src",
                isValue: true
            }
        ];
    }

    protected customiseComponent() {
        const image = this.node.querySelector('img.message-image');
        const text = this.node.querySelector('p.message-text')

        if (image && text) {
            if (this.props.img && this.props.image) {
                image.classList.add('active');
                text.classList.add('inactive')
            }
        }
    }

    render() {
        return compile(template)({
            child: this.props.child,
        });
    }
}