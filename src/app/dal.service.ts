import { DataService } from '@angular-architects/ngrx-toolkit';
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Database } from '../lib/database.types';
import { Applicant } from './applicant';

type Filter = Pick<Applicant, 'full_name' | 'email' | 'phone_number'>;

@Injectable({
  providedIn: 'root',
})
export class DalService implements DataService<Applicant, Filter> {
  #supabase = createClient<Database>(environment.supabaseUrl, environment.supabaseKey);

  public async load(filter: Filter): Promise<Applicant[]> {
    return this.#supabase
      .from('applicants')
      .select('*')
      .then((response) => response.data);
  }

  public async loadById(id: number): Promise<Applicant> {
    return this.#supabase
      .from('applicants')
      .select('*')
      .eq('id', id)
      .single()
      .then((response) => response.data);
  }

  public async create(entity: Applicant): Promise<Applicant> {
    return this.#supabase
      .from('applicants')
      .insert(entity)
      .then((response) => response.data);
  }

  public async update(entity: Applicant): Promise<Applicant> {
    return this.#supabase
      .from('applicants')
      .update(entity)
      .eq('id', entity.id)
      .then((response) => response.data);
  }

  public async updateAll(entity: Applicant[]): Promise<Applicant[]> {
    return this.#supabase
      .from('applicants')
      .upsert(entity)
      .then((response) => response.data);
  }

  public async delete(entity: Applicant): Promise<void> {
    return this.#supabase
      .from('applicants')
      .delete()
      .eq('id', entity.id)
      .then(() => {});
  }
}
