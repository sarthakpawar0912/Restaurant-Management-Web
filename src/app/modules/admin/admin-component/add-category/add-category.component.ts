import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { NzMessageComponent, NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: false,
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  categoryForm: FormGroup; // Form object
  selectedFile: File | null = null; // Stores selected file
  imagePreview: string | ArrayBuffer | null = 'assets/default-image.png'; // Default image placeholder

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private message: NzMessageService,  
      private router: Router // Inject Router for navigation

  ) {
    // Initializing form with validators
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  /** Opens file input when the button is clicked */
  triggerFileInput() {
    document.getElementById("upload_profile_image")?.click();
  }

  /** Handles file selection and image preview */
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.selectedFile = file;

      // Show Image Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  /** Handles form submission */
  postCategory() {
    if (!this.selectedFile) {
      this.message.error("Please select an image!", { nzDuration: 3000 });
      return;
    }

    const formData = new FormData();
    formData.append("img", this.selectedFile);
    formData.append("name", this.categoryForm.get("name")?.value);
    formData.append("description", this.categoryForm.get("description")?.value);

    this.service.postCategory(formData).subscribe(
      (res) => {
        if (res.id) {
          this.message.success("Category Posted Successfully", { nzDuration: 5000 });
          setTimeout(() => {
            console.log("Navigating to /admin/dashboard"); // Debugging
            this.router.navigate(['/admin/dashboard']).then(() => {
              console.log("Navigation successful"); // Confirm success
            }).catch(err => {
              console.error("Navigation error:", err); // Log any errors
            });
          }, 1000);
        } else {
          this.message.error("Something went wrong", { nzDuration: 5000 });
        }
      },
      (error) => {
        this.message.error("Error posting category: " + error.message, { nzDuration: 5000 });
      }
    );
  }
}