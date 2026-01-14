import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordsService } from '../../core/services/records';
import { Record } from '../../core/models/record.models';


@Component({
  selector: 'app-records-update',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './records-update.html',
  styleUrl: './records-update.scss',
})
export class RecordsUpdateComponent {

  form: any;

  record = signal<Record | null>(null);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private recordsService: RecordsService,
    private router: Router
  ) { }

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
      customerContact: ['',Validators.pattern(/^\d{8,}$/)],
      customerEmail: ['',Validators.email]
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.recordsService.getRecord(id).subscribe(r => {
      this.record.set(r);
      this.form.patchValue(r);
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const id = this.record()!.id;
    const updated: Record = {...this.record()!, ...this.form.value, id};

    this.recordsService.updateRecord(id, updated).subscribe(() => {
      this.router.navigate(['/records/view', id]);
    });
  }

  cancel() {
    this.router.navigate(['/records']);
  }

}
