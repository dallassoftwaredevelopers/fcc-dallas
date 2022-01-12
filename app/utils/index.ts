export const isDefined = <T>(value: T): value is NonNullable<T> =>
  value != null;

export const applyIfTrue = (condition: boolean, ...classNames: string[]) =>
  condition ? classNames.join("") : "";
