import { activeEffect } from './Effect';

export class Dependency {
    private dependencies: Map<string | symbol, Set<Function>>;

    constructor() {
        this.dependencies = new Map();
    }

    depend(key: string | symbol) {
        if (activeEffect) {
            if (!this.dependencies.has(key)) {
                this.dependencies.set(key, new Set());
            }
            this.dependencies.get(key)!.add(activeEffect);
        }
    }

    notify(key: string | symbol) {
        const subscribers = this.dependencies.get(key);
        if (subscribers) {
            subscribers.forEach((subscriber) => subscriber());
        }
    }
}
