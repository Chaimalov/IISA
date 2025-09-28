import { Prettify } from '@ngrx/signals';
import { ICustomFile } from 'file-input-accessor';
import { Tables } from '../lib/database.types';

export type Applicant = Tables<'applicants_with_age'>;
export type ApplicantData = Prettify<
  {
    avatar: ICustomFile;
  } & Omit<Tables<'applicants'>, keyof Pick<Tables<'applicants'>, 'created_at' | 'updated_at' | 'avatar'>>
>;
