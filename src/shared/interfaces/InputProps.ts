import { ComponentProps } from './ComponentProps';

export interface InputProps extends ComponentProps {
    for?: string;
    id?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    text?: string;
    errorMessage?: string
}
