import { ComponentProps } from './ComponentProps';

export interface MessageProps extends ComponentProps {
    text?: string;
    time?: string;
}

export interface StoreMessageProps {
    isMyMessage: boolean;
    messageText: string;
    messageDate?: string;
    messageTime?: string;
}