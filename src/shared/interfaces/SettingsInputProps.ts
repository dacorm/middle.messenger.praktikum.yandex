import { ComponentProps } from './ComponentProps';

export interface SettingsInputProps extends ComponentProps {
    for?: string;
    text?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    id?: string
    maxlength?: number;
    minlength?: number;
}
