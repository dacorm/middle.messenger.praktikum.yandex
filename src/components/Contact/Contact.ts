import Block from "../../core/Block";
import { compile } from "pug";
import template from './Contact.template';
import "./Contact.scss";
import {ContactProps} from "../../shared/interfaces/ContactProps";

export default class Contact extends Block {
    props: ContactProps;

    protected get proplist() {
        return [
            {
                name: "src",
                selector: ".message__avatar",
                attribute: "src"
            },
            {
                name: "alt",
                selector: ".message__avatar",
                attribute: "alt"
            },
            {
                name: "name",
                selector: ".message__username",
                attribute: "innerText",
                isValue: true,
            },
            {
                name: "messagePreview",
                selector: ".message__message-text",
                attribute: "innerText",
                isValue: true,
            },
            {
                name: "time",
                selector: ".message__time",
                attribute: "innerText",
                isValue: true,
            },
            {
                name: "count",
                selector: ".message__unread-text",
                attribute: "innerText",
                isValue: true,
            },
        ];
    }

    protected customiseComponent() {
        const counter = this.node.querySelector(".message__unread");
        if (counter) {
            if (this.props.count && this.props.count > 0) {
                counter.classList.add("active");
            }
        }
    }

    render() {
        return compile(template)({
            child: this.props.child,
        });
    }
}