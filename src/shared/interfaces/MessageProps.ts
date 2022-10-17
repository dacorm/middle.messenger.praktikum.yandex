import {ComponentProps} from "./ComponentProps";

export interface MessageProps extends ComponentProps {
    text?: string;
    time?: string;
}