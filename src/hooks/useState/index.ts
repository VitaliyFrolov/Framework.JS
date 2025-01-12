import { reactive } from "../../core/Reactivity";

export function useState<T>(initialValue: T): [() => T, (newValue: T) => void] {
    const state = reactive({ value: initialValue });

    const getState = () => state.value;
    const setState = (newValue: T) => {
        state.value = newValue;
    };

    return [getState, setState];
}
