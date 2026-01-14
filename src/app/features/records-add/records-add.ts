import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecordsService } from '../../core/services/records';
import { Router } from '@angular/router';
import { Record } from '../../core/models/record.models';

@Component({
  selector: 'app-records-add',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './records-add.html',
  styleUrl: './records-add.scss',
})
export class RecordsAddComponent {

  form: any;

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      title: ['', Validators.required],
      artist: ['', Validators.required],
      genre: ['', Validators.required],
      format: ['', Validators.required],
      releaseYear: [0, Validators.required],
      price: [0, Validators.required],
      stockQty: [0, Validators.required],
      customerId: ['', Validators.pattern(/^\d+{A-Za-z}$/)],
      customerFirstName: [''],
      customerLastName: [''],
      customerContact: ['', Validators.pattern(/^\d{8,}$/)],
      customerEmail: ['', Validators.email]
    });
  }

  constructor(
    private fb: FormBuilder,
    private recordService: RecordsService,
    private router: Router
  ) { }

  onSubmit() {
    if (this.form.invalid) return;

    const payload: Record = {
      id: 0,
      ...this.form.value
    };
    this.recordService.addRecord(payload).subscribe(() => {
      this.router.navigate(['/records']);
    });
  }

  cancel() {
    this.router.navigate(['/records']);
  }
}
