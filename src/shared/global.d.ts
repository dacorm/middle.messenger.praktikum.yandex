export {};

declare global {
    interface Window {
        pug: {
            compile: any
        }
    }
}
