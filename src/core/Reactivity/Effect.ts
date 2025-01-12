const effectStack: Function[] = [];
export let activeEffect: Function | null = null;

export function WatchEffect(fn: Function) {
    effectStack.push(fn);
    activeEffect = fn;

    fn();

    effectStack.pop();
    activeEffect = effectStack[effectStack.length - 1] || null;
}
