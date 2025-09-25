import { DataService } from '@angular-architects/ngrx-toolkit';
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Database } from '../lib/database.types';
import { Applicant, ApplicantData } from './applicant';
import { Observable, Observer } from 'rxjs';

type Filter = Pick<Applicant, 'full_name' | 'email' | 'phone_number'>;

@Injectable({
  providedIn: 'root',
})
export class DalService implements DataService<Applicant, Filter> {
  #supabase = createClient<Database>(environment.supabaseUrl, environment.supabaseKey);

  public listen(): Observable<Applicant> {
    return new Observable((observer: Observer<Applicant>) => {
      this.#supabase
        .channel('public')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'applicants' }, (payload) => {
          observer.next(payload.new as Applicant);
        })
        .subscribe();

      return () => {
        this.#supabase.removeChannel(this.#supabase.channel('public'));
      };
    });
  }

  public async load(filter: Filter): Promise<Applicant[]> {
    return this.#supabase
      .from('applicants_with_age')
      .select('*')
      .then((response) => response.data);
  }

  public async loadById(id: number): Promise<Applicant> {
    return this.#supabase
      .from('applicants_with_age')
      .select('*')
      .eq('id', id)
      .single()
      .then((response) => response.data);
  }

  public async create(entity: ApplicantData): Promise<Applicant> {
    return this.#supabase
      .from('applicants_with_age')
      .insert(entity)
      .then((response) => response.data);
  }

  public async update(entity: ApplicantData): Promise<Applicant> {
    return this.#supabase
      .from('applicants_with_age')
      .update(entity)
      .eq('id', entity.id)
      .then((response) => response.data);
  }

  public async updateAll(entity: ApplicantData[]): Promise<Applicant[]> {
    return this.#supabase
      .from('applicants_with_age')
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
