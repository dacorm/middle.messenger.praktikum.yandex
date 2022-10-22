interface Child {
    name: string;
    node: HTMLElement;
}

export interface ComponentProps {
    [key: string]: any;
    className?: string;
    children?: {};
    child?: Child | HTMLElement | string;
    events?: Record<string, (...args: any) => void>;
}
