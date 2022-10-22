export type EventEmitterFunc = (eventName: string, callback: (e: Event) => void) => void

export interface EventEmitterProps {
    add: EventEmitterFunc,
    remove: EventEmitterFunc,
    clear: () => void,
}
