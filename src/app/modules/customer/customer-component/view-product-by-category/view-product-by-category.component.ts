import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../customer-service/customer.service';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-view-product-by-category',
  standalone: false,
  templateUrl: './view-product-by-category.component.html',
  styleUrl: './view-product-by-category.component.scss'
})
export class ViewProductByCategoryComponent {
  categoryId: number = 0;
  validateForm!: FormGroup;
  Products: any[] = [];
  filteredProducts: any[] = [];
  isLoading: boolean = false;

  constructor(
    private service: CustomerService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      title: ['']
    });

    this.categoryId = +this.activatedRoute.snapshot.params['categoryId'];
    this.getProductByCategory();

    // Debounced search
    this.validateForm.get('title')!.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.onSearchChange(value);
    });
  }

  getProductByCategory() {
    this.isLoading = true;
    this.service.getProductByCategory(this.categoryId).subscribe(
      (res) => {
        this.Products = res.map((element: any) => ({
          ...element,
          processedImg: "data:image/jpeg;base64," + element.returnedImg
        }));
        this.filteredProducts = [...this.Products];
        this.isLoading = false;
      },
      (error) => {
        console.error("Error fetching products:", error);
        this.isLoading = false;
      }
    );
  }

  onSearchChange(searchKeyword: string): void {
    const trimmedKeyword = searchKeyword?.trim();

    if (!trimmedKeyword) {
      this.filteredProducts = [...this.Products];  // Reset if search is empty
      return;
    }

    console.log("Searching products for:", trimmedKeyword);

    this.isLoading = true;
    this.service.getProductsByCategoryAndTitle(this.categoryId, trimmedKeyword).subscribe(
      (res) => {
        console.log("Search results:", res);
        this.filteredProducts = res.map((element: any) => ({
          ...element,
          processedImg: "data:image/jpeg;base64," + element.returnedImg
        }));
        this.isLoading = false;
      },
      (error) => {
        console.error("Error fetching filtered products:", error);
        this.isLoading = false;
      }
    );
  }
}