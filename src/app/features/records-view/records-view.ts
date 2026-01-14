import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { StockStatusPipe } from '../../shared/pipes/stock-status-pipe';
import { Record } from '../../core/models/record.models';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordsService } from '../../core/services/records';

@Component({
  selector: 'app-records-view',
  standalone: true,
  imports: [CommonModule, StockStatusPipe],
  templateUrl: './records-view.html',
  styleUrl: './records-view.scss',
})

export class RecordsViewComponent {

  record = signal<Record | null>(null);

  constructor(
    private route: ActivatedRoute,
    private recordsService: RecordsService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recordsService.getRecord(id).subscribe(r => this.record.set(r));
  }

  back() {
    this.router.navigate(['/records']);
  }

  canUpdate() {
    const role = this.auth.getRole();
    return role === 'manager' || role === 'admin';
  }

  canDelete() {
    const role = this.auth.getRole();
    return role === 'admin';
  }

  update() {
    this.router.navigate(['/records/update', this.record()!.id]);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this record?')) {
      return;
    }


    this.recordsService.deleteRecord(this.record()!.id).subscribe(() => {
      this.router.navigate(['/records']);
        this.record.set(null);
      });
  }
}