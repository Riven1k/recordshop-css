import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Record } from '../models/record.models';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getRecords() {
    return this.http.get<Record[]>(`${this.API_URL}/records`);
  }

  deleteRecord(id: number) {
    return this.http.delete(`${this.API_URL}/records/${id}`);
  }

  getRecord(id: number) {
    return this.http.get<Record>(`${this.API_URL}/records/${id}`);
  }

  updateRecord(id: number, record: Record) {
    return this.http.put(`${this.API_URL}/records/${id}`, record);
  }

  addRecord(record: Record) {
    return this.http.post(`${this.API_URL}/records`, record);
  }
  
}
