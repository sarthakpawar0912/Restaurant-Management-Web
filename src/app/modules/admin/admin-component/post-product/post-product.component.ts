import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-post-product',
  standalone: false,
  templateUrl: './post-product.component.html',
  styleUrl: './post-product.component.scss'
})
export class PostProductComponent {

  categoryId!: number;
  productForm!: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isSpinning = false;

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private adminService: AdminService,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.categoryId = Number(this.activatedroute.snapshot.params['categoryId']);

    // ✅ Corrected form initialization
    this.productForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    if (this.productForm.invalid) {
      this.message.error('Please fill all required fields!', { nzDuration: 5000 });
      return;
    }
    this.isSpinning = true;

    const formData: FormData = new FormData();
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    formData.append('name', this.productForm.get('name')?.value || '');
    formData.append('price', this.productForm.get('price')?.value || '');
    formData.append('description', this.productForm.get('description')?.value || '');

    this.adminService.postProduct(this.categoryId, formData).subscribe(
      (res) => {
        this.isSpinning = false;
        if (res.id != null) {
          this.message.success('✅ Product Posted Successfully!', { nzDuration: 5000 });
          this.router.navigateByUrl('/admin/dashboard');
        } else {
          this.message.error('❌ Something went wrong', { nzDuration: 5000 });
        }
      },
      (error) => {
        this.isSpinning = false;
        this.message.error('❌ Server error! Please try again later.', { nzDuration: 5000 });
        console.error('API Error:', error);
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