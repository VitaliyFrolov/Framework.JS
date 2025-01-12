import { Dependency } from './Dependency';

export function reactive<T extends object>(obj: T): T {
    const dependency = new Dependency();

    const makeReactive = (value: any) =>
        typeof value === 'object' && value !== null ? reactive(value) : value;

    return new Proxy(obj, {
        get(target, key) {
            dependency.depend(key);
            return makeReactive(Reflect.get(target, key));
        },

        set(target, key, newValue) {
            const oldValue = Reflect.get(target, key);
            if (oldValue !== newValue) {
                Reflect.set(target, key, newValue);
                dependency.notify(key);
            }
            return true;
        }
    });
}
