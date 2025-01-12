import { WatchEffect } from "../../core/Reactivity/Effect";

export function useEffect<T>(fn: () => void | (() => void), dependencies: Array<T> = []) {
    let cleanup: (() => void) | undefined;
    let prevDependencies: Array<T> | undefined;

    WatchEffect(() => {
        const hasChanged =
            !prevDependencies ||
            dependencies.length !== prevDependencies.length ||
            dependencies.some((dep, i) => dep !== prevDependencies![i]);

        if (hasChanged) {
            if (cleanup) cleanup();

            const result = fn();

            if (typeof result === "function") {
                cleanup = result;
            }

            prevDependencies = [...dependencies];
        }
    });
}
