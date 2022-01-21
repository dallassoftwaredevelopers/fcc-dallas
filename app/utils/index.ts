export const isDefined = <T>(value: T): value is NonNullable<T> => value != null;

export const areAllDefined = (...args: unknown[]): boolean => args.every(isDefined);

export const applyIfTrue = (condition: boolean, ...classNames: string[]) =>
  condition ? classNames.join('') : '';
