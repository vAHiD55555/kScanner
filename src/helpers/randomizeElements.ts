export function randomizeElements<T>(arr: T[]): T[] {
    const result: T[] = [...arr];
    for (let i: number = result.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result.slice(0, 100);
}