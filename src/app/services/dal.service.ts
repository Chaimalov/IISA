import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { ICustomFile } from 'file-input-accessor';
import { Observable, Observer } from 'rxjs';
import { v4 } from 'uuid';
import { environment } from '../../environments/environment';
import { Database } from '../../lib/database.types';
import { Applicant, Application } from '../../lib/applicant.types';

type Filter = Pick<Applicant, 'full_name' | 'email' | 'phone_number' | 'age'>;

@Injectable({
  providedIn: 'root',
})
export class DalService {
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

  public async load(filter?: Filter): Promise<Applicant[]> {
    let query = this.#supabase.from('applicants_with_age').select('*');

    if (filter) {
      query = query
        .filter('full_name', 'ilike', `%${filter.full_name}%`)
        .filter('email', 'ilike', `%${filter.email}%`)
        .filter('phone_number', 'ilike', `%${filter.phone_number}%`);
    }

    return query
      .order('created_at')
      .overrideTypes<Applicant[]>()
      .then(({ data, error }) => {
        if (error) throw error;

        return data;
      });
  }

  public async loadByEmail(email: Applicant['email']): Promise<Applicant> {
    return this.#supabase
      .from('applicants_with_age')
      .select('*')
      .eq('email', email)
      .single()
      .overrideTypes<Applicant>()
      .then(({ data, error }) => {
        if (error) {
          switch (error.code) {
            case 'PGRST116':
              throw new Error('No application found for this email.');

            default:
              throw new Error(error.message, error);
          }
        }

        return data;
      });
  }

  public async create(entity: Application): Promise<Applicant> {
    const { error } = await this.#supabase.from('applicants').insert(entity);

    if (error) throw error;

    return this.loadByEmail(entity.email);
  }

  public async update(entity: Application & Pick<Applicant, 'id'>): Promise<Applicant> {
    const { error } = await this.#supabase.from('applicants').update(entity).eq('id', entity.id);

    if (error) throw error;

    return this.loadByEmail(entity.email);
  }

  public async updateAll(entity: Application[]): Promise<Applicant[]> {
    const { error } = await this.#supabase.from('applicants').upsert(entity);
    if (error) throw error;

    return this.load();
  }

  public async delete(entity: Applicant): Promise<void> {
    return this.#supabase.from('applicants').delete().eq('id', entity.id).then();
  }

  public async uploadImage(file: ICustomFile): Promise<string | null> {
    const fileExt = file.name.split('.').pop();
    const filePath = `${v4()}/avatar.${fileExt}`;

    const { error } = await this.#supabase.storage.from('avatars').upload(filePath, file, {
      upsert: true,
    });

    if (error) {
      console.error('Error uploading avatar:', error.message);
      return null;
    }

    return this.#supabase.storage.from('avatars').getPublicUrl(filePath).data.publicUrl;
  }
}
