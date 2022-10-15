export interface IComponentProps {
    [key: string]: any;
    className?: string;
    children?: {};
    child?: IChild | HTMLElement | string;
    events?: Record<string, (...args: any) => void>;
}

interface IChild {
    name: string;
    node: HTMLElement;
}