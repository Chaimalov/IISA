export type RemoveNullOn<T, O extends keyof T = never> = {
  [P in keyof T]: P extends O ? Exclude<T[P], null> : T[P];
};

export type RemoveNullExcept<T, E extends keyof T = never> = {
  [P in keyof T]: P extends E ? T[P] : Exclude<T[P], null>;
};

export type CamelCase<S extends string, D extends string = ' ' | '_' | '-'> = S extends `${infer T}${D}${infer U}`
  ? `${Lowercase<T>}${Capitalize<CamelCase<U>>}`
  : Lowercase<S>;
