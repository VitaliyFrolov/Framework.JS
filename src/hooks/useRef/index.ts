import { reactive } from "../../core/Reactivity";

export function useRef<T>(initialValue: T): { current: T } {
    return reactive({ current: initialValue });
}