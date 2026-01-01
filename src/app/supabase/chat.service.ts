import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Chat {
  chatMessages(formValue: any) {
    throw new Error('Method not implemented.');
  }
  private supabase!: SupabaseClient;
  client: any;
  constructor() {
    this.supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
    )
  }

  async getMessages(): Promise<any[]> {
  if (!this.client) {
    return [];
  }

  const { data, error } = await this.client
    .from('messages')
    .select('*');

  if (error) throw error;
  return data ?? [];
}
  }


