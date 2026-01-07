import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  projects: any[] = [];
  newProject = { title: '', description: '', imageUrl: '' };
  
  isEditMode = false;
  currentProjectId: any = null;
  submitted = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  apiUrl = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.http.get(this.apiUrl).subscribe((res: any) => {
      this.projects = res;
    });
  }



  saveProject(form: NgForm) {
    this.submitted = true;
    this.errorMessage = null;

    if (form.invalid) return;

  

    // 2. التحقق من تكرار الاسم
    const isDuplicate = this.projects.some(p => 
      p.title.toLowerCase() === this.newProject.title.toLowerCase() && p._id !== this.currentProjectId
    );

    if (isDuplicate) {
      this.errorMessage = "This project title already exists!";
      return;
    }

    if (this.isEditMode) {
      this.http.put(`${this.apiUrl}/${this.currentProjectId}`, this.newProject).subscribe(() => {
        this.finishSuccess('Project updated successfully', form);
      });
    } else {
      this.http.post(this.apiUrl, this.newProject).subscribe(() => {
        this.finishSuccess('Project added successfully', form);
      });
    }
  }

  deleteProject(id: any) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.successMessage = 'Project removed successfully';
      this.getProjects();
      setTimeout(() => this.successMessage = null, 3000);
    });
  }

  editProject(p: any) {
    this.isEditMode = true;
    this.submitted = false;
    this.currentProjectId = p._id;
    this.newProject = { title: p.title, description: p.description, imageUrl: p.imageUrl };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  finishSuccess(msg: string, form: NgForm) {
    this.successMessage = msg;
    this.getProjects();
    this.resetForm(form);
    setTimeout(() => this.successMessage = null, 3000);
  }

  resetForm(form: NgForm) {
    this.isEditMode = false;
    this.submitted = false;
    this.currentProjectId = null;
    this.newProject = { title: '', description: '', imageUrl: '' };
    form.resetForm(); // يمسح البيانات واللون الأحمر تماماً
  }

  goToPortfolio() {
    this.router.navigate(['/portfolio']);
  }
}