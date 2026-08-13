import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Designer } from '../models/designer.model';
import { DesignerService } from '../services/designer.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  designer?: Designer;
  submitted = false;
  projectTypes = [
    'Kitchen',
    'Bedroom',
    'Bathroom',
    'Living Room',
    'Full Home',
    'Balcony',
    'Other',
  ];
  budgets = [
    'Under ₹5 Lakhs',
    '₹5-10 Lakhs',
    '₹10-20 Lakhs',
    '₹20-50 Lakhs',
    'Above ₹50 Lakhs',
  ];
  form = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9+ -]{10,}$/)]],
    city: ['', Validators.required],
    state: [''],
    projectType: ['', Validators.required],
    budget: [''],
    preferredContactMethod: ['Phone'],
    message: ['', Validators.required],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    route: ActivatedRoute,
    designerService: DesignerService,
  ) {
    route.paramMap.subscribe((params) => {
      const id = params.get('designerId');
      if (id)
        designerService
          .getDesignerById(Number(id))
          .subscribe((designer) => (this.designer = designer));
    });
  }

  invalid(control: string): boolean {
    const field = this.form.get(control);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log('HomeDesign enquiry', this.form.value);
    this.submitted = true;
  }
}
