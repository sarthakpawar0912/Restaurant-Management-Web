import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomerService } from '../../customer-service/customer.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  categories: any[] = [];
  filteredCategories: any[] = [];
  validateForm!: FormGroup;
  isSpinning: boolean = false;
  filteredProducts: any;

  constructor(
    private service: CustomerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: ['']
    });

    this.getAllCategories();

    // Listen to input changes and filter categories dynamically
    this.validateForm.get('title')!.valueChanges.pipe(
      debounceTime(300) // Optional: Wait 300ms before processing input
    ).subscribe(() => {
      this.onSearchChange();
    });
  }

  onSearchChange(): void {
    const searchKeyword = this.validateForm.get('title')!.value?.toLowerCase() || '';

    if (!searchKeyword) {
      this.filteredCategories = this.categories; // Reset to all categories if empty
      return;
    }

    this.filteredCategories = this.categories.filter(category =>
      category.name.toLowerCase().includes(searchKeyword)
    );
  }

  getAllCategories(): void {
    this.service.getAllcategories().subscribe(res => {
      this.categories = res.map((category: { returnedImg: string }) => ({
        ...category,
        processedImg: 'data:image/jpeg;base64,' + category.returnedImg
      }));

      this.filteredCategories = [...this.categories]; // Show all categories initially
    });
  }
  
}

function debounceTime(arg0: number): import("rxjs").OperatorFunction<any, unknown> {
  throw new Error('Function not implemented.');
}
