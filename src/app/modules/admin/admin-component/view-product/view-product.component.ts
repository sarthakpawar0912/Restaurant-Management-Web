import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin-services/admin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-view-product',
  standalone: false,
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})
export class ViewProductComponent {
  categoryId: any; // Stores the category ID from the route
  validateForm!: FormGroup; // Form for search input
  Products: any[] = []; // Stores all products
  filteredProducts: any[] = []; // Stores filtered products based on search
  isSpinning: boolean = false; // Loading spinner state

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message:NzMessageService
  ) {}

  ngOnInit(): void {
    // Initialize the form
    this.validateForm = this.fb.group({
      title: ['']
    });

    // Get the category ID from the route
    this.categoryId = this.activatedRoute.snapshot.params['categoryId'];

    // Fetch products by category
    this.getProductsByCategory();

    // Listen to input changes and filter products dynamically
    this.validateForm.get('title')!.valueChanges.pipe(
      debounceTime(300) // Wait 300ms before processing input
    ).subscribe(() => {
      this.onSearchChange();
    });
  }

  /**
   * Handles search input changes and filters products
   */
  onSearchChange(): void {
    const searchKeyword = this.validateForm.get('title')!.value?.toLowerCase() || '';

    if (!searchKeyword) {
      this.filteredProducts = this.Products; // Reset to all products if search is empty
      return;
    }

    // Filter products by name or description
    this.filteredProducts = this.Products.filter(product =>
      product.name.toLowerCase().includes(searchKeyword) ||
      product.description.toLowerCase().includes(searchKeyword)
    );
  }

  /**
   * Fetches products by category ID
   */
  getProductsByCategory(): void {
    this.isSpinning = true; // Start loading spinner
    this.Products = []; // Clear existing products

    this.adminService.getProductsByCategory(this.categoryId).subscribe({
      next: (res) => {
        // Process product images and store products
        this.Products = res.map((product: { returnedImg: string; }) => ({
          ...product,
          processedImg: 'data:image/jpeg;base64,' + product.returnedImg
        }));

        this.filteredProducts = [...this.Products]; // Initialize filtered products
        this.isSpinning = false; // Stop loading spinner
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.isSpinning = false; // Stop loading spinner on error
      }
    });
  }

  deleteProduct(productId: number) {
    this.adminService.deleteProduct(productId).subscribe({
      next: (res) => {
        if (res.status === 204) { // If delete was successful
          this.Products = this.Products.filter(product => product.id !== productId);
          this.filteredProducts = this.filteredProducts.filter(product => product.id !== productId);
          this.message.success(`Product Deleted Successfully`, { nzDuration: 5000 });
        } else {
          this.message.error(`Something went wrong...!!`, { nzDuration: 5000 });
        }
      },
      error: (err) => {
        console.error("Error deleting product:", err);
        this.message.error(`Product not found or cannot be deleted.`, { nzDuration: 5000 });
      }
    });
  }
  
  
}