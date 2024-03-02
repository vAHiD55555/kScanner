export function randomizeElements<T>(arr: T[]) {
  return [...arr].sort(() => 0.5 - Math.random() );
}
