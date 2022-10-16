import { IComponentProps } from './IComponentProps';

export interface InputProps extends IComponentProps {
    for?: string;
    id?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    text?: string;
    errorMessage?: string
}
