export function useMemo<T>(factory: () => T, dependencies: Array<any>): () => T {
    let value: T;
    let prevDependencies: Array<any> | undefined;

    return () => {
        const hasChanged =
            !prevDependencies || 
            dependencies.length !== prevDependencies.length ||
            dependencies.some((dep, i) => dep !== prevDependencies![i]);

        if (hasChanged) {
            value = factory(); 
            prevDependencies = [...dependencies];
        }

        return value;
    };
}
