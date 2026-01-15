import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from '../models/record.models';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  private baseUrl = 'https://recordshop-css.onrender.com/api';
  private formatsUrl = 'https://recordshop-css.onrender.com/api';
  private genresUrl = 'https://recordshop-css.onrender.com/api';

  constructor(private http: HttpClient) {}

  getRecords() {
    return this.http.get<Record[]>(this.baseUrl);
  }

  getRecord(id: number) {
    return this.http.get<Record>(`${this.baseUrl}/${id}`);
  }

  addRecord(record: Record) {
    return this.http.post(this.baseUrl, record);
  }

  updateRecord(id: number, record: Record) {
    return this.http.put(`${this.baseUrl}/${id}`, record);
  }

  deleteRecord(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getFormats() {
    return this.http.get<string[]>(this.formatsUrl);
  }

  getGenres() {
    return this.http.get<string[]>(this.genresUrl);
  }
}
