export interface EventEmitter {
    add(eventName: string, callback: (e: Event) => void): void;
    remove(eventName: string, callback: (e: Event) => void): void;
    clear(): void;
}
