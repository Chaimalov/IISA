import { Tables } from './database.types';
import { RemoveNullExcept } from './helpers.types';

type Nullables<T> = {
  [P in keyof T]: null extends T[P] ? P : never;
}[keyof T];

export type Applicant = RemoveNullExcept<Tables<'applicants_with_age'>, Nullables<Tables<'applicants'>>>;

export type Application = Omit<
  Tables<'applicants'>,
  keyof Pick<Tables<'applicants'>, 'id' | 'created_at' | 'updated_at'>
>;
