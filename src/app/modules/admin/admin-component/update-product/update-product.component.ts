import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AdminService } from '../../admin-services/admin.service';

@Component({
  selector: 'app-update-product',
  standalone: false,
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.scss'
})
export class UpdateProductComponent {

  productId!: number;
  validateForm!: FormGroup;
  imgChanged = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isSpinning = false;
  existingImage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productId = +this.activatedroute.snapshot.params['productId'];
    this.validateForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      description: ['', Validators.required]
    });

    this.getProductById();
  }

  getProductById(): void {
    this.adminService.getProductById(this.productId).subscribe(
      (res) => {
        console.log(res);
        this.existingImage = 'data:image/jpeg;base64,' + res.returnedImg;
        this.validateForm.patchValue({
          name: res.name,
          price: res.price,
          description: res.description
        });
      },
      (error) => {
        this.message.error("Failed to fetch product details.");
      }
    );
  }

  updateForm(): void {
    this.isSpinning = true;
    const formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    formData.append('name', this.validateForm.get('name')?.value);
    formData.append('price', this.validateForm.get('price')?.value);
    formData.append('description', this.validateForm.get('description')?.value);

    this.adminService.updateProduct(this.productId, formData).subscribe(
      (res) => {
        this.isSpinning = false;
        if (res.id != null) {
          this.message.success(`Product updated successfully`, { nzDuration: 5000 });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.message.error("Something went wrong", { nzDuration: 5000 });
        }
      },
      (error) => {
        this.isSpinning = false;
        this.message.error("Error updating product.");
      }
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.previewImage();
    }
  }

  previewImage(): void {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  triggerFileInput(): void {
    document.getElementById('upload_product_image')?.click();
  }
  
}