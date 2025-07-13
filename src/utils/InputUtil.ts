export function onChange<T extends object>(
    model: T,
    path: string,
    value: any
): T {
    const keys = path.split(".");
    const newModel = structuredClone(model); // Deep copy to avoid mutation

    let current: any = newModel;
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current)) {
            throw new Error(`Invalid path: ${path}`);
        }
        current = current[key];
    }

    current[keys[keys.length - 1]] = value;
    return newModel;
}
