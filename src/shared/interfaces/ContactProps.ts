import {ComponentProps} from "./ComponentProps";

export interface ContactProps extends ComponentProps {
    image: string;
    alt: string;
    name?: string;
    messagePreview?: string;
    time?: string;
    count?: number;
}