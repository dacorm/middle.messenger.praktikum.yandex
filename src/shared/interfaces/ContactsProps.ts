import { ComponentProps } from './ComponentProps';
import { ChatData } from '../../store/Store';

export interface ContactsProps extends ComponentProps {
    items?: ChatData[]
}
