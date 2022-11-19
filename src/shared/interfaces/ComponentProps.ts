interface Child {
    name: string;
    node: HTMLElement;
}

export interface ComponentProps {
    attributes?: Record<string, string>;
    className?: string;
    children?: any;
    child?: Child | HTMLElement | string;
    events?: Record<string, (...args: any) => void>;
    [key: string]: any;

}
