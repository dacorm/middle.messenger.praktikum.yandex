import { ComponentProps } from './ComponentProps';

export interface InfoProps extends ComponentProps {
    error?: string;
    message?: string;
}
