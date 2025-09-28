import { DataService } from '@angular-architects/ngrx-toolkit';
import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';
import { Database } from '../lib/database.types';
import { Applicant, ApplicantData } from './applicant';
import { Observable, Observer } from 'rxjs';
import { ICustomFile } from 'file-input-accessor';

type Filter = Pick<Applicant, 'full_name' | 'email' | 'phone_number'>;

@Injectable({
  providedIn: 'root',
})
export class DalService implements DataService<Applicant | ApplicantData, Filter> {
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
      .then((response) => response.data!);
  }

  public async loadById(id: string): Promise<Applicant> {
    return this.#supabase
      .from('applicants_with_age')
      .select('*')
      .eq('id', id)
      .single()
      .then((response) => response.data!);
  }

  public async create(entity: ApplicantData): Promise<Applicant> {
    const path = await this.uploadImage(entity.avatar, entity.email);

    return this.#supabase
      .from('applicants')
      .insert({ ...entity, avatar: path })
      .then((response) =>
        this.#supabase
          .from('applicants_with_age')
          .select('*')
          .eq('email', entity.email)
          .single()
          .then((response) => response.data!),
      );
  }

  public async update(entity: ApplicantData): Promise<Applicant> {
    const path = await this.uploadImage(entity.avatar, entity.email);

    return this.#supabase
      .from('applicants')
      .update({ ...entity, avatar: path })
      .eq('id', entity.id)
      .then((response) => response.data!);
  }

  public async updateAll(entity: any[]): Promise<Applicant[]> {
    return this.#supabase
      .from('applicants')
      .upsert(entity)
      .then((response) => response.data!);
  }

  public async delete(entity: Applicant): Promise<void> {
    return this.#supabase
      .from('applicants')
      .delete()
      .eq('id', entity.id)
      .then(() => {});
  }

  private async uploadImage(file: ICustomFile | undefined, userId: string): Promise<string | undefined> {
    if (!file) return;

    const fileExt = file.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error } = await this.#supabase.storage.from('Avatars').upload(filePath, file, {
      upsert: true,
    });

    if (error) {
      console.error('Error uploading avatar:', error.message);
      return;
    }

    return this.#supabase.storage.from('Avatars').getPublicUrl(filePath).data.publicUrl;
  }
}
