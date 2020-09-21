export type GenericCallback = (...args: any[]) => void;

export type EventsObj<T> = { [key in keyof T]: GenericCallback };

export class Events<T extends EventsObj<T>, K extends keyof T> {
    constructor(public events: { [key in K]: T[K][] }) {}

    on = (eventName: K, callback: T[K]): void => {
        const callbacks = this.events[eventName] || [];
        callbacks.push(callback);
        this.events[eventName] = callbacks;
    };

    trigger = (eventName: K, ...args: Parameters<T[K]>): void => {
        const callbacks = this.events[eventName] || [];

        callbacks.forEach((callback) => {
            callback(...args);
        });
    };

    removeAll = (): void => {
        for (let eventName in this.events) this.events[eventName] = [];
    };

    remove = (eventName: K): void => {
        this.events[eventName] = [];
    };
}
