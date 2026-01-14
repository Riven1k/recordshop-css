import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsService } from '../../core/services/records';
import { Record } from '../../core/models/record.models';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { autoTable} from 'jspdf-autotable';
import * as xlsx from 'xlsx';

@Component({
  selector: 'records-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './records-list.html',
  styleUrl: './records-list.scss',
})

export class RecordsListComponent implements OnInit {

  records = signal<Record[]>([]);

  genreColors: any = {
    'Rock': '#E74C3C',
    'Pop': '#F1C40F',
    'Jazz': '#3498DB',
    'Hip-Hop': '#9B59B6',
    'Classical': '#2ECC71',
    'Electronic': '#E67E22'
  };

  constructor(
    private recordsService: RecordsService,
    private auth: AuthService,
    private router: Router
  ) {}

  canUpdate() {
    const role = this.auth.getRole();
    return role === 'manager' || role === 'admin';
  }

  canDelete() {
    const role = this.auth.getRole();
    return role === 'admin';
  }

  onView(id: number){
    this.router.navigate(['/records/view', id]);
  }

  onUpdate(id: number){
    this.router.navigate(['/records/update', id]);
  }

  onDelete(id: number){
    if(!confirm('Are you sure you want to delete this record?')) {
      return;
    }

    this.recordsService.deleteRecord(id).subscribe(() => {
      this.recordsService.getRecords().subscribe(data => {
        this.records.set(data);
      });
    });
  }

  ngOnInit(): void {
    this.recordsService.getRecords().subscribe(data => {
      this.records.set(data);
    });
  }

  exportPDF() {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFontSize(14);
    doc.text('Records Inventory', 14, 14);
    doc.setFontSize(10);
    doc.text(`Exported: ${new Date().toLocaleString()}`, 14, 20);
    

    const data = this.records().map(record => [
      record.id,
      record.title,
      record.artist,
      record.genre,
      record.format,
      record.releaseYear,
      record.price,
      record.stockQty,
      record.customerId || '', 
      record.customerFirstName || '',
      record.customerLastName || '',
      record.customerContact || '',
      record.customerEmail || ''
    ]);

    const head = [['ID', 'Title', 'Artist', 'Genre', 'Format', 'Release Year', 
      'Price', 'Stock Qty', 'Customer ID', 'First Name', 'Last Name', 'Contact', 'Email']];

    autoTable(doc, {
      head,
      body: data,
      startY: 26,
      styles: {
        overflow: 'ellipsize', 
        cellPadding: 2,
        fontSize: 8
      },
      didParseCell: (data) => {
        if (data.section === 'body' && data.column.index === 3) {
          const genre = data.cell.raw as string;
          const color = this.genreColors[genre as keyof typeof this.genreColors] || '#BDC3C7';
          data.cell.styles.fillColor = color;
          data.cell.styles.textColor = '#000';
        }
      }
    });

    doc.save('records.pdf');
  }

  exportExcel() {
    const worksheetData = this.records().map(record => ({
      ID: record.id,
      Title: record.title,
      Artist: record.artist,
      Genre: record.genre,
      Format: record.format,
      Year: record.releaseYear,
      Price: record.price,
      StockQty: record.stockQty,
      CustomerID: record.customerId || '',
      FirstName: record.customerFirstName || '',
      LastName: record.customerLastName || '',
      Contact: record.customerContact || '',
      Email: record.customerEmail || ''
    }));

    const ws = xlsx.utils.json_to_sheet(worksheetData);
    const wb = xlsx.utils.book_new();

    this.records().forEach((record, i) => {
      const genre = record.genre;
      const excelRow = i + 2;
      const color = (this.genreColors[genre] || '#BDC3C7').replace('#','');
      const cell = ws['D${excelRow}'];
      if (cell){
        cell.s = {
          fill: {
            fgColor: {rgb: color}
          }
        };
      }
    });

    const colWidths = Object.keys(worksheetData[0]).map(k => ({ wch: Math.max(k.length, 12) }));
    ws['!cols'] = colWidths;
    xlsx.utils.book_append_sheet(wb, ws, 'Records');
    xlsx.writeFile(wb, 'records.xlsx');
  }

}